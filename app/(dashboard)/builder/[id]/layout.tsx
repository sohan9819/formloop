import React, { type ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto flex w-full flex-grow">{children}</div>;
};

export default Layout;
