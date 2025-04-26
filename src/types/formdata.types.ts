export interface LoginFormData{
    email: string;
    password: string;
}

export interface SignupFormData extends LoginFormData {
    name: string
}