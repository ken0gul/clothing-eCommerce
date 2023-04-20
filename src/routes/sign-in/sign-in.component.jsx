import React from "react";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase-utils";
import SignUpForm from "../../components/sign-up/sign-up-form.component";

const SignIn = () => {
  // useEffect(() => {
  //   async function getResults() {
  //     let { user } = await getRedirectResult(auth);
  //     if (user) {
  //       const userDocRef = await createUserDocumentFromAuth(user);
  //     }
  //   }

  //   return () => getResults();
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
    </div>
  );
};

export default SignIn;
