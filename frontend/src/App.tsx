import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import User from 'pages/User';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
