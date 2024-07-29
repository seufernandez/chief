import React from "react";
import { Box, ThemeProvider } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserDetails from "./pages/UserDetails";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home";
import { UsersProvider } from "./hooks/useUsers";
import { theme } from "./theme";
import NotFound from "./pages/404";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/users/:id",
      element: <UserDetails />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }}>
      <ThemeProvider theme={theme}>
        <UsersProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <RouterProvider router={router} />
        </UsersProvider>
      </ThemeProvider>
    </Box>
  );
};

export default App;
