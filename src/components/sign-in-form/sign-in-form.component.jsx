import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import {
  signInWithEmailAndPasswordAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase-utils";

import {
  ButtonContainer,
  Heading,
  SignUpContainer,
} from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    // setCurrentUser(user);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { user } = await signInWithEmailAndPasswordAuth(email, password);
      // setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;

        default:
          console.log(error);
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <SignUpContainer>
      <Heading>I already have an account</Heading>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"email"}
          type="email;"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label={"password"}
          type="password;"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />

        <ButtonContainer>
          <Button type="submit" buttonType={BUTTON_TYPES_CLASSES.base}>
            Sign In
          </Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPES_CLASSES.google}
          >
            Sign In With Google
          </Button>
        </ButtonContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
