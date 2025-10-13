import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    // --- Create Categories ---
    const electronics = await prisma.category.create({
      data: { name: "Electronics" },
    });

    const books = await prisma.category.create({
      data: { name: "Books" },
    });

    const clothing = await prisma.category.create({
      data: { name: "Clothing" },
    });

    // --- Create Products ---
    const headphones = await prisma.product.create({
      data: {
        name: "Headphones",
        price: 599,
        stock: 25,
        categoryId: electronics.id,
      },
    });

    const laptop = await prisma.product.create({
      data: {
        name: "Laptop",
        price: 2599,
        stock: 10,
        categoryId: electronics.id,
      },
    });

    const novel = await prisma.product.create({
      data: {
        name: "Novel",
        price: 149,
        stock: 100,
        categoryId: books.id,
      },
    });

    const tshirt = await prisma.product.create({
      data: {
        name: "T-Shirt",
        price: 299,
        stock: 50,
        categoryId: clothing.id,
      },
    });

    // --- Create Customers ---
    const alice = await prisma.customer.create({
      data: { name: "Alice", email: "alice@example.com" },
    });

    const bob = await prisma.customer.create({
      data: { name: "Bob", email: "bob@example.com" },
    });

    const charlie = await prisma.customer.create({
      data: { name: "Charlie", email: "charlie@example.com" },
    });

    // --- Create Orders and OrderItems ---
    const order1 = await prisma.order.create({
      data: { customerId: alice.id },
    });

    await prisma.orderItem.createMany({
      data: [
        { orderId: order1.id, productId: headphones.id, quantity: 1 },
        { orderId: order1.id, productId: novel.id, quantity: 2 },
      ],
    });

    const order2 = await prisma.order.create({
      data: { customerId: bob.id },
    });

    await prisma.orderItem.create({
      data: { orderId: order2.id, productId: tshirt.id, quantity: 3 },
    });

    const order3 = await prisma.order.create({
      data: { customerId: charlie.id },
    });

    await prisma.orderItem.create({
      data: { orderId: order3.id, productId: laptop.id, quantity: 1 },
    });

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
