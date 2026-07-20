import OptimizedImage from "./OptimizedImage";
import React from 'react';

export default function SEOImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  loader,
  priority = false,
  placeholder = 'blur',
  blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
  ...props
}) {
  // Generate meaningful alt text if none provided
  const generateAltText = (imageSrc) => {
    if (alt && alt.trim() !== '') {
      return alt;
    }
    
    // Extract filename from URL and create descriptive alt text
    const filename = imageSrc.split('/').pop()?.split('.')[0] || '';
    const cleanFilename = filename.replace(/[-_]/g, ' ');
    
    // Common patterns for alt text generation
    if (filename.includes('logo') || filename.includes('brand')) {
      return 'سيدي هشام - شعار الشركة';
    }
    if (filename.includes('product') || filename.includes('item')) {
      return 'منتج سيدي هشام';
    }
    if (filename.includes('news') || filename.includes('article')) {
      return 'صورة إخبارية سيدي هشام';
    }
    if (filename.includes('gallery') || filename.includes('image')) {
      return 'صورة من معرض سيدي هشام';
    }
    if (filename.includes('icon') || filename.includes('button')) {
      return 'أيقونة سيدي هشام';
    }
    
    // Default descriptive alt text
    return cleanFilename ? `صورة ${cleanFilename} - سيدي هشام` : 'صورة سيدي هشام';
  };

  const altText = generateAltText(src);

  return (
    <OptimizedImage src={src}
      alt={altText}
      width={width}
      height={height}
      className={className}
      loader={loader}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      {...props}
    />
  );
}
