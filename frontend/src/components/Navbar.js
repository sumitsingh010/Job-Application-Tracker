import React from 'react';
import { BarChart3, Kanban, Plus, Search, Filter } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ currentView, setCurrentView, onAddApplication }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo and Title */}
          <div className="navbar-brand">
            <div className="logo">
              <Kanban size={24} />
            </div>
            <h1 className="navbar-title">Job Tracker</h1>
            <span className="navbar-subtitle">Mini ATS</span>
          </div>

          {/* Navigation Links */}
          <div className="navbar-nav">
            <button
              className={`nav-item ${currentView === 'kanban' ? 'active' : ''}`}
              onClick={() => setCurrentView('kanban')}
            >
              <Kanban size={18} />
              <span>Kanban Board</span>
            </button>
            
            <button
              className={`nav-item ${currentView === 'analytics' ? 'active' : ''}`}
              onClick={() => setCurrentView('analytics')}
            >
              <BarChart3 size={18} />
              <span>Analytics</span>
            </button>
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            <button
              className="btn btn-primary"
              onClick={onAddApplication}
            >
              <Plus size={18} />
              <span className="hidden-mobile">Add Application</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
