import { Provider } from "./components/ui/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage, postListLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { AddNewEventPage } from "./pages/AddNewEventPage";
import { addEventLoader } from "./loaders/addEventLoader";
import { postLoader } from "./loaders/eventLoader";
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
        loader: addEventLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,

        loader: postLoader,
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
        <Provider>
          <RouterProvider router={router} />
        </Provider>
      </UserContextProvider>
    </CategoryContextProvider>
  </React.StrictMode>
);
