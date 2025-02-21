import "./App.css";
import AllForms from "./components/AllForms/AllForms";
import MainEl from "./components/AllForms/MainEl";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SingleForm from "./components/SingleForm/SingleForm";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <nav><Link to="/">Home</Link><Link to="/forms">Forms</Link></nav>
          <Routes>
            <Route path="/" element={<MainEl/>}></Route>
            <Route path="/forms" element={<AllForms/>}></Route>
            <Route path="/forms/:id" element={<SingleForm/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
