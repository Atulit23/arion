import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Learn from "./screens/Learn";
import Blogs from "./screens/Blogs";
import CurrentLesson from "./screens/CurrentLesson";
import TakeQuiz from "./screens/TakeQuiz";
import GetResults from "./screens/GetResults";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const location = useLocation(); 

  return (
    <div className="App">
      {(!location.pathname.includes("/current") && !location.pathname.includes("/take-quiz") && !location.pathname.includes("/results")) && <Sidebar />}
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/current" element={<CurrentLesson />} />
        <Route path="/take-quiz" element={<TakeQuiz />} />
        <Route path="/results" element={<GetResults />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
