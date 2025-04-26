import { SetError } from "../types/error.types";
import { SignupFormData, LoginFormData } from "../types/formdata.types";
import { validateName, validateEmail, validatePassword, validateEmailRequired, validatePasswordRequired } from "./validators";

export const validateSignupForm = (formData: SignupFormData, setErrors: SetError) => {
    const newErrors: { [key: string]: string } = {};

    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

export const validateLoginForm = (formData: LoginFormData, setErrors: SetError) => {
    const newErrors: { [key: string]: string } = {};

    const emailError = validateEmailRequired(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePasswordRequired(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};