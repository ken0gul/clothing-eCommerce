import React from "react";

import SignUpForm from "../../components/sign-up/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { AuthhenticationContainer } from "./authentication.styles";

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
    <AuthhenticationContainer className="authentication-container">
      <SignInForm />

      <SignUpForm />

      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
    </AuthhenticationContainer>
  );
};

export default SignIn;
