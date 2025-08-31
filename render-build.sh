# Build Commands for Render.com Deployment
# This file contains the build process for the Job Application Tracker

# Install dependencies for both frontend and backend
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies  
cd ../backend && npm install

# Build the React application
cd ../frontend && npm run build

# Return to root directory
cd ..
