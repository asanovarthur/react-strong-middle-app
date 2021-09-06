import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithGoogle } from "../../firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/dashboard");
  }, [user, loading, history]);

  return (
    <div className="login">
      <div className="login__container">
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </div>
    </div>
  );
};
