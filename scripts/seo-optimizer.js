#!/usr/bin/env node

/**
 * SEO Optimizer Script for سيدي هشام Website
 * This script helps identify and fix common SEO issues
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  websiteUrl: 'https://www.sedihisham.com',
  companyName: 'سيدي هشام',
  companyNameEn: 'Sedi Hisham',
  description: 'شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة',
  keywords: 'سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة, مطابخ, غرف معيشة',
  image: 'https://www.sedihisham.com/images/logo.png'
};

// SEO Issues to check
const seoIssues = {
  missingAltAttributes: [],
  multipleH1Tags: [],
  longMetaDescriptions: [],
  missingCanonical: [],
  missingOpenGraph: [],
  missingSchema: []
};

// Helper functions
function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m', // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m', // Red
    reset: '\x1b[0m'
  };
  
  console.log(`${colors[type]}${message}${colors.reset}`);
}

function checkFile(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

function createDirectoryIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`Created directory: ${dirPath}`, 'success');
  }
}

// SEO Checks
function checkAltAttributes(content, filePath) {
  const imgRegex = /<img[^>]*>/gi;
  const altRegex = /alt\s*=\s*["']([^"']*)["']/i;
  
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const imgTag = match[0];
    const altMatch = imgTag.match(altRegex);
    
    if (!altMatch || !altMatch[1] || altMatch[1].trim() === '') {
      seoIssues.missingAltAttributes.push({
        file: filePath,
        line: content.substring(0, match.index).split('\n').length,
        tag: imgTag
      });
    }
  }
}

function checkH1Tags(content, filePath) {
  const h1Regex = /<h1[^>]*>.*?<\/h1>/gi;
  const matches = content.match(h1Regex);
  
  if (matches && matches.length > 1) {
    seoIssues.multipleH1Tags.push({
      file: filePath,
      count: matches.length,
      tags: matches
    });
  }
}

function checkMetaDescription(content, filePath) {
  const metaDescRegex = /<meta[^>]*name\s*=\s*["']description["'][^>]*content\s*=\s*["']([^"']*)["'][^>]*>/i;
  const match = content.match(metaDescRegex);
  
  if (match && match[1].length > 160) {
    seoIssues.longMetaDescriptions.push({
      file: filePath,
      length: match[1].length,
      description: match[1]
    });
  }
}

function checkCanonical(content, filePath) {
  const canonicalRegex = /<link[^>]*rel\s*=\s*["']canonical["'][^>]*>/i;
  
  if (!canonicalRegex.test(content)) {
    seoIssues.missingCanonical.push({
      file: filePath
    });
  }
}

function checkOpenGraph(content, filePath) {
  const ogRegex = /<meta[^>]*property\s*=\s*["']og:/i;
  
  if (!ogRegex.test(content)) {
    seoIssues.missingOpenGraph.push({
      file: filePath
    });
  }
}

function checkSchema(content, filePath) {
  const schemaRegex = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>/i;
  
  if (!schemaRegex.test(content)) {
    seoIssues.missingSchema.push({
      file: filePath
    });
  }
}

// Main scanning function
function scanForSEOIssues(directory = '.') {
  log('🔍 Scanning for SEO issues...', 'info');
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scanDirectory(filePath);
      } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Run all checks
          checkAltAttributes(content, filePath);
          checkH1Tags(content, filePath);
          checkMetaDescription(content, filePath);
          checkCanonical(content, filePath);
          checkOpenGraph(content, filePath);
          checkSchema(content, filePath);
        } catch (error) {
          log(`Error reading file ${filePath}: ${error.message}`, 'error');
        }
      }
    });
  }
  
  scanDirectory(directory);
}

// Generate report
function generateReport() {
  log('\n📊 SEO Analysis Report', 'info');
  log('='.repeat(50), 'info');
  
  // Missing Alt Attributes
  if (seoIssues.missingAltAttributes.length > 0) {
    log(`\n❌ Missing Alt Attributes: ${seoIssues.missingAltAttributes.length}`, 'error');
    seoIssues.missingAltAttributes.forEach(issue => {
      log(`   File: ${issue.file} (Line: ${issue.line})`, 'warning');
    });
  } else {
    log('\n✅ All images have alt attributes', 'success');
  }
  
  // Multiple H1 Tags
  if (seoIssues.multipleH1Tags.length > 0) {
    log(`\n❌ Multiple H1 Tags: ${seoIssues.multipleH1Tags.length} files`, 'error');
    seoIssues.multipleH1Tags.forEach(issue => {
      log(`   File: ${issue.file} (${issue.count} H1 tags)`, 'warning');
    });
  } else {
    log('\n✅ Proper H1 tag usage', 'success');
  }
  
  // Long Meta Descriptions
  if (seoIssues.longMetaDescriptions.length > 0) {
    log(`\n❌ Long Meta Descriptions: ${seoIssues.longMetaDescriptions.length}`, 'error');
    seoIssues.longMetaDescriptions.forEach(issue => {
      log(`   File: ${issue.file} (${issue.length} characters)`, 'warning');
    });
  } else {
    log('\n✅ Meta descriptions are appropriate length', 'success');
  }
  
  // Missing Canonical
  if (seoIssues.missingCanonical.length > 0) {
    log(`\n❌ Missing Canonical Tags: ${seoIssues.missingCanonical.length}`, 'error');
    seoIssues.missingCanonical.forEach(issue => {
      log(`   File: ${issue.file}`, 'warning');
    });
  } else {
    log('\n✅ Canonical tags present', 'success');
  }
  
  // Missing Open Graph
  if (seoIssues.missingOpenGraph.length > 0) {
    log(`\n❌ Missing Open Graph Tags: ${seoIssues.missingOpenGraph.length}`, 'error');
    seoIssues.missingOpenGraph.forEach(issue => {
      log(`   File: ${issue.file}`, 'warning');
    });
  } else {
    log('\n✅ Open Graph tags present', 'success');
  }
  
  // Missing Schema
  if (seoIssues.missingSchema.length > 0) {
    log(`\n❌ Missing Schema.org Data: ${seoIssues.missingSchema.length}`, 'error');
    seoIssues.missingSchema.forEach(issue => {
      log(`   File: ${issue.file}`, 'warning');
    });
  } else {
    log('\n✅ Schema.org data present', 'success');
  }
  
  // Summary
  const totalIssues = Object.values(seoIssues).reduce((sum, issues) => sum + issues.length, 0);
  
  log('\n' + '='.repeat(50), 'info');
  log(`📈 Total Issues Found: ${totalIssues}`, totalIssues > 0 ? 'error' : 'success');
  
  if (totalIssues === 0) {
    log('🎉 Excellent! No SEO issues found.', 'success');
  } else {
    log('\n💡 Recommendations:', 'info');
    log('1. Use the SEO component for all pages', 'info');
    log('2. Replace Image components with SEOImage', 'info');
    log('3. Ensure only one H1 tag per page', 'info');
    log('4. Keep meta descriptions under 160 characters', 'info');
    log('5. Add canonical URLs to all pages', 'info');
  }
}

// Main execution
function main() {
  log('🚀 Starting SEO Optimization Scan', 'info');
  log(`Website: ${config.websiteUrl}`, 'info');
  log(`Company: ${config.companyName}`, 'info');
  
  scanForSEOIssues();
  generateReport();
  
  log('\n✨ Scan completed!', 'success');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  scanForSEOIssues,
  generateReport,
  config
};
