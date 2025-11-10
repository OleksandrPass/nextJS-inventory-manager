"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Legend
} from "recharts";
import React from "react";

interface BarChartData {
    name: string;
    quantity: number;
    lowStockAt: number | null;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const dataEntry = payload[0].payload;

        return (
            <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '10px', borderRadius: '4px' }}>
                <p className="label" style={{ fontWeight: 'bold' }}>{label}</p>
                <p style={{ color: '#10b981' }}>{`Current Stock: ${dataEntry.quantity}`}</p>
                <p style={{ color: '#f59e0b' }}>{`Low Stock Threshold: ${dataEntry.lowStockAt}`}</p>
            </div>
        );
    }
    return null;
};



export default function ProductBarChart({ data }: { data: BarChartData[] }) {


    const maxYValue = Math.max(...data.map(d => Math.max(d.quantity, d.lowStockAt))) * 1.1;

    return (
        <div className="h-94 w-full">

            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 25, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 10" stroke="#f0f0f0" />


                    <XAxis
                        dataKey="name"
                        stroke="#555"
                        fontSize={12}
                        tickLine={false}
                        axisLine={true}
                    />


                    <YAxis
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                        domain={[0, maxYValue]}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Bar
                        dataKey="quantity"
                        name="Current Stock"
                        fill="#21b026"
                    />


                    <Bar
                        dataKey="lowStockAt"
                        name="Low Stock Threshold"
                        fill="#d61818"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}