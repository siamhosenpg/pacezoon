import jwt from "jsonwebtoken";

export function protect(req, res, next) {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// ➤ OPTIONAL AUTH
export function optionalAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    req.user = null; // টোকেন ভাঙা হলে guest হিসেবে চলবে
  }

  next();
}
