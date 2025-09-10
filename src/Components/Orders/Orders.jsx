import {
    Card,
    CardBody,
    Typography,
    Avatar,
    Button,
} from "@material-tailwind/react";
import { $api } from "../../utils";
import { useEffect, useState } from "react";
import Loading from "../UI/Loadings/Loading";
import { NavLink } from "react-router-dom";
import { ListOrdered, PackageOpen } from "lucide-react";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const getAllOrders = async (pageNum = 0) => {
        setLoading(true);
        try {
            const response = await $api.get(`/api/v1/order/getAll?page=${pageNum}&size=5`);
            const resData = response?.data?.object;
            setOrders(resData?.content || []);
            setTotalPages(resData?.totalPages || 0);
        } catch (error) {
            console.log(error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllOrders(page);
    }, [page]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("uz-UZ").format(price) + " UZS";
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="px-6 space-y-4">
            <Typography variant="h4" className="font-bold mb-4">
                Buyurtmalar
            </Typography>
            {/* Loading */}
            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <ListOrdered className="w-16 h-16 text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-300">
                        Buyurtmalar topilmadi
                    </h2>
                    <p className="text-gray-400">
                        Hozircha buyurtmalar mavjud emas, keyinroq urinib ko‘ring.
                    </p>
                </div>
            ) : (
                <>
                    {/* Orders List */}
                    {orders.map((order) => (
                        <NavLink to={`/orders/${order.id}`} key={order.id}>
                            <Card
                                className="shadow-md hover:shadow-xl transition border border-gray-200"
                            >
                                <CardBody className="flex items-center justify-between">
                                    {/* User */}
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            src="https://www.shutterstock.com/image-vector/people-icon-vector-person-sing-260nw-707883430.jpg"
                                            alt={order.fullName}
                                            size="sm"
                                        />
                                        <div>
                                            <Typography variant="small" className="font-medium">
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

                                    {/* Product */}
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={
                                                order?.product?.files?.[0]?.fileName
                                                    ? `/images/${order.product.files[0].fileName}`
                                                    : "https://via.placeholder.com/100"
                                            }
                                            alt={order?.product?.name}
                                            className="w-16 h-16 object-cover rounded-lg border"
                                        />
                                        <div>
                                            <Typography variant="small" className="font-semibold">
                                                {order?.product?.name}
                                            </Typography>
                                            <Typography variant="small" color="gray">
                                                {formatPrice(order?.product?.price)}
                                            </Typography>
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div className="text-center">
                                        <Typography variant="small" className="font-bold">
                                            {order.count} dona
                                        </Typography>
                                    </div>

                                    {/* Total */}
                                    <div className="text-right">
                                        <Typography variant="small" color="blue-gray">
                                            Jami:
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            className="font-bold text-blue-600"
                                        >
                                            {formatPrice(order?.product?.price * order.count)}
                                        </Typography>
                                    </div>
                                </CardBody>
                            </Card>
                        </NavLink>
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-center gap-3 mt-6">
                        <Button
                            size="sm"
                            disabled={page === 0}
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            Oldingi
                        </Button>
                        <Typography variant="small" className="flex items-center">
                            {page + 1} / {totalPages}
                        </Typography>
                        <Button
                            size="sm"
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Keyingi
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
