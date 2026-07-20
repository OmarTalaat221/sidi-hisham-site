# Quick Implementation Guide - SEO Improvements

## 🚀 Quick Start

### 1. Run SEO Scan
```bash
npm run seo-scan
```

### 2. Apply SEO Component to All Pages

Replace the existing `<Head>` component in each page with the new `<SEO>` component:

**Before:**
```jsx
import Head from 'next/head';

// In your component
<Head>
  <title>Page Title</title>
  <meta name="description" content="..." />
</Head>
```

**After:**
```jsx
import SEO from '@/components/SEO';

// In your component
<SEO 
  title="Page Title"
  description="Page description under 160 characters"
  keywords="relevant, keywords, here"
/>
```

### 3. Replace Image Components

Replace `Image` components with `SEOImage` for better alt text handling:

**Before:**
```jsx
import Image from 'next/image';

<Image
  src={image}
  width={300}
  height={200}
  alt=""
/>
```

**After:**
```jsx
import SEOImage from '../common/SEOImage';

<SEOImage
  src={image}
  width={300}
  height={200}
  alt="Descriptive alt text"
/>
```

## 📋 Checklist for Each Page

- [ ] Replace `<Head>` with `<SEO>` component
- [ ] Ensure only one `<h1>` tag per page
- [ ] Replace `<Image>` with `<SEOImage>` where appropriate
- [ ] Add descriptive alt text to all images
- [ ] Keep meta descriptions under 160 characters
- [ ] Add relevant keywords
- [ ] Test page with SEO scan

## 🔧 Configuration

### SEO Component Props
```jsx
<SEO 
  title="Page Title"                    // Required
  description="Page description"        // Required (max 160 chars)
  keywords="keyword1, keyword2"         // Optional
  image="https://example.com/image.jpg" // Optional
  url="https://example.com/page"        // Optional
  type="website"                        // Optional: website, article
  noindex={false}                       // Optional
  nofollow={false}                      // Optional
  canonical={true}                      // Optional
/>
```

### SEOImage Component Props
```jsx
<SEOImage
  src="image-url"                       // Required
  alt="Alt text"                        // Optional (auto-generated if empty)
  width={300}                           // Required
  height={200}                          // Required
  className="custom-class"              // Optional
  loader={customLoader}                 // Optional
  priority={false}                      // Optional
/>
```

## 🎯 Priority Pages to Update

1. **Homepage** (`pages/index.js`) ✅ Already updated
2. **News pages** (`pages/news/`) 
3. **Product pages** (`pages/categories/`)
4. **About page** (`pages/whoweare/`)
5. **Contact page** (`pages/contact/`)
6. **Kitchen page** (`pages/kitchen/`)

## 🧪 Testing

### 1. Run SEO Scan
```bash
npm run seo-scan
```

### 2. Test with Google Tools
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### 3. Check Meta Tags
- View page source
- Verify meta description length
- Check for canonical URLs
- Validate Open Graph tags

## 📈 Monitoring

### 1. Google Search Console
- Submit sitemap.xml
- Monitor indexing status
- Check for crawl errors

### 2. Analytics
- Monitor organic traffic
- Track keyword rankings
- Analyze user behavior

## 🚨 Common Issues & Solutions

### Issue: Multiple H1 tags
**Solution:** Keep only one H1 per page, use H2 for section headings

### Issue: Missing alt attributes
**Solution:** Use SEOImage component or add descriptive alt text

### Issue: Long meta descriptions
**Solution:** Keep under 160 characters, be descriptive but concise

### Issue: Missing canonical URLs
**Solution:** Use SEO component with canonical={true}

### Issue: No structured data
**Solution:** SEO component includes basic structured data automatically

## 📞 Support

If you encounter issues:
1. Check the SEO_OPTIMIZATION_GUIDE.md for detailed explanations
2. Run `npm run seo-scan` to identify specific issues
3. Review the component documentation in the code

## 🎉 Success Metrics

After implementation, you should see:
- ✅ Improved search engine rankings
- ✅ Better click-through rates from search results
- ✅ Enhanced social media sharing appearance
- ✅ Improved page loading speed
- ✅ Better accessibility scores
