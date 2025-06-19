// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" bg-violet-900 text-white px-6 py-4 flex justify-between items-center">
      <h2 role="img" aria-label="trophy" className="text-white text-xl font-bold">🏆 Mockify</h2>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/mock-interview" className="hover:underline">Mock Interview</Link>
        <Link to="/resume-upload">Resume Analyzer</Link>

         <ul className="flex space-x-4">
    <li><Link to="/dashboard">Dashboard</Link></li>
    <li><Link to="/dsa">DSA</Link></li>
    <li><Link to="/hr">HR</Link></li>
    <li><Link to="/frontend">Frontend</Link></li>
    <li><Link to="/backend">Backend</Link></li>
  </ul>

      </div>
    </nav>
  );
};

export default Navbar;
