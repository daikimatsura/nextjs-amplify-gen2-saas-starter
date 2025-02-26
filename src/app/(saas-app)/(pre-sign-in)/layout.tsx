import { ReactNode } from "react";

const PreSignInLayout = ({ children }: { children: ReactNode }) => {
  return <div className="bg-cyan-800">{children}</div>;
};

export default PreSignInLayout;
