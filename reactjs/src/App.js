/* eslint-disable */
import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './redux/store.jsx';
import { Provider } from 'react-redux';

/**
 * Ant Design
 */
import { ConfigProvider } from 'antd';

/**
 * Language
 */
import en_US from 'antd/lib/locale/en_US';

import { MainRoute } from './routes/routeMain.jsx';
import { AdminRoute } from './routes/routeAdmin.jsx';

const routes = [
  ...MainRoute,
  ...AdminRoute,
];
const router = createBrowserRouter(routes);

function App() {
  return (
    <React.Fragment>
      <ConfigProvider locale={en_US}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ConfigProvider>
    </React.Fragment>
  );
}

export default App;
