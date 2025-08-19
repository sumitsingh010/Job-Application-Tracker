/**
 * Application Database Model
 * Created by: Sumit Singh Sengar
 * Description: MongoDB schema for job application data
 */

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0
  },
  resumeLink: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected', 'Hired'],
    default: 'Applied'
  },
  email: {
    type: String,
    required: false,
    trim: true
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  notes: {
    type: String,
    default: ''
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update lastUpdated on save
applicationSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Indexes for better query performance
applicationSchema.index({ status: 1 });
applicationSchema.index({ role: 1 });
applicationSchema.index({ candidateName: 1 });

module.exports = mongoose.model('Application', applicationSchema);
