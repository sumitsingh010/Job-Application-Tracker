# 🚀 Deployment Guide

## Environment Variables Template

When deploying to Render, add these environment variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority
```

## Setup Instructions

1. **MongoDB Atlas:**
   - Create free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
   - Create database user with read/write permissions
   - Add your connection string to environment variables

2. **Render Deployment:**
   - Connect your GitHub repository
   - Add environment variables above
   - Deploy with build command: `npm install && cd frontend && npm install && cd ../backend && npm install && cd ../frontend && npm run build`
   - Start command: `cd backend && npm start`

## Security Notes

- Never commit actual passwords or connection strings to Git
- Use environment variables for all sensitive data
- Keep `.env` files in `.gitignore`
