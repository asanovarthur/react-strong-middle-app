import firebase, { googleProvider } from "./firebase";

const auth = firebase.auth();
const db = firebase.firestore();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    await user
      .getIdTokenResult()
      .then((result) => window.localStorage.setItem("userToken", result.token));

    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();

    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }

    return user;
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  auth.signOut();
};

export { auth, db, signInWithGoogle, logout };
