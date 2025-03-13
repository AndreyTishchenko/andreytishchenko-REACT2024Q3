import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/MainPage";
// import UncontrolledForm from "./pages/UncontrolledForm";
// import HookForm from "./pages/HookForm";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="/uncontrolled-form" element={<UncontrolledForm />} /> */}
      {/* <Route path="/hook-form" element={<HookForm />} /> */}
    </Routes>
  );
};

export default App;
