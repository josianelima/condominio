import Home from './ components/Home'
import Login from './ components/Login'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div >
      <main>
        <Route path="/" element={login ? <Home /> : <Login />} />
        <Route path="" element={<Home />} />
        <Route path="" element={<Home />} />
      </main>
    </div>
  );
}

export default App;
