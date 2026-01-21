// api/todos.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    const { title } = req.body;
    try {
      const todo = await prisma.todo.create({ data: { title } });
      res.status(200).json(todo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
