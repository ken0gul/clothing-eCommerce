import React from "react";

import SignUpForm from "../../components/sign-up/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss";
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

  return (
    <div className="authentication-container">
      <SignInForm />

      <SignUpForm />

      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
    </div>
  );
};

export default SignIn;
