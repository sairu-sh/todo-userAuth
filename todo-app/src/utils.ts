import { alphabetPool, numberPool, idLength } from "./constants";

export function getRandomId() {
  const charSet = alphabetPool + numberPool;
  let id = "";
  for (let i = 0; i < idLength; i++) {
    id += charSet[Math.floor(Math.random() * charSet.length)];
  }
  return id;
}
