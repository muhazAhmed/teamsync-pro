import { ReactNode } from "react";
import { createPortal } from "react-dom";

const portalRoot = document.getElementById("portal-root")!;

const Portal = ({ children }: { children: ReactNode }) => {
  return createPortal(children, portalRoot);
};

export default Portal;
