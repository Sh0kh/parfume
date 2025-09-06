import React from "react";
import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/solid";
import CreateCategory from "./components/CreateCategory";
import { NavLink } from "react-router-dom";

const categories = [
    { id: 1, name: "Lab bo'yog'i", image: "https://ir.ozone.ru/s3/multimedia-q/c1000/6838195886.jpg" },
    { id: 3, name: "Atirlar", image: "https://100k.website.yandexcloud.net/resized/1000x1000/products/images/X3JcYoRoJmfybSQ1LSoaPTz5KU5xXEvAXnvyYXwi.jpg.webp" },
    { id: 6, name: "Qosh va Kiprik", image: "https://pimg.eur.marykaycdn.com/HeroZoom/10005/10222586-MaryKay-Ultimate-Mascara.jpg" },
];

export default function Category() {
    return (
        <div className="p-6 space-y-6">
            {/* Yuqorida "Yangi kategoriya" tugmasi */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold mr-auto">
                    Kategoriyalar
                </h1>
                <CreateCategory />
            </div>

            {/* Grid kategoriyalar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <Card
                        key={cat.id}
                        shadow={true}
                        className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col"
                    >
                        {/* Rasm */}
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="h-52 w-full object-contain rounded-t-xl"
                        />

                        {/* Body */}
                        <CardBody className="flex flex-col flex-1 justify-between text-center">
                            {/* Title */}
                            <Typography variant="h6" color="blue-gray" className="mb-4">
                                {cat.name}
                            </Typography>

                            {/* Tugmalar */}
                            <div className="flex justify-center gap-2 mt-auto">
                                <Button color="blue" size="sm" className="flex items-center gap-1">
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                                <Button color="red" size="sm" className="flex items-center gap-1">
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                                <NavLink to={`/products/1`}>
                                    <Button color="green" size="sm" className="flex items-center gap-1">
                                        <EyeIcon className="h-4 w-4" />
                                    </Button>
                                </NavLink>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
