const BASE_URL = "https://smart-parking-backend-igun.onrender.com";

export const api = async (path, options = {}) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${path}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",

        // 🔐 API KEY (backend check ke liye)
        "x-api-key": "smart-parking-secret",

        // 🔐 JWT TOKEN (login ke baad)
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    return await res.json();
  } catch (err) {
    console.error("❌ API ERROR:", err);
    throw err;
  }
};

