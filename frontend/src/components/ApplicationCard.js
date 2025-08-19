import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, ExternalLink, User, Briefcase, Calendar, Clock } from 'lucide-react';
import './ApplicationCard.css';

const ApplicationCard = ({ application, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      Applied: 'status-applied',
      Interview: 'status-interview',
      Offer: 'status-offer',
      Rejected: 'status-rejected'
    };
    return statusClasses[status] || 'status-applied';
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      onDelete(application._id);
    }
    setShowMenu(false);
  };

  const handleResumeClick = (e) => {
    e.stopPropagation();
    window.open(application.resumeLink, '_blank');
  };

  return (
    <div className="application-card">
      {/* Header */}
      <div className="card-header">
        <div className="candidate-info">
          <h4 className="candidate-name">{application.candidateName}</h4>
          <span className={`status-badge ${getStatusClass(application.status)}`}>
            {application.status}
          </span>
        </div>
        
        <div className="card-menu">
          <button
            className="menu-trigger"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreVertical size={16} />
          </button>
          
          {showMenu && (
            <div className="menu-dropdown">
              <button className="menu-item" onClick={handleResumeClick}>
                <ExternalLink size={14} />
                View Resume
              </button>
              <button className="menu-item delete" onClick={handleDelete}>
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="card-content">
        <div className="info-row">
          <Briefcase size={14} />
          <span className="role-title">{application.role}</span>
        </div>
        
        <div className="info-row">
          <User size={14} />
          <span>{application.yearsOfExperience} years experience</span>
        </div>
        
        {application.email && (
          <div className="info-row">
            <span className="email">{application.email}</span>
          </div>
        )}
        
        {application.phone && (
          <div className="info-row">
            <span className="phone">{application.phone}</span>
          </div>
        )}
        
        {application.notes && (
          <div className="notes">
            <p>{application.notes}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="card-footer">
        <div className="date-info">
          <Calendar size={12} />
          <span>Applied: {formatDate(application.appliedDate)}</span>
        </div>
        
        {application.lastUpdated && (
          <div className="date-info">
            <Clock size={12} />
            <span>Updated: {formatDate(application.lastUpdated)}</span>
          </div>
        )}
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div 
          className="menu-overlay"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default ApplicationCard;
