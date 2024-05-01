const fs = require('fs');
const path = require('path');

// Simulate an API call to a geocoding service
async function validateLocation(location) {
  // Simulating network delay and validation logic
  await new Promise(resolve => setTimeout(resolve, 100));
  return ['New York, NY', 'Los Angeles, CA', 'Chicago, IL'].includes(location);
}

// Read and parse the user data
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '/resources/userLocations.json'), 'utf8'));

test.concurrent.each(users)(
    `validates location for user $name at $location`, 
    async ({ name, location }) => {
      const isValid = await validateLocation(location); // Assuming you define this function elsewhere
      expect(isValid).toBe(true);
    }
  );

// Introducing a simple function with a bug
function buggyAdd(a, b) {
    return a - b;  // Incorrect implementation
  }
  
test.todo('add should be associative');
test.failing('Can fail', () => {
    expect(buggyAdd(1,1)).toBe(1)
})

test.skip('Can skip', () => {
    expect(buggyAdd(1,1)).toBe(20)
})

