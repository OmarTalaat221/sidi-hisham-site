# Build Troubleshooting Guide

## Issues Fixed

### 1. ESLint Configuration Error ✅
**Problem:** `Cannot read config file: .eslintrc.json Error: Unexpected end of JSON input`

**Solution:** Fixed the commented-out ESLint configuration file
```json
{
  "extends": "next/core-web-vitals"
}
```

### 2. Ant Design Icons Module Resolution Error ✅
**Problem:** `Cannot find module '@ant-design/icons-svg/es/asn/CheckCircleFilled'`

**Solution:** 
- Added missing dependencies: `@ant-design/icons` and `@ant-design/icons-svg`
- Added webpack alias resolution in `next.config.js`
- Removed `antd` from `optimizePackageImports` to prevent conflicts

### 3. Static Export Configuration Issues ✅
**Problem:** `Specified "redirects" and "headers" will not automatically work with "output: export"`

**Solution:**
- Removed `redirects` and `headers` from `next.config.js` (they don't work with static export)
- Created `public/_redirects` file for hosting platforms like Netlify
- Added `trailingSlash: true` for better static export compatibility

### 4. Missing Sharp Package ✅
**Problem:** `For production Image Optimization with Next.js, the optional 'sharp' package is strongly recommended`

**Solution:** Added `sharp: "^0.33.2"` to dependencies

### 5. Outdated Browserslist ✅
**Problem:** `Browserslist: caniuse-lite is outdated`

**Solution:** Added `update-browserslist` script to package.json

## Build Commands

### Clean Build
```bash
# Clear cache and node_modules
rm -rf .next build node_modules
npm install

# Update browserslist
npm run update-browserslist

# Build
npm run build
```

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start
```

## Static Export Notes

Since we're using `output: 'export'`, the following features don't work:

1. **API Routes** - Use external APIs instead
2. **Dynamic Routes** - All routes must be static
3. **Server-side redirects** - Use `public/_redirects` file
4. **Server-side headers** - Configure at hosting platform level

## Hosting Configuration

### Netlify
Create `netlify.toml`:
```toml
[build]
  publish = "build"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Vercel
Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Performance Optimizations Applied

1. **Image Optimization**
   - Added Sharp for better image processing
   - WebP/AVIF format support
   - Responsive image sizes

2. **Bundle Optimization**
   - Code splitting for vendor libraries
   - Tree shaking enabled
   - Package import optimization

3. **Caching Strategy**
   - Static assets caching headers
   - Browser caching optimization

## Common Issues & Solutions

### Issue: Build fails with module not found
**Solution:** 
```bash
npm install
npm run build
```

### Issue: ESLint errors
**Solution:**
```bash
npm run lint -- --fix
```

### Issue: Image optimization not working
**Solution:**
```bash
npm install sharp
npm run build
```

### Issue: Ant Design icons not loading
**Solution:**
```bash
npm install @ant-design/icons @ant-design/icons-svg
npm run build
```

## Monitoring

After successful build:

1. **Check bundle size:**
   ```bash
   npm run analyze
   ```

2. **Test performance:**
   ```bash
   npm run lighthouse
   ```

3. **Run SEO scan:**
   ```bash
   npm run seo-scan
   ```

## Deployment Checklist

- [ ] Build completes without errors
- [ ] All images load correctly
- [ ] No console errors in browser
- [ ] Performance score > 70
- [ ] SEO score > 90
- [ ] Mobile responsiveness works
- [ ] All links work correctly
- [ ] Forms submit properly
- [ ] API calls work (if any)
- [ ] Caching headers are set
- [ ] Redirects work (if configured)
