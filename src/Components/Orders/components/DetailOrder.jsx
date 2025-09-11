import { useParams } from "react-router-dom";
import { $api } from "../../../utils";
import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import Loading from "../../UI/Loadings/Loading";
import DeleteOrder from "./DeleteOrder";
import CONFIG from "../../../utils/Config";
import Photo from '../../../img/Photo.jpg';

export default function DetailOrder() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const getOrder = async () => {
        try {
            const response = await $api.get(`/api/v1/order/getOne/${id}`);
            setOrder(response.data.object);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrder();
    }, []);

    const formatPrice = (price) =>
        new Intl.NumberFormat("uz-UZ").format(price) + " UZS";

    if (loading) {
        return <Loading />;
    }

    if (!order) {
        return (
            <div className="text-center py-10">
                <Typography variant="h5" color="gray">
                    Buyurtma topilmadi
                </Typography>
            </div>
        );
    }

    return (
        <div className="px-6 py-6 mx-auto">
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-6">
                <Typography variant="h4" className="font-bold">
                    Buyurtma ma’lumotlari
                </Typography>
                <DeleteOrder />
            </div>

            {/* Карточка */}
            <Card className="shadow-md border border-gray-200 rounded-xl">
                <CardBody className="space-y-8">
                    {/* User Info */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <Avatar
                            src="https://www.shutterstock.com/image-vector/people-icon-vector-person-sing-260nw-707883430.jpg"
                            alt={order.fullName}
                            size="lg"
                            variant="rounded"
                        />
                        <div>
                            <Typography variant="h6" className="font-semibold">
                                {order.fullName}
                            </Typography>
                            <Typography variant="small" color="gray">
                                {order.phoneNumber}
                            </Typography>
                            <Typography variant="small" color="gray">
                                {order.orderDate}
                            </Typography>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <img
                            src={order?.product?.files?.[0]?.id ? CONFIG.API_URL + order?.product?.files?.[0]?.id : Photo}
                            alt={order?.product?.name}
                            onError={(e) => (e.currentTarget.src = Photo)}
                            className="w-32 h-32 object-cover rounded-lg border"
                        />
                        <div className="space-y-2">
                            <Typography variant="h6" className="font-bold">
                                {order.product.name}
                            </Typography>
                            <Typography variant="small" color="gray">
                                {order.product.description}
                            </Typography>
                            <Typography variant="small" color="gray">
                                Kategoriya:{" "}
                                <span className="font-semibold">
                                    {order.product.category?.name}
                                </span>
                            </Typography>
                            <Typography
                                variant="small"
                                className="font-semibold text-blue-600"
                            >
                                Narx: {formatPrice(order.product.price)}
                            </Typography>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t pt-4 space-y-2">
                        <Typography variant="small" className="font-medium">
                            Miqdor:{" "}
                            <span className="font-bold">{order.count} dona</span>
                        </Typography>
                        <Typography
                            variant="h6"
                            className="font-bold text-blue-700"
                        >
                            Jami: {formatPrice(order.product.price * order.count)}
                        </Typography>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
