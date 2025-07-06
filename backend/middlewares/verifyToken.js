import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // يمكنك استخدام هذا لاحقًا في المسارات المحمية
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
}