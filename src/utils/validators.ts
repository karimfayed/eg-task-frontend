import { ErrorMessages } from "../enums/errorMessages";


export const validateName = (name: string): string | null => {
    if (!name.trim()) return ErrorMessages.NAME_REQUIRED;
    if (name.trim().length < 3) return ErrorMessages.NAME_MIN_LENGTH;
    return null;
};

export const validateEmail = (email: string): string | null => {
    const requiredError = validateEmailRequired(email);
    if (requiredError) return requiredError;
    if (!/\S+@\S+\.\S+/.test(email)) return ErrorMessages.EMAIL_INVALID;
    return null;
};

export const validateEmailRequired = (email: string): string | null => {
    if (!email.trim()) return ErrorMessages.EMAIL_REQUIRED;
    return null;
};

export const validatePassword = (password: string): string | null => {
    const requiredError = validatePasswordRequired(password);
    if (requiredError) return requiredError;
    if (password.length < 8) return ErrorMessages.PASSWORD_MIN_LENGTH;
    if (!/[A-Za-z]/.test(password)) return ErrorMessages.PASSWORD_LETTER_REQUIRED;
    if (!/[0-9]/.test(password)) return ErrorMessages.PASSWORD_NUMBER_REQUIRED;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return ErrorMessages.PASSWORD_SPEC_CHAR_REQUIRED;
    return null;
};

export const validatePasswordRequired = (password: string): string | null => {
    if (!password) return ErrorMessages.PASSWORD_REQUIRED;
    return null;
};
