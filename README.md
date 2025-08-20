# Job Application Tracker

A professional job application tracking system with analytics dashboard to help manage your job search effectively.

**Created by:** Sumit Singh Sengar

## 🎥 Demo Video

**[Watch the Demo](https://drive.google.com/file/d/181HD3Cnq4fLPil1kzHNCoDp_TC8fJUtF/view?usp=sharing)** - See the application in action!

## ✨ Features

- **Kanban Board**: Drag-and-drop interface to manage applications
- **Analytics Dashboard**: Visual insights into your job search progress
- **Application Management**: Add, edit, and delete job applications
- **Status Tracking**: Applied, Interview, Hired, and Rejected stages
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface

## 🚀 Quick Start

1. **Clone and install**
   ```bash
   git clone [your-repo-url]
   cd job-application-tracker
   npm run install-all
   ```

2. **Set up environment**
   ```bash
   # Copy template and edit with your MongoDB URI
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database connection
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```
   
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## 🛠️ Tech Stack

**Frontend:** React, Context API, Custom CSS, Recharts  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Security:** Helmet, CORS, Rate Limiting

## 📡 API Endpoints

- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create new application  
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application
- `GET /api/analytics/overview` - Get statistics

## 🔒 Security

- Environment variables for sensitive data
- Secure JWT tokens and session management
- Rate limiting and CORS protection
- See `SECURITY.md` for detailed guidelines

## 📄 License

MIT License - Created by Sumit Singh Sengar
