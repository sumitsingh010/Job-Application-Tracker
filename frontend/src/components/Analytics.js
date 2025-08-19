/**
 * Analytics Dashboard Component
 * Created by: Sumit Singh Sengar
 * Description: Interactive charts and analytics for job application tracking
 */

import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Clock, 
  Download,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';
import './Analytics.css';

const Analytics = () => {
  const { analytics, loading, error, fetchAnalytics } = useApplications();
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading && !analytics) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">Error loading analytics: {error}</p>
        <button className="btn btn-primary" onClick={fetchAnalytics}>
          <RefreshCw size={18} />
          Retry
        </button>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="empty-state">
        <h3>No analytics data available</h3>
        <p>Add some applications to see analytics</p>
      </div>
    );
  }

  const {
    overview,
    statusDistribution,
    roleDistribution,
    conversionRates,
    monthlyTrend,
    recentActivity
  } = analytics;

  // Colors for charts
  const COLORS = {
    Applied: '#3b82f6',
    Interview: '#f59e0b',
    Offer: '#10b981',
    Rejected: '#ef4444'
  };

  // Prepare data for status distribution pie chart
  const statusData = Object.entries(statusDistribution).map(([status, count]) => ({
    name: status,
    value: count,
    color: COLORS[status]
  }));

  // Prepare data for role distribution bar chart
  const roleData = Object.entries(roleDistribution)
    .map(([role, count]) => ({ role, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 roles

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      time: 'short'
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

  return (
    <div className="analytics-container">
      <div className="container">
        {/* Header */}
        <div className="analytics-header">
          <div className="analytics-title">
            <h2>Analytics Dashboard</h2>
            <p>Insights into your hiring pipeline and application trends</p>
          </div>
          
          <div className="analytics-actions">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="period-select"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            
            <button className="btn btn-outline" onClick={fetchAnalytics}>
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="overview-cards">
          <div className="overview-card">
            <div className="card-icon">
              <Users size={24} />
            </div>
            <div className="card-content">
              <h3>Total Applications</h3>
              <p className="card-value">{overview.totalApplications}</p>
              <span className="card-subtitle">
                {overview.recentApplications} added recently
              </span>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-icon">
              <TrendingUp size={24} />
            </div>
            <div className="card-content">
              <h3>Average Experience</h3>
              <p className="card-value">{overview.averageExperience} years</p>
              <span className="card-subtitle">
                Across all candidates
              </span>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-icon">
              <Briefcase size={24} />
            </div>
            <div className="card-content">
              <h3>Conversion Rate</h3>
              <p className="card-value">{conversionRates.appliedToInterview}%</p>
              <span className="card-subtitle">
                Applied to Interview
              </span>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-icon">
              <Clock size={24} />
            </div>
            <div className="card-content">
              <h3>Offer Rate</h3>
              <p className="card-value">{conversionRates.interviewToOffer}%</p>
              <span className="card-subtitle">
                Interview to Offer
              </span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Status Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Application Status Distribution</h3>
              <p>Current status of all applications</p>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => 
                      `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Role Distribution */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Applications by Role</h3>
              <p>Top roles with most applications</p>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="role" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trend */}
          {monthlyTrend && monthlyTrend.length > 0 && (
            <div className="chart-card full-width">
              <div className="chart-header">
                <h3>Application Trend</h3>
                <p>Monthly application submissions over time</p>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Conversion Metrics */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Conversion Metrics</h3>
              <p>Pipeline conversion rates</p>
            </div>
            <div className="metrics-container">
              <div className="metric-item">
                <div className="metric-label">Applied → Interview</div>
                <div className="metric-value">{conversionRates.appliedToInterview}%</div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill"
                    style={{ width: `${conversionRates.appliedToInterview}%` }}
                  ></div>
                </div>
              </div>

              <div className="metric-item">
                <div className="metric-label">Interview → Offer</div>
                <div className="metric-value">{conversionRates.interviewToOffer}%</div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill"
                    style={{ width: `${conversionRates.interviewToOffer}%` }}
                  ></div>
                </div>
              </div>

              <div className="metric-item">
                <div className="metric-label">Rejection Rate</div>
                <div className="metric-value rejected">{conversionRates.rejectionRate}%</div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill rejected"
                    style={{ width: `${conversionRates.rejectionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Recent Activity</h3>
              <p>Latest application updates</p>
            </div>
            <div className="activity-list">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-info">
                      <div className="activity-name">{activity.candidateName}</div>
                      <div className="activity-role">{activity.role}</div>
                    </div>
                    <div className="activity-status">
                      <span className={`status-badge ${getStatusClass(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                    <div className="activity-date">
                      {formatDate(activity.lastUpdated)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-activity">
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
