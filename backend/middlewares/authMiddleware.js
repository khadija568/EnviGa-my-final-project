import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Non autorisé, token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // تأكد من أن token يحتوي على id
    if (!decoded.id) {
      return res.status(401).json({ message: "Token invalide: id manquant" });
    }

    req.user = { id: decoded.id };   
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};