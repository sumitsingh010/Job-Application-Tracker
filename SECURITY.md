# Security Guide

## 🔒 Environment Variables Security

This project uses environment variables to store sensitive configuration data like database credentials and API keys. **Never commit these values to version control.**

### Setup Instructions

1. **Copy the environment template:**
   ```bash
   cp backend/.env.example backend/.env
   ```

2. **Generate secure secrets:**
   ```javascript
   // Run this in Node.js console to generate secure random strings
   require('crypto').randomBytes(64).toString('hex')
   ```

3. **Update your `.env` file with real values:**
   - Replace `<username>` and `<password>` with your MongoDB Atlas credentials
   - Replace `<cluster>` with your cluster name
   - Replace `<database>` with your database name
   - Generate and replace the JWT and session secrets

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]` |
| `JWT_SECRET` | Secret for JWT token signing | Generate with crypto.randomBytes(64) |
| `SESSION_SECRET` | Secret for session management | Generate with crypto.randomBytes(64) |
| `NODE_ENV` | Environment (development/production) | `production` |
| `PORT` | Server port | `5000` |

### ⚠️ Security Best Practices

1. **Never commit `.env` files** - They're in `.gitignore` for a reason
2. **Use different secrets** for development and production
3. **Rotate secrets regularly** in production environments
4. **Use environment-specific configurations** for different deployments
5. **Limit database user permissions** to only what's needed

### MongoDB Atlas Security

1. **Create a dedicated database user** with minimal required permissions
2. **Whitelist only necessary IP addresses** in Atlas Network Access
3. **Enable MongoDB Atlas monitoring** and alerts
4. **Use strong, unique passwords** for database users

### Production Deployment

When deploying to production:

1. Set `NODE_ENV=production`
2. Use secure, randomly generated secrets
3. Enable HTTPS/TLS
4. Set up proper monitoring and logging
5. Regular security updates

## 🚨 If Secrets Are Exposed

If you accidentally commit secrets:

1. **Immediately rotate all exposed credentials**
2. **Remove secrets from git history** (consider tools like BFG Repo-Cleaner)
3. **Check access logs** for unauthorized usage
4. **Update all deployment environments** with new credentials

## Contact

For security concerns, please create an issue or contact the maintainer.
