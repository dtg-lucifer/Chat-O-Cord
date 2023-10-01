"use client";

import { QueryClientProvider, QueryClient } from "react-query";

export const queryClient = new QueryClient();

export const ReactQeuryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
