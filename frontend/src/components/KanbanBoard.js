/**
 * Kanban Board Component
 * Created by: Sumit Singh Sengar
 * Description: Drag-and-drop job application management board
 */

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Search, Filter, Plus, RefreshCw } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';
import ApplicationCard from './ApplicationCard';
import FilterPanel from './FilterPanel';
import './KanbanBoard.css';

const COLUMNS = [
  { id: 'Applied', title: 'Applied', color: '#667eea', colorDark: '#5a67d8' },
  { id: 'Interview', title: 'Interview', color: '#f59e0b', colorDark: '#d97706' },
  { id: 'Offer', title: 'Offer', color: '#10b981', colorDark: '#059669' },
  { id: 'Rejected', title: 'Rejected', color: '#ef4444', colorDark: '#dc2626' },
  { id: 'Hired', title: 'Hired', color: '#8b5cf6', colorDark: '#7c3aed' }
];

const KanbanBoard = ({ onAddApplication }) => {
  const {
    applications,
    loading,
    error,
    updateApplicationStatus,
    deleteApplication,
    filters,
    applyFilters
  } = useApplications();

  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  // Group applications by status
  const groupedApplications = COLUMNS.reduce((acc, column) => {
    acc[column.id] = applications.filter(app => app.status === column.id);
    return acc;
  }, {});

  // Handle drag end
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // If no destination or dropped in same place, do nothing
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    try {
      await updateApplicationStatus(draggableId, destination.droppableId);
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      applyFilters({ search: value });
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    applyFilters(newFilters);
    setShowFilters(false);
  };

  if (loading && applications.length === 0) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    const isDbError = error.includes('Database not connected') || error.includes('timeout');
    
    return (
      <div className="error-container">
        <h3>🔧 Database Setup Required</h3>
        {isDbError ? (
          <div className="setup-instructions">
            <p>MongoDB database is not connected yet.</p>
            <div className="setup-steps">
              <h4>Quick Setup Options:</h4>
              <ol>
                <li><strong>MongoDB Atlas (Recommended):</strong>
                  <ul>
                    <li>Go to <a href="https://www.mongodb.com/atlas" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a></li>
                    <li>Create a free account and cluster</li>
                    <li>Get your connection string</li>
                    <li>Update <code>backend/.env</code> with your connection string</li>
                  </ul>
                </li>
                <li><strong>Local MongoDB:</strong>
                  <ul>
                    <li>Install MongoDB on your computer</li>
                    <li>Start the MongoDB service</li>
                  </ul>
                </li>
              </ol>
            </div>
            <p>📖 See <code>MONGODB_SETUP.md</code> for detailed instructions</p>
          </div>
        ) : (
          <p className="error-text">Error loading applications: {error}</p>
        )}
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          <RefreshCw size={18} />
          Check Connection
        </button>
      </div>
    );
  }

  return (
    <div className="kanban-container">
      <div className="container">
        {/* Header */}
        <div className="kanban-header">
          <div className="kanban-title">
            <h2>Application Pipeline</h2>
            <p>Track and manage job applications through different stages</p>
          </div>
          
          <div className="kanban-actions">
            <div className="search-container">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            
            <button
              className="btn btn-outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filters
            </button>
            
            <button
              className="btn btn-primary"
              onClick={onAddApplication}
            >
              <Plus size={18} />
              Add Application
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Stats */}
        <div className="kanban-stats">
          {COLUMNS.map(column => (
            <div key={column.id} className="stat-card">
              <div className="stat-header">
                <div 
                  className="stat-indicator"
                  style={{ backgroundColor: column.color }}
                ></div>
                <span className="stat-title">{column.title}</span>
              </div>
              <div className="stat-value">
                {groupedApplications[column.id]?.length || 0}
              </div>
            </div>
          ))}
        </div>

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="kanban-board">
            {COLUMNS.map(column => (
              <div 
                key={column.id} 
                className="kanban-column"
                style={{
                  '--column-color': column.color,
                  '--column-color-dark': column.colorDark
                }}
              >
                <div className="column-header">
                  <div className="column-title">
                    <div 
                      className="column-indicator"
                      style={{ backgroundColor: column.color }}
                    ></div>
                    <h3>{column.title}</h3>
                    <span className="column-count">
                      {groupedApplications[column.id]?.length || 0}
                    </span>
                  </div>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    >
                      {groupedApplications[column.id]?.map((application, index) => (
                        <Draggable
                          key={application._id}
                          draggableId={application._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`application-card-wrapper ${snapshot.isDragging ? 'dragging' : ''}`}
                            >
                              <ApplicationCard
                                application={application}
                                onDelete={deleteApplication}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      {groupedApplications[column.id]?.length === 0 && (
                        <div className="empty-column">
                          <p>No applications in {column.title.toLowerCase()}</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="empty-state">
            <h3>No applications yet</h3>
            <p>Start by adding your first job application to track your progress</p>
            <button className="btn btn-primary" onClick={onAddApplication}>
              <Plus size={18} />
              Add Your First Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
