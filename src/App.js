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
import Signup from "./screens/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AddYours from "./screens/AddYours";
import ViewResearchPapers from "./screens/ViewResearchPapers";
import 'react-tooltip/dist/react-tooltip.css'

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const location = useLocation();
  return (
    <div className="App">
      {!location.pathname.includes("current") &&
        !location.pathname.includes("take-quiz") &&
        !location.pathname.includes("results") &&
        !location.pathname.includes("signup") && <Sidebar />}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/current" element={<CurrentLesson />} />
        <Route path="/take-quiz" element={<TakeQuiz />} />
        <Route path="/results" element={<GetResults />} />
        <Route path="/add-yours" element={<AddYours />} />
        <Route path="/research-papers" element={<ViewResearchPapers />} />
        <Route path="/research-papers/learn" element={<Learn />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />;
      <App />
    </Router>
  );
}
