import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';
import toast from 'react-hot-toast';
import './ApplicationForm.css';

const ApplicationForm = ({ onClose, onSubmit, editApplication = null }) => {
  const { createApplication, updateApplication, loading } = useApplications();
  
  const [formData, setFormData] = useState({
    candidateName: editApplication?.candidateName || '',
    role: editApplication?.role || '',
    yearsOfExperience: editApplication?.yearsOfExperience || '',
    resumeLink: editApplication?.resumeLink || '',
    email: editApplication?.email || '',
    phone: editApplication?.phone || '',
    notes: editApplication?.notes || ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.candidateName.trim()) {
      newErrors.candidateName = 'Candidate name is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData.yearsOfExperience || formData.yearsOfExperience < 0) {
      newErrors.yearsOfExperience = 'Valid years of experience is required';
    }

    if (!formData.resumeLink.trim()) {
      newErrors.resumeLink = 'Resume link is required';
    } else if (!isValidUrl(formData.resumeLink)) {
      newErrors.resumeLink = 'Please enter a valid URL';
    }

    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const submitData = {
        ...formData,
        yearsOfExperience: Number(formData.yearsOfExperience)
      };

      if (editApplication) {
        await updateApplication(editApplication._id, submitData);
      } else {
        await createApplication(submitData);
      }
      
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-header">
            <h2>{editApplication ? 'Edit Application' : 'Add New Application'}</h2>
            <button type="button" className="close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <div className="form-content">
            <div className="form-group">
              <label htmlFor="candidateName" className="label">
                Candidate Name *
              </label>
              <input
                type="text"
                id="candidateName"
                name="candidateName"
                value={formData.candidateName}
                onChange={handleChange}
                className={`input ${errors.candidateName ? 'error' : ''}`}
                placeholder="Enter candidate's full name"
              />
              {errors.candidateName && (
                <span className="error-message">{errors.candidateName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="role" className="label">
                Role *
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`input ${errors.role ? 'error' : ''}`}
                placeholder="e.g. Frontend Developer, Product Manager"
              />
              {errors.role && (
                <span className="error-message">{errors.role}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="yearsOfExperience" className="label">
                Years of Experience *
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className={`input ${errors.yearsOfExperience ? 'error' : ''}`}
                placeholder="0"
                min="0"
                max="50"
              />
              {errors.yearsOfExperience && (
                <span className="error-message">{errors.yearsOfExperience}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="resumeLink" className="label">
                Resume Link *
              </label>
              <input
                type="url"
                id="resumeLink"
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                className={`input ${errors.resumeLink ? 'error' : ''}`}
                placeholder="https://example.com/resume.pdf"
              />
              {errors.resumeLink && (
                <span className="error-message">{errors.resumeLink}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input ${errors.email ? 'error' : ''}`}
                placeholder="candidate@example.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes" className="label">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="input textarea"
                placeholder="Additional notes about the candidate or application..."
                rows={3}
              />
            </div>
          </div>

          <div className="form-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  {editApplication ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                editApplication ? 'Update Application' : 'Add Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
