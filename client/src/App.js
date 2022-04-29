import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Profile';
import Login from './components/Login';

function App() {

  return (
    <Routes>
      <Route path="/profile" exact element={<Main/>} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/login" />}/>
    </Routes>
  );
}

export default App;
