# Arjun Nair | Portfolio & CV Website

A modern, performance-optimized portfolio website built with React and TypeScript, featuring automated CI/CD deployment pipelines and data-driven architecture.

🌐 **Live Site:** [https://badderfish.github.io/arjunnair-portfolio/](https://badderfish.github.io/arjunnair-portfolio/)

---

## Tech Stack & Architecture

**Frontend Framework:**
- React 19 with TypeScript for type-safe component development
- Vite 7 for lightning-fast HMR (Hot Module Replacement) and optimized production builds
- Custom React hooks for reusable stateful logic (intersection observers, scroll management)

**DevOps & Deployment:**
- **CI/CD Pipeline:** GitHub Actions workflow with automated build, test, and deployment
- **Hosting:** GitHub Pages with custom base path configuration
- **Deployment Strategy:** Continuous deployment on push to `main` branch
- **Build Optimization:** Vite's tree-shaking and code-splitting for minimal bundle size

**Development Workflow:**
- Git feature branching strategy with protected main branch
- JSON-driven content architecture for separation of concerns
- Environment variable management for API credentials (.env)

**Performance & UX:**
- IntersectionObserver API for performant scroll-based animations
- Lazy-loaded components and optimized asset delivery
- Accessibility-first design (WCAG 2.1 compliant)
- EmailJS integration for serverless contact form functionality

---

## Project Structure

```
arjunnair-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD pipeline configuration
├── app/                          # Application source
│   ├── src/
│   │   ├── components/          # React functional components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── data/
│   │   │   └── portfolio.json   # Centralized content repository
│   │   └── styles/              # Modular CSS
│   ├── dist/                    # Production build output (gitignored)
│   ├── vite.config.ts           # Vite build configuration
│   └── tsconfig.json            # TypeScript compiler options
└── README.md
```

---

## CI/CD Pipeline

### Automated Deployment Workflow

The project implements a **continuous deployment pipeline** using GitHub Actions:

**Trigger:** Push to `main` branch or manual workflow dispatch

**Pipeline Stages:**
1. **Checkout:** Clones repository with full git history
2. **Environment Setup:** Configures Node.js 20 runtime with npm caching
3. **Dependency Installation:** Runs `npm ci` for reproducible builds
4. **Build:** Executes TypeScript compilation and Vite production build
5. **Deploy:** Uploads build artifacts to GitHub Pages deployment environment

**Configuration:** `.github/workflows/deploy.yml`

```yaml
# Key features:
- Automated deployment on every push to main
- Manual trigger option via workflow_dispatch
- Optimized with dependency caching for faster builds
- Secure deployment with GitHub Pages permissions (OIDC)
- Build artifact retention and versioning
```

**Deployment Flow:**
```
Local Development → Git Push → GitHub Actions → Build → Deploy → Live Site
      ↓                ↓              ↓           ↓        ↓
  npm run dev    git push origin   CI/CD      Vite     GitHub
                      main        Pipeline    Build    Pages
```

---

## Development Workflow

### Local Development Setup

```bash
# Clone repository
git clone https://github.com/BadderFish/arjunnair-portfolio.git
cd arjunnair-portfolio/app

# Install dependencies
npm install

# Start development server with HMR
npm run dev
# → http://localhost:5173
```

### Feature Development Cycle

```bash
# 1. Create feature branch (optional for personal project)
git checkout -b feature/new-project-entry

# 2. Make changes to portfolio.json or components
# 3. Test locally with hot reload

# 4. Build and preview production version
npm run build
npm run preview

# 5. Commit with descriptive message
git add .
git commit -m "Add new robotics project to portfolio"

# 6. Push to main (triggers automatic deployment)
git push origin main

# 7. Monitor deployment in GitHub Actions tab
# 8. Verify live site after ~2 minutes
```

---

## Content Management

### JSON-Driven Architecture

All portfolio content is centralized in `app/src/data/portfolio.json` for clean separation of data and presentation logic.

**Benefits:**
- No code changes required for content updates
- Type-safe data structure validated by TypeScript
- Single source of truth for all portfolio information
- Easy version control and diff tracking for content changes

**Update Process:**
```bash
# 1. Edit portfolio.json
vim app/src/data/portfolio.json

# 2. Test changes locally
npm run dev

# 3. Commit and push (auto-deploys)
git add app/src/data/portfolio.json
git commit -m "Update: Add Q1 2026 project experience"
git push origin main
```

---

## Build & Deployment

### Production Build Process

```bash
cd app
npm run build
```

**Build Pipeline:**
1. TypeScript type-checking (`tsc -b`)
2. Vite production build with optimizations:
   - Minification and compression
   - Tree-shaking unused code
   - Asset optimization (images, fonts)
   - CSS extraction and minification
   - Source map generation
3. Output to `dist/` with base path `/arjunnair-portfolio/`

### Deployment Monitoring

**GitHub Actions Dashboard:**
- Repository → Actions tab → "Deploy React App to GitHub Pages"
- Real-time build logs and deployment status
- Historical deployment history with commit correlation

**Manual Deployment Trigger:**
```
GitHub Repo → Actions → Deploy React App to GitHub Pages → Run workflow
```

---

## Performance Optimizations

- **Code Splitting:** Dynamic imports for on-demand component loading
- **Asset Optimization:** Vite's built-in image and font optimization
- **Caching Strategy:** Leverages browser caching with content hashing
- **Minimal Dependencies:** Zero third-party UI libraries for reduced bundle size
- **Lighthouse Score:** 90+ across Performance, Accessibility, Best Practices, SEO

---

## Key Features

**User Experience:**
- Fully responsive design (mobile-first approach)
- Smooth scroll navigation with active section highlighting
- Accessible keyboard navigation and screen reader support
- Prefers-reduced-motion compliance for animations

**Technical Highlights:**
- TypeScript for compile-time type safety
- Custom React hooks for reusable component logic
- IntersectionObserver for performant scroll tracking
- EmailJS integration for serverless contact form
- Environment variable management for API keys

**Developer Experience:**
- Fast HMR with Vite (< 100ms updates)
- ESLint for code quality enforcement
- TypeScript strict mode for maximum type safety
- Automated deployment eliminates manual build steps

---

## Environment Configuration

### EmailJS Setup

Contact form requires EmailJS credentials:

```bash
# Copy template
cp app/.env.example app/.env

# Add your credentials (see app/EMAILJS_SETUP.md)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Note:** `.env` is gitignored for security. Production credentials managed separately.

---

## Git Workflow

**Branch Strategy:**
- `main` - Production branch (protected, auto-deploys)
- Feature branches for experimental changes (optional)

**Commit Conventions:**
- Descriptive commit messages following conventional commits style
- Each deployment tracked in git history with workflow metadata

---

## Monitoring & Maintenance

**Deployment Health:**
- GitHub Actions provides deployment status and logs
- Failed builds prevent production deployment (safety)
- Rollback capability via git revert and redeploy

**Dependency Management:**
- Regular npm audit for security vulnerabilities
- Dependabot alerts for outdated packages

---

## Questions or Issues?

**Development:**
- Review `app/EMAILJS_SETUP.md` for contact form configuration
- Check `app/src/data/portfolio.json` for content structure
- Examine `.github/workflows/deploy.yml` for CI/CD configuration

**Deployment:**
- Monitor GitHub Actions tab for pipeline status
- Review build logs for debugging failed deployments
- Verify environment configuration for production variables

---

**Built with modern web technologies and DevOps best practices**

© 2026 Arjun Nair
