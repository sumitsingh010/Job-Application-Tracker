const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Application = require('../models/Application');

// GET analytics data
router.get('/', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please set up MongoDB.',
        setup: 'See MONGODB_SETUP.md for instructions',
        data: {
          overview: { totalApplications: 0, recentApplications: 0, averageExperience: 0 },
          statusDistribution: { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 },
          roleDistribution: {},
          conversionRates: { appliedToInterview: '0', interviewToOffer: '0', rejectionRate: '0' },
          monthlyTrend: [],
          recentActivity: []
        }
      });
    }

    // Get all applications
    const applications = await Application.find();

    // Calculate statistics
    const totalApplications = applications.length;

    // Count by status
    const statusCounts = {
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0
    };

    applications.forEach(app => {
      statusCounts[app.status]++;
    });

    // Count by role
    const roleCounts = {};
    applications.forEach(app => {
      roleCounts[app.role] = (roleCounts[app.role] || 0) + 1;
    });

    // Calculate average experience
    const totalExperience = applications.reduce((sum, app) => sum + app.yearsOfExperience, 0);
    const averageExperience = totalApplications > 0 ? (totalExperience / totalApplications).toFixed(1) : 0;

    // Calculate conversion rates
    const conversionRates = {
      appliedToInterview: totalApplications > 0 ? ((statusCounts.Interview + statusCounts.Offer) / totalApplications * 100).toFixed(1) : 0,
      interviewToOffer: (statusCounts.Interview + statusCounts.Offer) > 0 ? (statusCounts.Offer / (statusCounts.Interview + statusCounts.Offer) * 100).toFixed(1) : 0,
      rejectionRate: totalApplications > 0 ? (statusCounts.Rejected / totalApplications * 100).toFixed(1) : 0
    };

    // Recent applications (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentApplications = applications.filter(app => new Date(app.appliedDate) >= sevenDaysAgo);

    // Monthly trend data
    const monthlyData = {};
    applications.forEach(app => {
      const month = new Date(app.appliedDate).toISOString().slice(0, 7); // YYYY-MM format
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    // Convert monthly data to array for charts
    const monthlyTrend = Object.entries(monthlyData)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6); // Last 6 months

    res.json({
      success: true,
      data: {
        overview: {
          totalApplications,
          recentApplications: recentApplications.length,
          averageExperience: parseFloat(averageExperience)
        },
        statusDistribution: statusCounts,
        roleDistribution: roleCounts,
        conversionRates,
        monthlyTrend,
        recentActivity: applications
          .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
          .slice(0, 5)
          .map(app => ({
            id: app._id,
            candidateName: app.candidateName,
            role: app.role,
            status: app.status,
            lastUpdated: app.lastUpdated
          }))
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics data',
      error: error.message
    });
  }
});

// GET analytics for specific time period
router.get('/period/:period', async (req, res) => {
  try {
    const { period } = req.params; // 'week', 'month', 'quarter', 'year'
    
    let startDate = new Date();
    switch (period) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 1);
    }

    const applications = await Application.find({
      appliedDate: { $gte: startDate }
    });

    const statusCounts = {
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0
    };

    applications.forEach(app => {
      statusCounts[app.status]++;
    });

    res.json({
      success: true,
      data: {
        period,
        startDate,
        endDate: new Date(),
        totalApplications: applications.length,
        statusDistribution: statusCounts
      }
    });
  } catch (error) {
    console.error('Error fetching period analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching period analytics',
      error: error.message
    });
  }
});

module.exports = router;
