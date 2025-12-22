// src/context/SocketProvider.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { initSocket } from "../lib/socket";

type Props = {
  children: ReactNode;
};

export const SocketProvider = ({ children }: Props) => {
  useEffect(() => {
    const socket = initSocket();
    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
};
