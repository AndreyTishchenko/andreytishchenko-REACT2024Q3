import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './pages/MainPage';
import UncontrolledForm from './pages/UncontrolledForm';
// import HookForm from './pages/HookForm';

const App: React.FC = () => {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Main</Link> |{' '}
        <Link to="/uncontrolled">Uncontrolled Form</Link> |{' '}
        <Link to="/hook-form">React Hook Form</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/uncontrolled" element={<UncontrolledForm />} />
        {/* <Route path="/hook-form" element={<HookForm />} /> */}
      </Routes>
    </div>
  );
};

export default App;
