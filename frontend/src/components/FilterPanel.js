import React from 'react';
import { X } from 'lucide-react';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange, onClose }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({ status: 'all', role: 'all', search: '' });
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <button className="close-btn" onClick={onClose}>
          <X size={18} />
        </button>
      </div>
      
      <div className="filter-content">
        <div className="filter-group">
          <label className="filter-label">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Role</label>
          <input
            type="text"
            placeholder="Filter by role..."
            value={filters.role === 'all' ? '' : filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value || 'all')}
            className="filter-input"
          />
        </div>

        <div className="filter-actions">
          <button className="btn btn-outline" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
