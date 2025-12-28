const BASE_URL = "http://localhost:5000";

export const api = async (path, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "smart-parking-secret", // SAME as backend .env
        ...(options.headers || {})
      },
      ...options,
    });

    return await res.json();
  } catch (err) {
    console.error("API FETCH ERROR 👉", err);
    throw err;
  }
};
