import { useParams } from "react-router-dom";
import { $api } from "../../../utils";
import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Avatar,
    Spinner,
} from "@material-tailwind/react";
import Loading from "../../UI/Loadings/Loading";
import DeleteOrder from "./DeleteOrder";

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
        return (
            <Loading />
        );
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
            <div className="flex items-center justify-between mb-6">
                <Typography variant="h4" className="font-bold ">
                    Buyurtma ma’lumotlari
                </Typography>

                <DeleteOrder />
            </div>

            <Card className="shadow-lg">
                <CardBody className="space-y-6">
                    {/* User Info */}
                    <div className="flex items-center gap-4">
                        <Avatar
                            src="https://www.shutterstock.com/image-vector/people-icon-vector-person-sing-260nw-707883430.jpg"
                            alt={order.fullName}
                            size="lg"
                        />
                        <div>
                            <Typography variant="h6" className="font-semibold">
                                {order.fullName}
                            </Typography>
                            <Typography variant="small" color="gray">
                                z {order.phoneNumber}
                            </Typography>
                            <Typography variant="small" color="gray">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5z"/></svg> {order.orderDate}
                            </Typography>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex items-start gap-4">
                        <img
                            src={
                                order.product.files?.[0]?.fileName
                                    ? `http://localhost:8080/images/${order.product.files[0].fileName}`
                                    : "https://via.placeholder.com/150"
                            }
                            alt={order.product.name}
                            className="w-28 h-28 object-cover rounded-lg border"
                        />
                        <div>
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
                            <Typography variant="small" className="font-semibold text-blue-600">
                                Narx: {formatPrice(order.product.price)}
                            </Typography>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t pt-4">
                        <Typography variant="small" className="font-medium">
                            Miqdor: <span className="font-bold">{order.count} dona</span>
                        </Typography>
                        <Typography
                            variant="h6"
                            className="font-bold text-blue-700 mt-2"
                        >
                            Jami: {formatPrice(order.product.price * order.count)}
                        </Typography>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
