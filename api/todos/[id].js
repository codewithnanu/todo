import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query; // ID from URL e.g., /api/todos/123

  if (req.method === "PATCH") {
    const { title, is_completed } = req.body; // data sent from frontend

    try {
      // Prisma update query
      const updatedTodo = await prisma.todo.update({
        where: { id },        // find the todo by ID
        data: {
          title,              // update title if provided
          is_completed,       // update completion status if provided
        },
      });

      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === "DELETE") {
    // handle deletion
    try {
      await prisma.todo.delete({ where: { id } });
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
