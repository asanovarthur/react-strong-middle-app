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

    await db
      .collection("users")
      .doc(`${user.uid}`)
      .get()
      .then((dbUser) => {
        if (!dbUser.exists)
          db.collection("users").doc(`${user.uid}`).set({
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
            photoURL: user.photoURL,
          });
      });

    return user;
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  auth.signOut();
};

export { auth, db, signInWithGoogle, logout };
