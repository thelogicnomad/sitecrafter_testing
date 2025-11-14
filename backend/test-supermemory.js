const axios = require('axios');

console.log('🧪 Testing Supermemory Integration...\n');

async function testSupermemory() {
  try {
    console.log('📡 Calling POST http://localhost:3000/test/supermemory\n');
    
    const response = await axios.post('http://localhost:3000/test/supermemory');
    
    console.log('📊 RESULTS:\n');
    console.log('Success:', response.data.success);
    console.log('Message:', response.data.message);
    console.log('\n📋 Tests:');
    console.log('  ✓ Add Document:', response.data.tests.addDocument ? '✅ PASSED' : '❌ FAILED');
    console.log('  ✓ Search:', response.data.tests.search ? '✅ PASSED' : '❌ FAILED');
    console.log('  ✓ Get Backend Context:', response.data.tests.getBackendContext ? '✅ PASSED' : '❌ FAILED');
    
    if (response.data.results) {
      console.log('\n📈 Details:');
      console.log('  Document ID:', response.data.results.documentId);
      console.log('  Search Result Length:', response.data.results.searchResultLength, 'chars');
      console.log('  Backend Context Length:', response.data.results.backendContextLength, 'chars');
      console.log('  Project ID:', response.data.projectId);
      
      if (response.data.results.searchPreview) {
        console.log('\n🔍 Search Preview:');
        console.log(response.data.results.searchPreview);
      }
    }
    
    console.log('\n✅ All tests completed!\n');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure backend is running: npm run dev');
    console.log('2. Check SUPERMEMORY_API_KEY in .env file');
    console.log('3. Verify your Supermemory API key is valid');
    console.log('4. Check backend console for detailed logs\n');
  }
}

testSupermemory();
