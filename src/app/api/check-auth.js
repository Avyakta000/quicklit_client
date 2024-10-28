// src/pages/api/check-auth.js
export default function handler(req, res) {
    const refreshToken = req.cookies.refresh;
    
    if (refreshToken) {
      return res.status(200).json({ authenticated: true });
    } else {
      return res.status(401).json({ authenticated: false });
    }
  }
  