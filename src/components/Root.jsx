import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Toaster } from "./ui/toaster";
// import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
};
