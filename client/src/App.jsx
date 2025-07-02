import SelectionPredictor from "./pages/SelectionPredictor";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // ✅ import Layout
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResumeUpload from "../src/pages/ResumeUpload";
import DSA from "./pages/DSA";
import HR from "./pages/HR";
import Frontend from "./pages/Frontend";
import Backend from "./pages/Backend";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import InterviewFeedback from "./pages/InterviewFeedback";
import MockInterview from "./pages/MockInterview";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
// import DSA from './pages/DSA'; // adjust path based on your folder


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />

        <Route path="/mock/dsa" element={<DSA />} />
        <Route path="/mock/hr" element={<HR />} />
        <Route path="/mock/frontend" element={<Frontend />} />
        <Route path="/mock/backend" element={<Backend />} />
        <Route path="mock-interview" element={<MockInterview />} />
        <Route path="/selection-predictor" element={<SelectionPredictor />} />
        <Route path="/ai-feedback" element={<InterviewFeedback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
      </Route>
    </Routes>
  );
}



export default App;


