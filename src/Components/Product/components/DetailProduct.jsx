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
import CONFIG from "../../../utils/Config";
import Photo from '../../../img/Photo.jpg'
import Loading from "../../UI/Loadings/Loading";

export default function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true)

    const getDetailProduct = async () => {
        setLoading(true)
        try {
            const response = await $api.get(`/api/v1/product/getOne/${id}`);
            setProduct(response.data.object);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getDetailProduct();
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    // Narx formatlash (masalan: 50000 -> "50 000")
    const formattedPrice = product?.price?.toLocaleString("uz-UZ");

    return (
        <div className="flex justify-center p-6">
            <Card className="w-full max-w-3xl shadow-lg">
                {/* Mahsulot rasmi */}
                {product?.files && product?.files.length > 0 && (
                    <CardHeader floated={false} className="h-72">
                        <img
                            src={product?.files[0]?.id ? CONFIG.API_URL + product.files[0].id : Photo}
                            alt={product?.name}
                            className="h-full w-full object-cover"
                        />
                    </CardHeader>
                )}

                <CardBody className="space-y-4">
                    <Typography variant="h4" color="blue-gray">
                        {product?.name}
                    </Typography>

                    <Typography color="gray">
                        {product?.description || "Tavsif mavjud emas"}
                    </Typography>

                    <div className="flex items-center gap-2">
                        <Typography variant="h6" color="green">
                            {formattedPrice} so‘m
                        </Typography>
                        <Chip
                            color={product?.active ? "green" : "red"}
                            value={product?.active ? "Faol" : "Faol emas"}
                        />
                    </div>

                    <div className="mt-4 border-t pt-4">
                        <Typography variant="small" color="blue-gray">
                            <span className="font-semibold">Kategoriya:</span>{" "}
                            {product?.category?.name}
                        </Typography>
                        {product?.category?.file && (
                            <img
                                src={product?.category?.file?.id ? CONFIG.API_URL + product?.category?.file?.id : Photo}
                                alt={product?.name}
                                className="mt-2 h-32 rounded-lg object-cover"
                            />
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
