// import Home from './pages/Home'
import Login from './components/Login'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<Login />} />
              {/* <Route path="" element={<Home />} />
              <Route path="" element={<Home />} /> */}
          </Routes>

        </BrowserRouter>
  );
}

export default App;
