"use server"

import z from "zod";
import {prisma} from "./prisma";
import {getCurrentUser} from "./auth";
import { redirect } from "next/navigation";

const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().min(0),
    quantity: z.coerce.number().min(0),
    lowStockAt: z.coerce.number().int().min(0).optional(),
});

export async function addProduct(formData: FormData) {
    const user = await getCurrentUser();

    const parsed = ProductSchema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        quantity: formData.get("quantity"),
        sku: formData.get("sku") || undefined,
        lowStockAt: formData.get("lowStockAt") || undefined,
    });

    if (!parsed.success) {
        throw new Error("Validation failed");
    }

    try {
        await prisma.product.create({
            data: { ...parsed.data, userId: user.id },
        });

    } catch (error) {
        throw new Error("Failed to create product.");
    }
    redirect("/inventory");
}