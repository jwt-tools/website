import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function Router() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <h1>Root</h1>,
        }
      ])}
    />
  );
}

export default Router;
