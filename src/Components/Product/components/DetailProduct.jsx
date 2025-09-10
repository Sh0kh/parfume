import { useParams } from "react-router-dom";
import { $api } from "../../../utils";
import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip
} from "@material-tailwind/react";

export default function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const getDetailProduct = async () => {
        try {
            const response = await $api.get(`/api/v1/product/getOne/${id}`);
            setProduct(response.data.object);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDetailProduct();
    }, []);

    if (!product) {
        return (
            <div className="flex justify-center items-center h-64">
                <Typography variant="h6">Yuklanmoqda...</Typography>
            </div>
        );
    }

    // Narx formatlash (masalan: 50000 -> "50 000")
    const formattedPrice = product.price.toLocaleString("uz-UZ");

    return (
        <div className="flex justify-center p-6">
            <Card className="w-full max-w-3xl shadow-lg">
                {/* Mahsulot rasmi */}
                {product.files && product.files.length > 0 && (
                    <CardHeader floated={false} className="h-72">
                        <img
                            src={`http://localhost:8080/images/${product.files[0].fileName}`}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </CardHeader>
                )}

                <CardBody className="space-y-4">
                    <Typography variant="h4" color="blue-gray">
                        {product.name}
                    </Typography>

                    <Typography color="gray">
                        {product.description || "Tavsif mavjud emas"}
                    </Typography>

                    <div className="flex items-center gap-2">
                        <Typography variant="h6" color="green">
                            {formattedPrice} so‘m
                        </Typography>
                        <Chip
                            color={product.active ? "green" : "red"}
                            value={product.active ? "Faol" : "Faol emas"}
                        />
                    </div>

                    <div className="mt-4 border-t pt-4">
                        <Typography variant="small" color="blue-gray">
                            <span className="font-semibold">Kategoriya:</span>{" "}
                            {product.category?.name}
                        </Typography>
                        {product.category?.file && (
                            <img
                                src={`http://localhost:8080/images/${product.category.file.fileName}`}
                                alt={product.category.name}
                                className="mt-2 h-24 rounded-lg object-cover"
                            />
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
