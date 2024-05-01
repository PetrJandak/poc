const fs = require('fs');
const path = require('path');
async function validateLocation(location) {
   await new Promise(resolve => setTimeout(resolve, 100));
  return ['New York, NY', 'Los Angeles, CA', 'Chicago, IL'].includes(location);
}
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '/resources/userLocations.json'), 'utf8'));

test.concurrent.each(users)(
    `validates location for user $name at $location`, 
    async ({ name, location }) => {
      const isValid = await validateLocation(location);      expect(isValid).toBe(true);
    }
  );
function buggyAdd(a, b) {
    return a - b;   }
  
test.todo('add should be associative');
test.failing('Can fail', () => {
    expect(buggyAdd(1,1)).toBe(1)
})

test.skip('Can skip', () => {
    expect(buggyAdd(1,1)).toBe(20)
})

