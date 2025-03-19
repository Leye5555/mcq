import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions | Scalable Advanced Software Solutions - mcq",
  description: "Multiple Choice Questions",
};
const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
