import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SEO({
  title = "سيدي هشام - شركة العقاد للصناعة والتجارة",
  description = "شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة يتم استخدامها في ملايين غرف المعيشة والمطابخ",
  keywords = "سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة, مطابخ, غرف معيشة",
  image = "https://www.sedihisham.com/images/logo.png",
  url,
  type = "website",
  locale = "ar_SA",
  alternateLocales = ["en_US"],
  publishedTime,
  modifiedTime,
  author = "سيدي هشام",
  section = "صناعة غذائيات",
  tags = ["سيدي هشام", "شركة العقاد", "صناعة غذائيات"],
  noindex = false,
  nofollow = false,
  canonical = true
}) {
  const router = useRouter();
  const currentUrl = url || `https://www.sedihisham.com${router.asPath}`;
  const canonicalUrl = canonical ? currentUrl : null;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Language and Locale */}
      <meta property="og:locale" content={locale} />
      {alternateLocales.map(locale => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="سيدي هشام" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@sedihisham" />
      
      {/* Article Specific Meta Tags */}
      {type === "article" && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:author" content={author} />
          <meta property="article:section" content={section} />
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      
      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "سيدي هشام",
            "alternateName": "Sedi Hisham",
            "url": "https://www.sedihisham.com",
            "logo": "https://www.sedihisham.com/images/logo.png",
            "description": description,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "SA",
              "addressLocality": "الرياض",
              "addressRegion": "الرياض"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+966-11-123-4567",
              "contactType": "customer service",
              "availableLanguage": ["Arabic", "English"]
            },
            "sameAs": [
              "https://www.facebook.com/sedihisham",
              "https://www.twitter.com/sedihisham",
              "https://www.instagram.com/sedihisham"
            ]
          })
        }}
      />
      
      {/* Structured Data - WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "سيدي هشام",
            "url": "https://www.sedihisham.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.sedihisham.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </Head>
  );
}
