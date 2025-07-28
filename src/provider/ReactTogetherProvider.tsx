"use client";

import { ReactNode } from "react";
import { ReactTogether } from "react-together";

export default function ReactTogetherProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ReactTogether
      sessionParams={{
        appId: process.env.NEXT_PUBLIC_MULTISYNQ_APP_ID as string,
        apiKey: process.env.NEXT_PUBLIC_MULTISYNQ_API_KEY as string,
        // name: "asd0",
        // password: "123",
      }}
      rememberUsers={true}
    >
      {children}
    </ReactTogether>
  );
}
