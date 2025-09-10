import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, CubeIcon } from "@heroicons/react/24/solid";
import { NavLink, useParams } from "react-router-dom";
import CreateProduct from "./components/CreateProduct";
import { $api } from "../../utils";
import { useEffect, useState } from "react";
import Loading from "../UI/Loadings/Loading";
import DeleteProduct from "./components/DeleteProduct";
import EditProduct from "./components/EditProduct";

export default function Product() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProduct = async () => {
        setLoading(true);
        try {
            const response = await $api.get(
                `/api/v1/product/getAll?size=10&page=0&categoryId=${id}`
            );
            setData(response?.data?.object?.content || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat("uz-UZ").format(price) + " UZS";
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="px-6">
            {/* Title + button */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold mr-auto">
                    {data[0]?.categoryName || "Tovarlar"}
                </h1>
                <CreateProduct refresh={getProduct} categoryId={id} />
            </div>

            {/* Empty state */}
            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-center">
                    <CubeIcon className="h-16 w-16 text-gray-400 mb-4" />
                    <Typography variant="h6" className="mb-2 text-gray-600">
                        Hozircha tovarlar yo‘q
                    </Typography>
                    <Typography color="gray" className="mb-4 max-w-sm">
                        Bu kategoriya uchun hali hech qanday tovar qo‘shilmagan.
                        Yangi tovar qo‘shishni boshlang.
                    </Typography>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.map((product) => (
                        <Card
                            key={product.id}
                            className="shadow-lg hover:shadow-2xl transition-shadow"
                        >
                            <CardHeader floated={false} className="h-56">
                                <img
                                    src={product.fileList[0]?.filePath}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            </CardHeader>
                            <CardBody className="text-center">
                                <Typography variant="h6" className="font-semibold">
                                    {product.name}
                                </Typography>
                                <Typography color="gray" className="mt-2 text-lg font-medium">
                                    {formatPrice(product.price)}
                                </Typography>
                                <div className="flex justify-center gap-2 mt-2">
                                    <EditProduct data={product} refresh={getProduct} />
                                    <DeleteProduct productId={product?.id} refresh={getProduct} />
                                    <NavLink to={`/product/${product.id}`}>
                                        <Button
                                            color="green"
                                            size="sm"
                                            className="flex items-center gap-1"
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                        </Button>
                                    </NavLink>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
