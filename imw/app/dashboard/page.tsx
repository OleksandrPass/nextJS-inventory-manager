import Sidebar from "../components/sidebar"
import {prisma} from "../../../lib/prisma";
import {getCurrentUser} from "../../../lib/auth";
import {TrendingUpIcon} from "lucide-react";
import ProductsChart from "@/app/components/products-chart";
import ProductBarChart from "@/app/components/bar-chart";

export default async function DashboardPage() {

    const user = await getCurrentUser();
    const userId = user.id;
    const totalProducts = await prisma.product.count();
    const lowStockProducts = await prisma.product.count(
        {
            where: {
                userId,
                lowStockAt: {not: null},
                quantity: {lte: 5}
            }
        }
    );


    const recent = await prisma.product.findMany({
        where: { userId },
        orderBy: {createdAt:    "desc"},
        take: 5
    });

    const allProducts = await prisma.product.findMany({
         where: {userId: userId},
        select: {price: true, quantity: true, createdAt: true}
    });

    const totalValue = allProducts.reduce(
        (sum, product) => sum + Number(product.price) * Number(product.quantity), 0);

    const now = new Date();
    const weeklyProductsData = [];

    const barData = await prisma.product.findMany({
        where: {userId: userId},
        select: {id: true,
            name: true,
            quantity: true,
            lowStockAt: true,},
    })


    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - i * 7);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);


        const weekStartLabel = `${String(weekStart.getDate()).padStart(
            2,
            "0"
        )}/${String(weekStart.getMonth() + 1).padStart(2, "0")}`; // <-- DD/MM format

        const weekEndLabel = `${String(weekEnd.getDate()).padStart(
            2,
            "0"
        )}/${String(weekEnd.getMonth() + 1).padStart(2, "0")}`; // <-- DD/MM format

        const weekLabel = `${weekStartLabel} - ${weekEndLabel}`;

        const weekProducts = allProducts.filter((product) => {
            const productDate = new Date(product.createdAt);
            return productDate >= weekStart && productDate <= weekEnd;
        });

        weeklyProductsData.push({
            week: weekLabel,
            products: weekProducts.length,
        });
    }

    const inStockCount = allProducts.filter((p) => Number(p.quantity) > 5).length;
    const lowStockCount = allProducts.filter((p) => Number(p.quantity) <= 5 && Number(p.quantity) >= 1).length;
    const outOfStockCount = allProducts.filter((p) => Number(p.quantity) === 0).length;

    const allProductsCount = inStockCount + lowStockCount + outOfStockCount;

    const inStockPercentage = allProductsCount > 0 ? Math.round((inStockCount / allProductsCount) * 100) : 0;
    const lowStockPercentage = allProductsCount > 0 ? Math.round((lowStockCount / allProductsCount) * 100) : 0;
    const outOfStockPercentage = allProductsCount > 0 ? Math.round((outOfStockCount / allProductsCount) * 100) : 0;



    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/dashboard" />
            <main className={`ml-64 p-5`}>

                <div className="mb-8 mt-0">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className={`text-2xl bold text-grey-900`}>Dashboard</h1>
                        </div>
                    </div>
                </div>


                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-3`}>
                    <div className={`bg-white rounded-lg border border-gray-200 p-3 pl-0`}>
                        <h2 className={`font-semibold ml-8`}>Product Stock Comparison</h2>
                        <div className="">
                            <ProductBarChart data={barData} />
                        </div>

                        <div>
                    </div>
                    </div>


                    <div className="bg-white rounded-lg border border-gray-200 p-4 pl-0">
                        <div className="">
                            <h2 className={`font-semibold ml-8`}>New Products Per Week</h2>
                        </div>
                        <div className="">
                            <ProductsChart data={weeklyProductsData} />
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Stock Levels
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {recent.map((product, key) => {
                                const stockLevel =
                                    product.quantity === 0
                                        ? 0
                                        : product.quantity <= (product.lowStockAt || 5)
                                            ? 1
                                            : 2;

                                const bgColors = [
                                    "bg-red-600",
                                    "bg-yellow-600",
                                    "bg-green-600",
                                ];
                                const textColors = [
                                    "text-red-600",
                                    "text-yellow-600",
                                    "text-green-600",
                                ];
                                return (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}
                                            />
                                            <span className="text-sm font-medium text-gray-900">
                                                {product.name}
                                            </span>
                                        </div>
                                        <div
                                            className={`text-sm font-medium ${textColors[stockLevel]}`}>
                                            {product.quantity} units
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-3">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Efficiency
                            </h2>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="relative w-48 h-48">
                                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                                <div
                                    className="absolute inset-0 rounded-full border-8 border-blue-600"
                                    style={{
                                        clipPath:
                                            "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 50% 50%)",
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {inStockPercentage}%
                                        </div>
                                        <div className="text-sm text-gray-600">In Stock</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                                    <span>In Stock ({inStockPercentage}%)</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-200" />
                                    <span>Low Stock ({lowStockPercentage}%)</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                                    <span>Out of Stock ({outOfStockPercentage}%)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </main>
        </div>
    );
}