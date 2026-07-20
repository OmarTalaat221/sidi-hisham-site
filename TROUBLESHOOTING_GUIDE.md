# Website Loading Troubleshooting Guide

## Issues Fixed

### 1. Redux Persist Configuration
- **Problem**: Missing PersistGate wrapper and improper persistor creation
- **Solution**: Added PersistGate wrapper and fixed persistor creation for SSR compatibility

### 2. Next.js Configuration
- **Problem**: Static export configuration was interfering with development
- **Solution**: Made configuration conditional based on environment

### 3. SSR Hydration Issues
- **Problem**: useWidth hook was accessing window during SSR
- **Solution**: Added proper window checks to prevent hydration mismatches

### 4. Error Handling
- **Problem**: No error boundaries to catch runtime errors
- **Solution**: Added ErrorBoundary component for better error handling

### 5. Webpack Configuration Error
- **Problem**: `Error: optimization.usedExports can't be used with cacheUnaffected as export usage is a global effect`
- **Solution**: Removed conflicting webpack optimization settings (usedExports and sideEffects)

### 6. Redux State Serialization Error
- **Problem**: `TypeError: Cannot create property 'local' on string` - State being serialized as string instead of object
- **Solution**: Added state validation middleware and error handling in language slice

### 7. Image Layout Configuration Error
- **Problem**: `has both "fill" and "style.position" properties. Images with "fill" always use position absolute`
- **Solution**: Removed conflicting `layout="fill"` and `style.position` properties, used proper dimensions instead

## How to Run the Website

### Quick Start (Windows)
Double-click `start-website.bat` to automatically install dependencies and start the server.

### Development Mode
```bash
npm run dev
```
This will start the development server on port 3333

### Production Mode
```bash
# Build the application
npm run build

# Start the production server
npm run start:prod
```

### Static Export (for hosting)
```bash
npm run build:export
```

## Common Issues and Solutions

### 1. Website Loads but Shows Blank Page
- Check browser console for JavaScript errors
- Verify all API endpoints are accessible
- Check if Redux store is properly initialized

### 2. Hydration Errors
- Clear browser cache and localStorage
- Restart the development server
- Check for components that use browser-only APIs

### 3. API Connection Issues
- Verify API endpoints are working
- Check network connectivity
- Ensure CORS is properly configured

### 4. Performance Issues
- Check for large bundle sizes
- Optimize images and assets
- Use lazy loading for heavy components

### 5. Webpack Build Errors
- **Error**: `optimization.usedExports can't be used with cacheUnaffected`
- **Solution**: Remove conflicting optimization settings from next.config.js

### 6. Redux State Errors
- **Error**: `TypeError: Cannot create property 'local' on string`
- **Solution**: Clear localStorage and restart the application
- **Automatic Fix**: The app now includes automatic state validation and corruption detection

### 7. Image Layout Errors
- **Error**: `has both "fill" and "style.position" properties`
- **Solution**: Use either `layout="fill"` OR `style.position`, not both
- **Best Practice**: Use explicit `height` and `width` props instead of `layout="fill"`

## Debugging Steps

1. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for JavaScript errors
   - Check Network tab for failed requests

2. **Check Terminal Output**
   - Look for build errors
   - Check for missing dependencies
   - Verify port availability

3. **Test API Endpoints**
   - Verify all API calls are working
   - Check response times
   - Ensure proper error handling

4. **Clear Cache**
   - Clear browser cache
   - Clear localStorage
   - Restart development server

5. **Reinstall Dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

6. **Fix Redux State Issues**
   ```javascript
   // In browser console
   localStorage.removeItem('persist:root');
   window.location.reload();
   ```

7. **Fix Image Layout Issues**
   ```jsx
   // ❌ Wrong - conflicting properties
   <Image layout="fill" style={{ position: "relative" }} />
   
   // ✅ Correct - use explicit dimensions
   <Image height={200} width={200} objectFit="contain" />
   
   // ✅ Correct - use fill with proper container
   <div style={{ position: "relative" }}>
     <Image layout="fill" objectFit="cover" />
   </div>
   ```

## Environment Variables

Make sure you have the following environment variables set (if needed):
```env
NODE_ENV=development
PORT=3333
```

## Dependencies

Ensure all dependencies are properly installed:
```bash
npm install
```

## Build Process

The build process now supports both development and production modes:

- **Development**: Uses Next.js development server
- **Production**: Uses custom server.js for better control
- **Static Export**: For static hosting platforms

## Performance Monitoring

The application includes performance monitoring that will log:
- Core Web Vitals (LCP, FID, CLS)
- Page load times
- Slow API calls
- Component render times

Check the browser console for performance metrics.

## Recent Fixes Applied

1. **Fixed webpack configuration conflict** - Removed `usedExports` and `sideEffects` settings that were causing build errors
2. **Added proper error boundaries** - Created ErrorBoundary component for better error handling
3. **Fixed SSR hydration issues** - Added window checks in useWidth hook
4. **Improved Redux persistence** - Added PersistGate wrapper and fixed persistor creation
5. **Created startup script** - Added `start-website.bat` for easy Windows startup
6. **Fixed Redux state serialization** - Added state validation middleware and automatic corruption detection
7. **Added automatic state recovery** - ClearStorage component automatically detects and fixes corrupted state
8. **Fixed image layout conflicts** - Removed conflicting `layout="fill"` and `style.position` properties in multiple components
