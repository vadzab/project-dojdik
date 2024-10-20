export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Проект Дождик",
  description: "Секретный проект А.Таранова",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },

    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {},
};
