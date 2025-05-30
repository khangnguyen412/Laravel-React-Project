import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DefaultApp from "./pages/appdefault.jsx";
import UserPage from './pages/users.jsx';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes element={<DefaultApp></DefaultApp>}>
          <Route index element={<DefaultApp></DefaultApp>} />
        </Routes>
        
        <Routes element={<UserPage></UserPage>}>
          <Route path="/user-page" element={<UserPage></UserPage>}></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
