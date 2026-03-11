const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // optional but helpful for debugging
});

module.exports = prisma;
