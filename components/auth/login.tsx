"use client";

import { useCallback, useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Checkbox,
  Link,
} from "@nextui-org/react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";

import { createAuthCookie } from "@/actions/auth.action";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/types";

export const Login = () => {
  const router = useRouter();
  const initialValues: LoginFormType = {
    email: "test@vadzab.ru",
    password: "admin",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      // `values` contains email & password. You can use provider to connect user
      console.log(values);
      await createAuthCookie();
      router.replace("/");
    },
    [router],
  );

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <Card className="w-full max-w-md mx-auto p-6 shadow-lg">
          <CardHeader className="justify-center">
            <h2 className="text-2xl font-bold">Вход</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Input
                isRequired
                className="w-full"
                errorMessage={errors.email}
                isInvalid={!!errors.email}
                label="Email"
                type="email"
                value={values.email}
                variant={"faded"}
                onChange={handleChange("email")}
              />
              <Input
                className="w-full"
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibilityPassword}
                  >
                    {isVisiblePassword ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                errorMessage={errors.password}
                isInvalid={!!errors.password}
                label="Пароль"
                type={isVisiblePassword ? "text" : "password"}
                value={values.password}
                variant="bordered"
                onChange={handleChange("password")}
              />
              <div className="flex items-center justify-between">
                <Checkbox isSelected={rememberMe} onValueChange={setRememberMe}>
                  Запомнить меня
                </Checkbox>

                <Link href="#" size="sm">
                  Забыли пароль?
                </Link>
              </div>
            </div>
          </CardBody>

          <CardFooter className="flex-col gap-4">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
              type="submit"
              onPress={() => handleSubmit()}
            >
              Войти
            </Button>
            <Link href="#" size="sm">
              Зарегистрироваться
            </Link>
          </CardFooter>
        </Card>
      )}
    </Formik>
  );
};
