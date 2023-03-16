import React from "react";
import dynamic from "next/dynamic";

const NoSsr = ({ children }: React.PropsWithChildren) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSsr), { ssr: false });
