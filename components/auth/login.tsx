"use client";

import { useCallback, useState } from "react";
import { createAuthCookie } from "@/actions/auth.action";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/types";
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

export const Login = () => {
  const router = useRouter();
  const initialValues: LoginFormType = {
    email: "test@vadzab.ru",
    password: "admin",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      // `values` contains email & password. You can use provider to connect user

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
                variant={"faded"}
                label="Email"
                type="email"
                isRequired
                value={values.email}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
                className="w-full"
              />
              <Input
                variant="bordered"
                label="Пароль"
                type={isVisiblePassword ? "text" : "password"}
                value={values.password}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
                className="w-full"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibilityPassword}
                    aria-label="toggle password visibility"
                  >
                    {isVisiblePassword ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
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
              type="submit"
              onPress={() => handleSubmit()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
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
