import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export { type RegisterFormType, type LoginFormType } from "./auth";
