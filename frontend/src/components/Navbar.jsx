

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        
        <span className="navbar-title">Internal Dashboard</span>
      </div>

      <div className="navbar-right">
        <span className="navbar-role">Admin</span>
        <button className="navbar-btn">Logout</button>
      </div>
    </nav>
  );
}
