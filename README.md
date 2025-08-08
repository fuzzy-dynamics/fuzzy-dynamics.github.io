# GitHub Pages Deployment Guide

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

## Setup Instructions

### 1. Repository Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** / **Pages**
3. Under **Source**, select "GitHub Actions"
4. Save the settings

### 2. Environment Variables

The project uses the following environment variable:

- `VITE_API_BASE_URL`: Backend API endpoint

#### Local Development

Create a `.env` file in the `frontend/` directory:

```bash
# Copy from .env.example and modify
VITE_API_BASE_URL=http://localhost:8000
```

#### Production (GitHub Pages)

Environment variables for production are configured in:

1. **GitHub Secrets** (recommended for sensitive data):

   - Go to **Settings** / **Secrets and variables** / **Actions**
   - Add `VITE_API_BASE_URL` with your production backend URL

2. **Workflow file** (fallback):
   - The workflow defaults to `https://fydy.ai` if no secret is set
   - Edit `.github/workflows/deploy.yml` to change the default

### 3. Custom Domain (Optional)

If using a custom domain:

1. Add your domain to the `CNAME` file (already configured: `fydy.ai`)
2. Configure DNS settings to point to GitHub Pages
3. Enable HTTPS in repository settings

### 4. Deployment Process

#### Automatic Deployment

- **Triggers**: Push to `main` or `master` branch
- **Build**: Runs `npm run build:prod` with production environment variables
- **Deploy**: Uploads to GitHub Pages automatically

#### Manual Deployment

From the `frontend/` directory:

```bash
# Install dependencies (if not already done)
npm install

# Build and deploy manually
npm run deploy
```

### 5. Build Configuration

The project is configured with:

- **Vite config**: Optimized for GitHub Pages
- **Base path**: Set to `/` for custom domain deployment
- **Environment handling**: Automatic production/development mode detection
- **Asset optimization**: Minification and proper chunking

### 6. Troubleshooting

#### Common Issues

1. **404 on page refresh**:

   - GitHub Pages doesn't support SPA routing by default
   - Add a `404.html` that redirects to `index.html` if needed

2. **Environment variables not working**:

   - Ensure variables start with `VITE_`
   - Check GitHub Secrets configuration
   - Verify workflow file syntax

3. **Build failures**:
   - Check GitHub Actions logs
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

#### Checking Deployment

1. **GitHub Actions**: Check the "Actions" tab for build status
2. **Live site**: Visit your GitHub Pages URL or custom domain
3. **Console**: Check browser console for any runtime errors

### 7. Project Structure

```
web/
├── .github/workflows/deploy.yml  # GitHub Actions workflow
├── frontend/
│   ├── .env.example             # Environment template
│   ├── .env.production          # Production environment (blocked by gitignore)
│   ├── package.json             # Build scripts and dependencies
│   ├── vite.config.ts           # Vite configuration
│   └── dist/                    # Build output (auto-generated)
├── CNAME                        # Custom domain configuration
└── DEPLOYMENT.md               # This file
```

## Next Steps

1. Push your changes to trigger the first deployment
2. Monitor the GitHub Actions workflow
3. Test the deployed site functionality
4. Configure any additional environment variables as needed
5. Set up monitoring for your production API endpoints

The site will be available at: https://fydy.ai (or your configured domain)
