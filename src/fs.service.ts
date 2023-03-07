import fs from "node:fs/promises";
import path from "node:path";

const dbPath = path.join(process.cwd(), "dataBase", "users.json");

const reader = async () => {
  const buffer = await fs.readFile(dbPath);
  const data = buffer.toString();
  return data ? JSON.parse(data) : [];
};

// const writer = async (users) => {
//     await fs.writeFile(dbPath, JSON.stringify(users));
// };

export { reader };
