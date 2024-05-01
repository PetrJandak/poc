const fs = require('fs');
const path = require('path');
const exportedUsers = JSON.parse(fs.readFileSync(path.join(__dirname, '/resources/users.json'), 'utf8'));
describe('Data Validation Tests', () => {
  it('should include user Alice Smith with correct details', () => {
    const alice = exportedUsers.find(user => user.name === 'Alice Smith');
    expect(alice).toEqual({
      _id: "1",
      name: "Alice Smith",
      age: 28,
      email: "alice@example.com"
    });
  });
  it('should check ages are correct for all users', () => {
    const areAgesValid = exportedUsers.every(user => user.age > 18);
    expect(areAgesValid).toBe(true);
  });

  it('should ensure all users have an email', () => {
    const allHaveEmails = exportedUsers.every(user => user.email.includes('@'));
    expect(allHaveEmails).toBe(true);
  });

  it('should contain exactly 3 users', () => {
    expect(exportedUsers.length).toBe(3);
  });
});
