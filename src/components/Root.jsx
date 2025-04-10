import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Toaster } from "./ui/toaster";

export const Root = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Toaster />
    </>
  );
};
