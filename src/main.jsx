import { Provider } from "./components/ui/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { AddNewEvent } from "./pages/AddNewEvent";
import { eventLoader } from "./loaders/eventLoader";
import { CategoryContextProvider } from "./context/CategoryContext";
import { UserContextProvider } from "./context/UserContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { updateEvent, createEvent, deleteEvent } from "./actions/eventActions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "/",
        element: (
          <ErrorBoundary fallback={"er gaat iets mis op de homepage"}>
            <EventsPage />
          </ErrorBoundary>
        ),
        loader: eventLoader,
      },

      {
        path: "/add-new-event",
        element: (
          <ErrorBoundary
            fallback={"er gaat iets mis op de add new event pagina"}
          >
            <AddNewEvent />
          </ErrorBoundary>
        ),
        loader: eventLoader,
        action: createEvent,
      },

      {
        path: "/event/:eventId",
        element: (
          <ErrorBoundary fallback>
            <EventPage />
          </ErrorBoundary>
        ),
        loader: eventLoader,
        action: updateEvent,
        children: [
          {
            path: "delete",
            action: deleteEvent,
          },
        ],
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
