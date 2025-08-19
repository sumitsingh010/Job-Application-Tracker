import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { applicationsAPI, analyticsAPI } from '../services/api';
import toast from 'react-hot-toast';

const ApplicationContext = createContext();

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_APPLICATIONS: 'SET_APPLICATIONS',
  SET_ANALYTICS: 'SET_ANALYTICS',
  SET_ERROR: 'SET_ERROR',
  ADD_APPLICATION: 'ADD_APPLICATION',
  UPDATE_APPLICATION: 'UPDATE_APPLICATION',
  DELETE_APPLICATION: 'DELETE_APPLICATION',
  SET_FILTERS: 'SET_FILTERS'
};

// Initial state
const initialState = {
  applications: [],
  analytics: null,
  loading: false,
  error: null,
  filters: {
    status: 'all',
    role: 'all',
    search: ''
  }
};

// Reducer
const applicationReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_APPLICATIONS:
      return { ...state, applications: action.payload, loading: false, error: null };
    
    case ACTIONS.SET_ANALYTICS:
      return { ...state, analytics: action.payload, loading: false, error: null };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.ADD_APPLICATION:
      return { 
        ...state, 
        applications: [action.payload, ...state.applications],
        loading: false,
        error: null
      };
    
    case ACTIONS.UPDATE_APPLICATION:
      return {
        ...state,
        applications: state.applications.map(app =>
          app._id === action.payload._id ? action.payload : app
        ),
        loading: false,
        error: null
      };
    
    case ACTIONS.DELETE_APPLICATION:
      return {
        ...state,
        applications: state.applications.filter(app => app._id !== action.payload),
        loading: false,
        error: null
      };
    
    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    default:
      return state;
  }
};

// Provider component
export const ApplicationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(applicationReducer, initialState);

  // Fetch applications
  const fetchApplications = async (filters = {}) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await applicationsAPI.getAll(filters);
      dispatch({ type: ACTIONS.SET_APPLICATIONS, payload: response.data.data });
    } catch (error) {
      console.error('Error fetching applications:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      toast.error('Failed to fetch applications');
    }
  };

  // Fetch analytics
  const fetchAnalytics = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await analyticsAPI.getAll();
      dispatch({ type: ACTIONS.SET_ANALYTICS, payload: response.data.data });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      toast.error('Failed to fetch analytics');
    }
  };

  // Create application
  const createApplication = async (applicationData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await applicationsAPI.create(applicationData);
      dispatch({ type: ACTIONS.ADD_APPLICATION, payload: response.data.data });
      toast.success('Application added successfully!');
      return response.data.data;
    } catch (error) {
      console.error('Error creating application:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      toast.error('Failed to add application');
      throw error;
    }
  };

  // Update application
  const updateApplication = async (id, updateData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await applicationsAPI.update(id, updateData);
      dispatch({ type: ACTIONS.UPDATE_APPLICATION, payload: response.data.data });
      toast.success('Application updated successfully!');
      return response.data.data;
    } catch (error) {
      console.error('Error updating application:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      toast.error('Failed to update application');
      throw error;
    }
  };

  // Update application status (for drag and drop)
  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await applicationsAPI.updateStatus(id, status);
      dispatch({ type: ACTIONS.UPDATE_APPLICATION, payload: response.data.data });
      toast.success(`Application moved to ${status}!`);
      return response.data.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
      throw error;
    }
  };

  // Delete application
  const deleteApplication = async (id) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      await applicationsAPI.delete(id);
      dispatch({ type: ACTIONS.DELETE_APPLICATION, payload: id });
      toast.success('Application deleted successfully!');
    } catch (error) {
      console.error('Error deleting application:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      toast.error('Failed to delete application');
      throw error;
    }
  };

  // Set filters
  const setFilters = (filters) => {
    dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
  };

  // Apply filters and fetch
  const applyFilters = async (newFilters) => {
    const updatedFilters = { ...state.filters, ...newFilters };
    setFilters(newFilters);
    await fetchApplications(updatedFilters);
  };

  // Initial data fetch
  useEffect(() => {
    fetchApplications();
    fetchAnalytics();
  }, []);

  // Refetch analytics when applications change
  useEffect(() => {
    if (state.applications.length >= 0) {
      fetchAnalytics();
    }
  }, [state.applications.length]);

  const value = {
    ...state,
    fetchApplications,
    fetchAnalytics,
    createApplication,
    updateApplication,
    updateApplicationStatus,
    deleteApplication,
    setFilters,
    applyFilters
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

// Custom hook to use the context
export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};

export default ApplicationContext;
