import { useContext, useState } from "react";
import {
  auth,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  db,
} from "../../utils/firebase/firebase-utils";
import FormInput from "../form-input/form-input.component";

import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { UserContext } from "../../contexts/user.context";
import { Heading, SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  // Let's destructure off those form fields
  // to reuse it throughout the application
  const { displayName, email, password, confirmPassword } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) return;
      let { user } = await createAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      const res = await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }
      console.log("error user creation encountered an error", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  return (
    <SignUpContainer>
      <Heading>Don't have an account?</Heading>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Display Name"}
          type="text"
          name="displayName"
          required
          onChange={handleChange}
          value={displayName}
        />

        <FormInput
          label={"Email"}
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label={"Password"}
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />
        <FormInput
          label={"Confirm password"}
          type="password"
          name="confirmPassword"
          required
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button type="submit" buttonType={BUTTON_TYPES_CLASSES.base}>
          Sign Up
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
