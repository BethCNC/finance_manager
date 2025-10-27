# Finance Manager Deployment Guide

## Overview

This guide covers the complete deployment process for the Finance Manager application, including environment setup, configuration, and deployment to various platforms.

## Prerequisites

### System Requirements

**Development Environment**:
- Node.js 18+ and npm 8+
- Git
- Code editor (VS Code recommended)
- Modern web browser

**Production Environment**:
- Node.js 18+ runtime
- 512MB+ RAM
- 1GB+ storage
- HTTPS certificate

### Required Accounts

**Notion**:
- Notion account with API access
- Notion API key
- Notion databases set up

**OpenAI**:
- OpenAI account
- OpenAI API key
- Sufficient credits

**Plaid**:
- Plaid account
- Plaid API keys (Client ID, Secret)
- Plaid environment access

**Vercel** (Recommended):
- Vercel account
- GitHub account (for deployment)

## Environment Setup

### 1. Local Development

**Clone Repository**:
```bash
git clone https://github.com/your-username/finance-manager.git
cd finance-manager
```

**Install Dependencies**:
```bash
npm install
```

**Environment Variables**:
Create `.env.local` file:
```bash
# Notion API
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# OpenAI API
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Plaid API
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox
PLAID_ACCESS_TOKEN=your_plaid_access_token

# Database IDs
TRANSACTIONS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUDGET_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOALS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# App Configuration
REACT_APP_API_BASE_URL=http://localhost:3000
REACT_APP_ENVIRONMENT=development
```

**Start Development Server**:
```bash
npm start
```

### 2. Production Environment

**Environment Variables**:
```bash
# Notion API
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# OpenAI API
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Plaid API
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=production
PLAID_ACCESS_TOKEN=your_plaid_access_token

# Database IDs
TRANSACTIONS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUDGET_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOALS_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# App Configuration
REACT_APP_API_BASE_URL=https://your-domain.com
REACT_APP_ENVIRONMENT=production
```

## Deployment Options

### 1. Vercel (Recommended)

**Why Vercel**:
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Serverless functions
- Easy environment management

**Deployment Steps**:

1. **Connect GitHub Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "build",
     "installCommand": "npm install"
   }
   ```

3. **Set Environment Variables**:
   - Go to Project Settings > Environment Variables
   - Add all required environment variables
   - Set for Production, Preview, and Development

4. **Deploy**:
   - Vercel automatically deploys on every push to main branch
   - Manual deployment available in dashboard

**Vercel Configuration**:
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "crons": [
    {
      "path": "/api/plaid-sync-cron",
      "schedule": "0 6 * * *"
    }
  ]
}
```

### 2. Netlify

**Deployment Steps**:

1. **Connect Repository**:
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**:
   ```
   Build command: npm run build
   Publish directory: build
   ```

3. **Environment Variables**:
   - Go to Site Settings > Environment Variables
   - Add all required variables

4. **Deploy**:
   - Netlify automatically deploys on every push
   - Manual deployment available

**Netlify Configuration**:
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. AWS Amplify

**Deployment Steps**:

1. **Connect Repository**:
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
   - Click "New app" > "Host web app"
   - Connect your GitHub repository

2. **Build Settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: build
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**:
   - Add variables in Amplify Console
   - Set for Production and Development

### 4. Docker Deployment

**Dockerfile**:
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf**:
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /api {
            proxy_pass http://backend:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

**Docker Compose**:
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - REACT_APP_API_BASE_URL=http://localhost:3000
    depends_on:
      - backend

  backend:
    image: node:18-alpine
    working_dir: /app
    volumes:
      - ./api:/app
    ports:
      - "3000:3000"
    environment:
      - NOTION_API_KEY=${NOTION_API_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - PLAID_CLIENT_ID=${PLAID_CLIENT_ID}
      - PLAID_SECRET=${PLAID_SECRET}
    command: npm start
```

**Deploy with Docker**:
```bash
# Build and run
docker-compose up -d

# Or build image
docker build -t finance-manager .
docker run -p 80:80 finance-manager
```

## Database Setup

### 1. Notion Databases

**Transactions Database**:
```
Properties:
- Description (Title)
- Amount (Number)
- Date (Date)
- Type (Select: Debit, Credit)
- Category (Select: Food & Groceries, Transportation, etc.)
- Account (Select: SECU, Apple Cash, Cash App, etc.)
- Who (Select: Beth, Bryan, Joint)
- Business (Checkbox)
- Subscription (Checkbox)
- Notes (Rich Text)
```

**Budget Database**:
```
Properties:
- Month (Title)
- Category (Select)
- Budgeted (Number)
- Actual (Number)
- Remaining (Formula: Budgeted - Actual)
```

**Goals Database**:
```
Properties:
- Name (Title)
- Target (Number)
- Current (Number)
- Target Date (Date)
- Category (Select)
- Priority (Select: High, Medium, Low)
- Description (Rich Text)
- Status (Select: Active, Completed, Paused)
```

### 2. Database Permissions

**Notion Integration**:
- Create Notion integration
- Generate API key
- Share databases with integration
- Set appropriate permissions

## Security Configuration

### 1. Environment Variables

**Secure Storage**:
- Use environment variables for all secrets
- Never commit secrets to version control
- Use different keys for different environments
- Rotate keys regularly

**Access Control**:
- Limit API key permissions
- Use least privilege principle
- Monitor API usage
- Set up alerts for unusual activity

### 2. HTTPS Configuration

**SSL Certificates**:
- Use Let's Encrypt for free certificates
- Configure automatic renewal
- Set up HSTS headers
- Use strong cipher suites

**Security Headers**:
```javascript
// Add to your server configuration
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

### 3. API Security

**Rate Limiting**:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

**Input Validation**:
```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/transactions', [
  body('amount').isNumeric(),
  body('date').isISO8601(),
  body('category').isIn(['Food & Groceries', 'Transportation', ...])
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process request
});
```

## Monitoring and Logging

### 1. Application Monitoring

**Error Tracking**:
- Set up error reporting endpoint
- Monitor error rates and patterns
- Set up alerts for critical errors
- Track performance metrics

**Health Checks**:
```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
```

### 2. Logging

**Structured Logging**:
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### 3. Performance Monitoring

**Metrics Collection**:
- Track response times
- Monitor memory usage
- Track API usage
- Set up performance alerts

## Backup and Recovery

### 1. Data Backup

**Notion Data**:
- Export databases regularly
- Use Notion's built-in backup features
- Store backups in secure location
- Test backup restoration

**Application Data**:
- Backup environment variables
- Backup configuration files
- Backup database schemas
- Document recovery procedures

### 2. Disaster Recovery

**Recovery Plan**:
- Document recovery procedures
- Test recovery processes
- Maintain recovery documentation
- Train team on recovery procedures

## Maintenance

### 1. Regular Updates

**Dependencies**:
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update specific packages
npm install package@latest
```

**Security Updates**:
- Monitor security advisories
- Update dependencies regularly
- Test updates in staging
- Deploy updates promptly

### 2. Performance Optimization

**Bundle Analysis**:
```bash
# Analyze bundle size
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

**Performance Monitoring**:
- Monitor Core Web Vitals
- Track user experience metrics
- Optimize based on data
- Regular performance reviews

## Troubleshooting

### 1. Common Issues

**Build Failures**:
- Check Node.js version
- Clear npm cache
- Delete node_modules and reinstall
- Check for dependency conflicts

**Runtime Errors**:
- Check environment variables
- Verify API keys
- Check network connectivity
- Review error logs

**Performance Issues**:
- Monitor resource usage
- Check for memory leaks
- Optimize database queries
- Review bundle size

### 2. Debugging

**Local Debugging**:
```bash
# Enable debug logging
DEBUG=* npm start

# Check environment variables
npm run env

# Test API endpoints
curl http://localhost:3000/api/health
```

**Production Debugging**:
- Check application logs
- Monitor error rates
- Use debugging tools
- Review performance metrics

## Conclusion

This deployment guide provides comprehensive instructions for deploying the Finance Manager application. Follow the steps carefully, test thoroughly, and maintain security best practices throughout the deployment process.

For additional support:
- **Documentation**: https://docs.example.com
- **Support**: support@example.com
- **GitHub Issues**: https://github.com/example/finance-manager/issues
