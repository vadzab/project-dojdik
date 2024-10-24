"use client";

import React from "react";

import { SidebarContext } from "./layout-context";

import { NavbarWrapper } from "@/components/navbar/navbar";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <div className="flex flex-col">
        <NavbarWrapper>{children}</NavbarWrapper>
      </div>
    </SidebarContext.Provider>
  );
};
