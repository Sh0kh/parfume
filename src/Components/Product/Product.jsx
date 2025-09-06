import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import CreateProduct from "./components/CreateProduct";

export default function Product() {
    // Пример товаров
    const products = [
        {
            id: 1,
            title: "MAC Matte Lipstick Red Rock 0.1",
            price: 25000,
            image: "https://m.media-amazon.com/images/I/516A-vyh2lL._UF1000,1000_QL80_.jpg",
        },
        {
            id: 2,
            title: "RENEE Stunner Matte Lipstick, 4Gm",
            price: 10000,
            image: "https://www.reneecosmetics.in/cdn/shop/files/8906121645491_1_c8d144f0-e818-4c32-80bf-75f13f1ba956.jpg?v=1742483477&width=1946",
        },
    ];

    // Функция форматирования цены
    const formatPrice = (price) => {
        return new Intl.NumberFormat("uz-UZ").format(price) + " UZS";
    };

    return (
        <div className="px-6">
            {/* Заголовок и кнопка */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold mr-auto">Lab bo'yog'i</h1>
                <CreateProduct />
            </div>
            {/* Список товаров */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="shadow-lg hover:shadow-2xl transition-shadow">
                        <CardHeader floated={false} className="h-56">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain"
                            />
                        </CardHeader>
                        <CardBody className="text-center">
                            <Typography variant="h6" className="font-semibold">
                                {product.title}
                            </Typography>
                            <Typography color="gray" className="mt-2 text-lg font-medium">
                                {formatPrice(product.price)}
                            </Typography>
                            <div className="flex justify-center gap-2 mt-2">
                                <Button color="blue" size="sm" className="flex items-center gap-1">
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                                <Button color="red" size="sm" className="flex items-center gap-1">
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                                {/* <NavLink to={`/products/${product.id}`}>
                                    <Button color="green" size="sm" className="flex items-center gap-1">
                                        <EyeIcon className="h-4 w-4" />
                                    </Button>
                                </NavLink> */}
                            </div>
                        </CardBody>
                        {/* Кнопки */}
                    </Card>
                ))}
            </div>
        </div>
    );
}
