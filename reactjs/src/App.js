/* eslint-disable */
import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './redux/store.jsx';
import { Provider } from 'react-redux';

import { MainRoute } from './routes/route-main.jsx';
import { AdminRoute } from './routes/route-admin.jsx';

const routes = [
  ...MainRoute,
  ...AdminRoute,
];
const router = createBrowserRouter(routes);

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.Fragment>
  );
}

export default App;
