"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { SocketProvider } from "./Providers/Socket";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <SocketProvider>{children}</SocketProvider>
    </ChakraProvider>
  );
}
