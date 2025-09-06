import React from "react";
import {
    Card, CardBody, CardHeader, Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { FolderIcon, CubeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
    const categories = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
    const data = categories.map(() => Math.floor(Math.random() * 50) + 5);

    const series = [{ name: "Zakazlar", data }];

    const options = {
        chart: { type: "line", toolbar: { show: false }, zoom: { enabled: false } },
        stroke: { curve: "smooth", width: 3 },
        markers: { size: 0 },
        xaxis: { categories, labels: { style: { colors: "#616161", fontSize: "11px" } } },
        yaxis: { labels: { style: { colors: "#616161", fontSize: "11px" } } },
        grid: {
            show: true, borderColor: "#dddddd", strokeDashArray: 5,
            xaxis: { lines: { show: true } }, padding: { top: 0, right: 12 },
        },
        fill: { opacity: 0.8 },
        tooltip: { theme: "dark" },
        colors: ["#3b82f6"],
    };

    const CHART_HEIGHT = 360; // 🔽 shu yerda boshqaramiz

    return (
        <div className="px-6 space-y-6">
            {/* Yuqoridagi cardlar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardBody className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                            <FolderIcon className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">Kategoriyalar</Typography>
                            <Typography variant="h4" color="blue" className="mt-1">12</Typography>
                        </div>
                    </CardBody>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardBody className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <CubeIcon className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">Tovarlar</Typography>
                            <Typography variant="h4" color="green" className="mt-1">256</Typography>
                        </div>
                    </CardBody>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardBody className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-xl">
                            <ShoppingCartIcon className="h-8 w-8 text-red-600" />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">Zakazlar</Typography>
                            <Typography variant="h4" color="red" className="mt-1">87</Typography>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* 30 kunlik zakazlar grafikasi */}
            <Card>
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                >
                    <div className="p-3 bg-red-100 rounded-xl">
                        <ShoppingCartIcon className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray">Shu oydagi zakazlar</Typography>
                    </div>
                </CardHeader>

                <CardBody className="px-2 pb-2">
                    {/* MUHIM: balandlikni shu yerda props orqali beramiz */}
                    <Chart options={options} series={series} type="line" height={CHART_HEIGHT} width="100%" />
                </CardBody>
            </Card>
        </div>
    );
}
