const axios = require('axios');

const API_URL = 'http://localhost:8000/api/v1';

async function testAPI() {
  console.log('🧪 Testing API Connection...\n');

  try {
    // Test 1: Fetch articles
    console.log('1️⃣ Testing /articles endpoint...');
    const articlesResponse = await axios.get(`${API_URL}/articles?limit=3`);
    console.log(`✅ Success! Found ${articlesResponse.data.data.length} articles`);
    console.log(`   First article: "${articlesResponse.data.data[0].title}"`);
    console.log(`   Image: ${articlesResponse.data.data[0].thumbnail_url}\n`);

    // Test 2: Fetch categories
    console.log('2️⃣ Testing /categories endpoint...');
    const categoriesResponse = await axios.get(`${API_URL}/categories`);
    console.log(`✅ Success! Found ${categoriesResponse.data.data.length} categories`);
    console.log(`   Categories: ${categoriesResponse.data.data.map(c => c.name).join(', ')}\n`);

    // Test 3: Fetch single article
    console.log('3️⃣ Testing /articles/{slug} endpoint...');
    const slug = articlesResponse.data.data[0].slug;
    const articleResponse = await axios.get(`${API_URL}/articles/${slug}`);
    console.log(`✅ Success! Fetched article: "${articleResponse.data.data.title}"`);
    console.log(`   Content length: ${articleResponse.data.data.content.length} characters\n`);

    console.log('🎉 All API tests passed! Frontend can connect to backend.\n');
    console.log('📝 Summary:');
    console.log(`   - Total Articles: ${articlesResponse.data.meta.total}`);
    console.log(`   - Total Categories: ${categoriesResponse.data.data.length}`);
    console.log(`   - API URL: ${API_URL}`);
    console.log(`   - All images have URLs: ${articlesResponse.data.data.every(a => a.thumbnail_url) ? '✅ Yes' : '❌ No'}`);

  } catch (error) {
    console.error('❌ API Test Failed!');
    if (error.code === 'ECONNREFUSED') {
      console.error('   Backend server is not running!');
      console.error('   Run: cd d:\\indiabriefed\\backend && php artisan serve');
    } else {
      console.error('   Error:', error.message);
    }
  }
}

testAPI();
