import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage, postListLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { AddNewEventPage } from "./pages/AddNewEventPage";
import { CategoryContextProvider } from "./context/CategoryContext";
import { UserContextProvider } from "./context/UserContext";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "/",
        element: (
          <ErrorBoundary fallback={"er gaat iets mis"}>
            <EventsPage />
          </ErrorBoundary>
        ),
        loader: postListLoader,
      },
      {
        path: "/add-new-event",
        element: (
          <ErrorBoundary fallback={"er gaat iets mis"}>
            <AddNewEventPage />
          </ErrorBoundary>
        ),
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,

        // loader: postLoader,
        // action: addComment,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CategoryContextProvider>
      <UserContextProvider>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </UserContextProvider>
    </CategoryContextProvider>
  </React.StrictMode>
);
