import express, { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";

const app = express();
dotenv.config();

app.use(express.json());

export const users: { username: string; password: string }[] = [
  {
    username: "sairush",
    password: "$2b$10$zdWNKSFKc1d8C1FZfhOXPeF/ok25rUPvubowX.np94TAsf/vD9o8K",
  },
];

app.get("/users", authenticateToken, (req, res) => {
  res.json(
    users.filter((user) => user.username === (req as any).payload.username)
  );
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.json(user);
    res.status(201).send("user created successfully");
  } catch {
    res.status(400);
  }
});

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  const secret = process.env.ACCESS_TOKEN_SECRET as Secret;
  jwt.verify(token, secret, (err, payload) => {
    console.log(payload);
    if (err) res.sendStatus(403);
    (req as any).payload = payload;
    next();
  });
}

app.listen(8000);
