import express, { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import { users } from "./index";
import fs from "fs/promises";
const app = express();
dotenv.config();

app.use(express.json());

let refreshTokens: string[] = [];

app.post("/token", (req, res) => {
  const refreshToken: string = req.body.token;
  console.log(refreshToken);
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as jwt.Secret,
    (err, payload) => {
      if (err) return res.sendStatus(403);
      const username =
        typeof payload === "string" ? payload : payload?.username;
      const accessToken = generateAccessToken({ username: username });
      res.json({ accessToken: accessToken });
    }
  );
});

app.delete("/logout", (req, res) => {
  console.log(req.body.token);
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.post("/login", async (req, res) => {
  const user = users.find((user) => user.username === req.body.username);

  if (!user) {
    return res.status(400).send("User not found");
  }

  try {
    if (user && user.password) {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (passwordMatch) {
        const username = req.body.username;
        const payload = { username: username };
        const accessToken = generateAccessToken(payload);
        const refreshToken = jwt.sign(
          payload,
          process.env.REFRESH_TOKEN_SECRET as jwt.Secret
        );
        refreshTokens.push(refreshToken);
        return res.json({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        console.log("Password does not match");
        return res.status(400).send("Not allowed");
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

function generateAccessToken(user: {}) {
  console.log(user);
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as jwt.Secret, {
    expiresIn: "25s",
  });
}

app.listen(7000);
