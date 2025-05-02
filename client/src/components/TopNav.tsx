import { Link } from 'wouter';

export default function TopNav() {
  return (
    <header className="top-nav">
      <button className="menu-toggle" id="menuToggle">
        <i className="fas fa-bars"></i>
      </button>
      
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button><i className="fas fa-search"></i></button>
      </div>
      
      <div className="user-menu">
        <div className="notifications">
          <button><i className="fas fa-bell"></i><span className="badge">3</span></button>
        </div>
        
        <div className="user-profile" id="userProfileMenu">
          <img src="/assets/images/default-avatar.png" alt="User Avatar" />
          <span>Jane Doe</span>
          <i className="fas fa-chevron-down"></i>
        </div>
        
        <div className="dropdown-menu" id="userDropdown">
          <ul>
            <li><Link href="/profile"><a><i className="fas fa-user"></i> View Profile</a></Link></li>
            <li><Link href="/settings"><a><i className="fas fa-cog"></i> Settings</a></Link></li>
            <li><a href="#"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}