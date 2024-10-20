import { object, ref, string } from "yup";

export const LoginSchema = object().shape({
  email: string()
    .email("Это поле должно быть email")
    .required("Обязательное поле"),
  password: string().required("Обязательное поле"),
});

export const RegisterSchema = object().shape({
  name: string().required("Имя обязательное поле"),
  email: string()
    .email("This field must be an email")
    .required("Email is required"),
  password: string().required("Password is required"),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password")], "Passwords must match"),
});
