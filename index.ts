import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log(`Server is running on port 300`);
});

app.post("/products", async (req, res) => {
  try {
    const newProduct = await prisma.product.create({ data: req.body });
    res.json(newProduct);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Unknown error");
    }
  }
});

app.get("/products", async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    const filteredProducts = await prisma.product.findMany({
      where: {
        price: {
          gte: minPrice ? Number(minPrice) : undefined,
          lte: maxPrice ? Number(maxPrice) : undefined,
        },
        category: category ? { name: { equals: String(category) } } : undefined,
      },
      include: { category: true },
    });
    res.json(filteredProducts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Unknown error");
    }
  }
});
