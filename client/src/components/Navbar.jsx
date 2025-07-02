import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center gap-2">
          <span role="img" aria-label="trophy">🏆</span> Mockify
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-medium text-sm items-center">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/mock-interview">Mock Interview</Link>
          <Link to="/resume-analyzer">Resume Analyzer</Link>
          <Link to="/mock/dsa">DSA</Link>
          <Link to="/mock/hr">HR</Link>
          <Link to="/mock/frontend">Frontend</Link>
          <Link to="/mock/backend">Backend</Link>

        </div>

        {/* Hamburger Menu (mobile only) */}
        <div className="block md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 font-medium text-sm">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/mock-interview" onClick={() => setIsOpen(false)}>Mock Interview</Link>
          <Link to="/resume-analyzer" onClick={() => setIsOpen(false)}>Resume Analyzer</Link>
          <Link to="/mock/dsa" onClick={() => setIsOpen(false)}>DSA</Link>
          <Link to="/mock/hr" onClick={() => setIsOpen(false)}>HR</Link>
          <Link to="/mock/frontend" onClick={() => setIsOpen(false)}>Frontend</Link>
          <Link to="/mock/backend" onClick={() => setIsOpen(false)}>Backend</Link>
        </div>
      )}
    </nav>
  );
}
