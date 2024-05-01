const { fetchUserData } = require('../src/service');
global.fetch = jest.fn();
describe('fetchUserData', () => {
  beforeEach(() => {
    fetch.mockClear();  });

  it('calls fetch with the correct URL', async () => {
    fetch.mockResolvedValueOnce({      json: () => Promise.resolve({ name: "John Doe" })    });

    const userId = '123';
    await fetchUserData(userId);

       expect(fetch).toHaveBeenCalledWith(`https://api.example.com/users/${userId}`);
  });

  it('returns user data correctly', async () => {
    const mockUser = { name: "John Doe" };
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockUser)
    });

    const userId = '123';
    const userData = await fetchUserData(userId);

       expect(userData).toEqual(mockUser);
  });

  it('handles exceptions from fetch', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();    const userId = 'error-user';
    const result = await fetchUserData(userId);

       expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch user data:", expect.any(Error));

       expect(result).toBeUndefined();

    consoleSpy.mockRestore();  });
});
