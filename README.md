# Job Application Tracker

A professional job application tracking system with analytics dashboard to help manage your job search effectively.

**Created by:** Sumit Singh Sengar

## 🎥 Demo Video

**[Watch the Demo](https://drive.google.com/file/d/181HD3Cnq4fLPil1kzHNCoDp_TC8fJUtF/view?usp=sharing)** - See the application in action!

## Overview

This is a full-stack web application that helps job seekers organize and track their job applications. Features include a Kanban-style board for application management, detailed analytics, and a modern, responsive interface.

## Features

- **Kanban Board**: Drag-and-drop interface to manage applications across different stages
- **Analytics Dashboard**: Visual insights into your job search progress
- **Application Management**: Add, edit, and delete job applications
- **Status Tracking**: Track applications through Applied, Interview, Hired, and Rejected stages
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## Architecture

### Frontend
- **Framework**: React 18.2.0
- **Styling**: Custom CSS with modern design patterns
- **State Management**: React Context API
- **Routing**: Single-page application with component-based navigation
- **UI Components**: Custom-built components with glass morphism design

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful API design
- **Security**: Helmet, CORS, and rate limiting

### Database Schema

#### Application Model
```javascript
{
  jobTitle: String (required),
  company: String (required),
  location: String,
  salary: String,
  status: String (Applied, Interview, Hired, Rejected),
  appliedDate: Date,
  notes: String,
  jobUrl: String,
  contactPerson: String,
  contactEmail: String
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd job-application-tracker
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables (SECURE)**
   
   **🔒 Important: Use the secure setup script**
   ```bash
   # Run the setup script to generate secure environment variables
   powershell -ExecutionPolicy Bypass -File setup-env.ps1
   ```
   
   Or manually:
   ```bash
   # Copy the template
   cp backend/.env.example backend/.env
   
   # Edit backend/.env and replace placeholders with your actual values
   # See SECURITY.md for detailed instructions
   ```
   
   **⚠️ Never commit your `.env` file to version control!**

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://127.0.0.1:27017/job-tracker`

5. **Seed sample data (optional)**
   ```bash
   cd backend
   npm run seed
   ```

6. **Start the application**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend development server on `http://localhost:3000`

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## Libraries Used

### Frontend Dependencies
- **react** (18.2.0) - UI framework
- **react-dom** (18.2.0) - DOM rendering
- **react-router-dom** (6.20.1) - Client-side routing
- **react-beautiful-dnd** (13.1.1) - Drag and drop functionality
- **recharts** (2.8.0) - Analytics charts
- **axios** (1.6.2) - HTTP client
- **lucide-react** (0.294.0) - Modern icons
- **react-hot-toast** (2.4.1) - Toast notifications
- **clsx** (2.0.0) - Utility for conditional CSS classes

### Backend Dependencies
- **express** (4.18.2) - Web framework
- **mongoose** (8.0.3) - MongoDB ODM
- **cors** (2.8.5) - Cross-origin resource sharing
- **helmet** (7.1.0) - Security middleware
- **express-rate-limit** (7.1.5) - Rate limiting
- **dotenv** (16.3.1) - Environment variables

### Development Dependencies
- **nodemon** (3.0.2) - Development server auto-restart
- **concurrently** (8.2.2) - Run multiple commands
- **react-scripts** (5.0.1) - React development tools

## 🔐 Security

This project implements security best practices:

- **Environment Variables**: Sensitive data is stored in environment variables
- **Rate Limiting**: API endpoints are protected against abuse
- **CORS**: Cross-origin requests are properly configured
- **Helmet**: Security headers are automatically set
- **Input Validation**: All inputs are validated and sanitized

**Important Security Notes:**
- Never commit `.env` files to version control
- Use strong, unique passwords for database connections
- Regularly rotate secrets in production
- See `SECURITY.md` for detailed security guidelines

## API Endpoints

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### Analytics
- `GET /api/analytics/overview` - Get application statistics
- `GET /api/analytics/recent-activity` - Get recent activities

## Project Structure

```
job-application-tracker/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context
│   │   └── App.js          # Main app component
│   └── public/             # Static assets
├── backend/                 # Express backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── server.js           # Server entry point
└── README.md               # Project documentation
```

## Contributing

This is a personal project created by Sumit Singh Sengar. If you'd like to contribute or have suggestions, please feel free to reach out.

## License

MIT License - Created by Sumit Singh Sengar
