import Sidebar from "../components/sidebar"
import {prisma} from "../../../lib/prisma";
import {getCurrentUser} from "../../../lib/auth";
import {TrendingUpIcon} from "lucide-react";
import ProductsChart from "@/app/components/products-chart";

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

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/dashboard" />
            <main className={`ml-64 p-8`}>

                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className={`text-2xl bold text-grey-900`}>Dashboard</h1>
                            <p className={`text-small text-grey-500`}>Welcome Back Here is overview of your inventory</p>
                        </div>
                    </div>
                </div>


                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-3`}>
                    <div className={`bg-white rounded-lg border border-gray-200 p-6 `}>
                        <h2 className={`text-lg font-semibold text-gray-900 mb-6`}>Key Metrics</h2>
                        <div className={`grid grid-cols-3 gap-6 mt-20`}>
                            <div className={`text-center`}>
                                <div className={`text-3xl bold text-gray-900`}>{totalProducts}</div>
                                <div className={`text-sm text-grey-600`}>Total Products</div>
                                <div className={` justify-center flex items-center mt-1`}>
                                    <span className={`text-xs text-green-600 `}>+{totalProducts}</span>
                                    <TrendingUpIcon className={`h-3 w-3 text-green-600 ml-1`} />
                                </div>
                            </div>

                            <div className={`text-center`}>
                                <div className={`text-3xl bold text-gray-900`}>${Number(totalValue).toFixed(0)}</div>
                                <div className={`text-sm text-grey-600`}>Total Value</div>
                                <div className={` justify-center flex items-center mt-1`}>
                                    <span className={`text-xs text-green-600 `}>+${Number(totalValue).toFixed(0)}</span>
                                    <TrendingUpIcon className={`h-3 w-3 text-green-600 ml-1`} />
                                </div>

                            </div>

                            <div className={`text-center`}>
                                <div className={`text-3xl bold text-gray-900`}>{lowStockProducts}</div>
                                <div className={`text-sm text-grey-600`}>Low Stock Products</div>
                                <div className={` justify-center flex items-center mt-1`}>
                                    <span className={`text-xs text-green-600 `}>+{lowStockProducts}</span>
                                    <TrendingUpIcon className={`h-3 w-3 text-green-600 ml-1`} />
                                </div>
                            </div>
                    </div>
                    </div>


                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2>New products per week</h2>
                        </div>
                        <div className="h-48">
                            <ProductsChart data={weeklyProductsData} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    </div>
                </div>


                <div className="bg-white rounded-lg border border-gray-200 p-6">
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
                                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}/>
                                        <span className="text-sm font-medium text-gray-900">
                                            {product.name}</span>
                                    </div>
                                    <div className={`text-sm font-medium ${textColors[stockLevel]}`}>
                                        {product.quantity} units
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}