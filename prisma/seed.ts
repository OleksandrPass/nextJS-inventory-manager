import { PrismaClient } from "@prisma/client";
import {getCurrentUser} from "../lib/auth";
const prisma = new PrismaClient();

async function main() {
    const user = await getCurrentUser();
    const userId = user.id;

    await prisma.product.createMany({
        data: Array.from({ length: 25 }).map((_, i) => ({
            userId: userId,
            name: `Product ${i + 1}`,
            price: (Math.random() * 90 + 10).toFixed(2),
            quantity: Math.floor(Math.random() * 20),
            lowStockAt: 5,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
        })),
    });

    console.log("Seed data created successfully!");
    console.log(`Created 25 products for user ID: ${userId}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });