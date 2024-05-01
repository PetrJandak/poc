 const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  module.exports = { fetchUserData };

  