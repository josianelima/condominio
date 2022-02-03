import Home from './pages/Home' 
import Login from './pages/Login'
import SignupForm from './pages/Signup'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div>
      <Routes >
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}




export default App;
