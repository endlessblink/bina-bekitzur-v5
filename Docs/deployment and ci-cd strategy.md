# Deployment & CI/CD Configuration

# 1. Infrastructure (Vercel)
INFRASTRUCTURE:
  provider: "Vercel"
  specifications:
    node_version: "18.x"
    framework_preset: "Next.js"
    regions:
      - "fra1" # Frankfurt for EU/Israel coverage
    environment:
      runtime: "nodejs18.x"
      serverless_functions: true
      edge_functions: true

# 2. Environment Configuration
ENVIRONMENTS:
  development:
    url: "dev.bina-bekitzur.com"
    auto_deploy: true
    branch: "develop"
    environment_variables:
      NODE_ENV: "development"
      LOG_LEVEL: "debug"

  staging:
    url: "staging.bina-bekitzur.com"
    auto_deploy: true
    branch: "staging"
    environment_variables:
      NODE_ENV: "staging"
      LOG_LEVEL: "info"

  production:
    url: "bina-bekitzur.com"
    auto_deploy: false
    branch: "main"
    environment_variables:
      NODE_ENV: "production"
      LOG_LEVEL: "warn"

# 3. Build Configuration
BUILD:
  commands:
    install: "pnpm install"
    build: "pnpm build"
    test: "pnpm test"
  cache:
    directories:
      - ".next/cache"
      - "node_modules"
    
# 4. CI/CD Pipeline
CI_CD:
  github_actions:
    workflows:
      pull_request:
        steps:
          - name: "Checkout"
            uses: "actions/checkout@v3"

          - name: "Setup Node.js"
            uses: "actions/setup-node@v3"
            with:
              node-version: "18"

          - name: "Install dependencies"
            run: "pnpm install"

          - name: "Type checking"
            run: "pnpm type-check"

          - name: "Linting"
            run: "pnpm lint"

          - name: "Unit tests"
            run: "pnpm test"

          - name: "Build check"
            run: "pnpm build"

      deploy_production:
        needs: ["pull_request"]
        if: "github.ref == 'refs/heads/main'"
        steps:
          - name: "Deploy to Vercel"
            uses: "vercel/actions/deploy@v3"
            with:
              vercel-token: "${{ secrets.VERCEL_TOKEN }}"
              vercel-org-id: "${{ secrets.ORG_ID}}"
              vercel-project-id: "${{ secrets.PROJECT_ID }}"
              vercel-args: "--prod"

# 5. Monitoring & Alerts
MONITORING:
  services:
    - name: "Vercel Analytics"
      features:
        - "Real-time metrics"
        - "Core Web Vitals"
        - "Error tracking"
        - "Performance monitoring"

    - name: "Sentry"
      features:
        - "Error tracking"
        - "Performance monitoring"
        - "Session replay"
      alert_conditions:
        - "Error rate > 1%"
        - "P95 response time > 1s"

# 6. Backup Strategy
BACKUP:
  database:
    provider: "Neon"
    frequency: "daily"
    retention: "30 days"
    type: "automated"

  content:
    provider: "GitHub"
    frequency: "on-commit"
    retention: "infinite"

# 7. Security Measures
SECURITY:
  headers:
    Content-Security-Policy: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.youtube.com *.spotify.com; style-src 'self' 'unsafe-inline';"
    X-Frame-Options: "DENY"
    X-Content-Type-Options: "nosniff"
    Referrer-Policy: "strict-origin-when-cross-origin"
    Permissions-Policy: "camera=(), microphone=(), geolocation=()"

  ssl:
    enabled: true
    provider: "Let's Encrypt"
    auto_renewal: true

# 8. Rollback Strategy
ROLLBACK:
  automatic:
    conditions:
      - "Error rate > 5%"
      - "5xx rate > 1%"
    action: "revert to last stable deploy"

  manual:
    command: "vercel rollback --environment production"
    requires:
      - "team lead approval"

# 9. Performance Optimization
PERFORMANCE:
  build_optimization:
    - "Tree shaking"
    - "Code splitting"
    - "Image optimization"
    - "Font optimization"

  runtime_optimization:
    - "Edge caching"
    - "Static page generation"
    - "Incremental Static Regeneration"
    - "Partial Prerendering"

# 10. Scaling Strategy
SCALING:
  automatic:
    provider: "Vercel"
    type: "serverless"
    limits:
      concurrent_executions: 1000
      function_memory: "1024MB"
      function_timeout: "10s"

  database:
    provider: "Neon"
    type: "serverless"
    auto_scaling: true