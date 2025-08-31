# 🍃 MongoDB Atlas Setup for Job Application Tracker

## Quick Setup Steps:

### 1. Create MongoDB Atlas Account
- Go to: https://cloud.mongodb.com
- Sign up with Google/GitHub or email
- Choose "Shared" (Free tier)

### 2. Create Cluster
- Click "Build a Database"
- Choose "M0 Sandbox" (Free)
- Select region closest to your Render deployment (US East - Ohio)
- Cluster Name: `job-tracker-cluster`

### 3. Create Database User
- Go to "Database Access" in left sidebar
- Click "Add New Database User"
- Authentication Method: Password
- Username: `jobtracker`
- Password: Generate secure password (save this!)
- Database User Privileges: "Read and write to any database"

### 4. Configure Network Access
- Go to "Network Access" in left sidebar  
- Click "Add IP Address"
- Choose "Allow access from anywhere" (0.0.0.0/0)
- Or add specific IPs if you prefer

### 5. Get Connection String
- Go to "Database" in left sidebar
- Click "Connect" on your cluster
- Choose "Connect your application"
- Driver: Node.js, Version: 4.1 or later
- Copy connection string:

```
mongodb+srv://jobtracker:<db_password>@job-tracker-cluster.gchdsci.mongodb.net/?retryWrites=true&w=majority&appName=job-tracker-cluster
```

### 6. Your Final Connection String ✅
**Username:** `jobtracker`  
**Password:** `Sumit12345`  
**Cluster:** `job-tracker-cluster.gchdsci.mongodb.net`

**Complete connection string for Render deployment:**
```
mongodb+srv://jobtracker:Sumit12345@job-tracker-cluster.gchdsci.mongodb.net/job-tracker?retryWrites=true&w=majority&appName=job-tracker-cluster
```

⚠️ **Key Changes Made:**
1. ✅ Username: `jobtracker`
2. ✅ Password: `Sumit12345`  
3. ✅ Added database name: `/job-tracker`
4. ✅ Correct cluster: `gchdsci.mongodb.net`

⚠️ **Important**: Make sure to add `/job-tracker` to specify the database name

## Ready for Render! 🚀

Use this connection string as MONGODB_URI in your Render environment variables.
