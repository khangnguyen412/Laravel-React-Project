import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DefaultApp from './pages/appdefault.jsx';
import Template from './pages/pages.jsx';
import UserPage from './pages/dashboard/users.jsx';
import LoginPage from './pages/user/login.jsx';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route index element={<DefaultApp></DefaultApp>} />
        </Routes>
        <Routes>
          <Route path="/template" element={<Template></Template>}></Route>
        </Routes>
        <Routes>
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        </Routes>
        <Routes>
          <Route path="/admin/users" element={<UserPage></UserPage>}></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
