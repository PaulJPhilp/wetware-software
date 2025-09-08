const fs = require('fs');

console.log('Checking environment variables...');
console.log('NOTION_API_KEY:', process.env.NOTION_API_KEY ? 'SET' : 'NOT SET');
console.log('NOTION_DATABASE_ID_BLOG_POSTS:', process.env.NOTION_DATABASE_ID_BLOG_POSTS ? 'SET' : 'NOT SET');
console.log('NOTION_DATABASE_ID_SERIES:', process.env.NOTION_DATABASE_ID_SERIES ? 'SET' : 'NOT SET');

// Write to a file that we can check during build
globalThis.envCheckResult = {
  NOTION_API_KEY: process.env.NOTION_API_KEY ? 'SET' : 'NOT SET',
  NOTION_DATABASE_ID_BLOG_POSTS: process.env.NOTION_DATABASE_ID_BLOG_POSTS ? 'SET' : 'NOT SET',
  NOTION_DATABASE_ID_SERIES: process.env.NOTION_DATABASE_ID_SERIES ? 'SET' : 'NOT SET'
};

console.log('Environment check complete');
