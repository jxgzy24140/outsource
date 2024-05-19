const jwt = require("jsonwebtoken");

export function identityMiddleware(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || authHeader == null)
    return res
      .status(401)
      .json({ success: false, message: "Invalid authorization" });
  const token = authHeader && authHeader?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Token is not valid!" });
  else {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err: any, user: any) => {
      if (err)
        return res.status(403).json({ success: false, message: "Forbidden!" });
      req.user = user;
      next();
    });
  }
}
