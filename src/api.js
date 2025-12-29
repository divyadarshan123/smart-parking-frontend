const BASE_URL = "https://smart-parking-backend-igun.onrender.com/";

export const api = async (path, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "smart-parking-secret", 
      },
      body: options.body,
    });

    return await res.json();
  } catch (err) {
    console.error("API ERROR:", err);
    throw err;
  }
};

