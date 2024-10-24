import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/react";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

import { DarkModeSwitch } from "@/components/navbar/darkmodeswitch";
import { deleteAuthCookie } from "@/actions/auth.action";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await deleteAuthCookie();
    router.replace("/login");
  }, [router]);

  return (
    <>
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
        position="sticky"
      >
        <NavbarBrand>
          <p className="font-bold text-inherit">Проект дождик</p>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <DarkModeSwitch />
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              variant="flat"
              onPress={handleLogout}
            >
              Выход
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {children}
    </>
  );
};
