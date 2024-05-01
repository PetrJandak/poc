const { fetchUserData } = require('../src/service');
global.fetch = jest.fn(); // Mocking the global fetch function

describe('fetchUserData', () => {
  beforeEach(() => {
    fetch.mockClear(); // Clear mock before each test
  });

  it('calls fetch with the correct URL', async () => {
    fetch.mockResolvedValueOnce({ // Mock the fetch response to resolve
      json: () => Promise.resolve({ name: "John Doe" }) // Mock the json method of the response
    });

    const userId = '123';
    await fetchUserData(userId);

    // Check if fetch was called correctly
    expect(fetch).toHaveBeenCalledWith(`https://api.example.com/users/${userId}`);
  });

  it('returns user data correctly', async () => {
    const mockUser = { name: "John Doe" };
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockUser)
    });

    const userId = '123';
    const userData = await fetchUserData(userId);

    // Check that the returned data is the expected user data
    expect(userData).toEqual(mockUser);
  });

  it('handles exceptions from fetch', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(); // Mock console.error to prevent actual logging
    const userId = 'error-user';
    const result = await fetchUserData(userId);

    // Verify that console.error was called
    expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch user data:", expect.any(Error));

    // Optional: Check that function returns undefined or handles errors as expected
    expect(result).toBeUndefined();

    consoleSpy.mockRestore(); // Restore console.error to its original state
  });
});
