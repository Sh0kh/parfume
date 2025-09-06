import {
    Card,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";

export default function Orders() {
    const orders = [
        {
            id: 1,
            user: "Ali Valiyev",
            phone: "+998 90 123 45 67",
            product: {
                title: "MAC Matte Lipstick Red Rock 0.1",
                image:
                    "https://m.media-amazon.com/images/I/516A-vyh2lL._UF1000,1000_QL80_.jpg",
                price: 25000,
            },
            quantity: 2,
            date: "2025-09-06",
        },
        {
            id: 2,
            user: "Malika Karimova",
            phone: "+998 91 765 43 21",
            product: {
                title: "RENEE Stunner Matte Lipstick, 4Gm",
                image:
                    "https://www.reneecosmetics.in/cdn/shop/files/8906121645491_1_c8d144f0-e818-4c32-80bf-75f13f1ba956.jpg?v=1742483477&width=1946",
                price: 10000,
            },
            quantity: 3,
            date: "2025-09-05",
        },

    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat("uz-UZ").format(price) + " UZS";
    };

    return (
        <div className="px-6 space-y-4">
            <Typography variant="h4" className="font-bold mb-4">
                Buyurtmalar
            </Typography>

            {orders.map((order) => (
                <Card key={order.id} className="shadow-md hover:shadow-xl transition">
                    <CardBody className="flex items-center justify-between">
                        {/* User */}
                        <div className="flex items-center gap-3">
                            <Avatar
                                src="https://www.shutterstock.com/image-vector/people-icon-vector-person-sing-260nw-707883430.jpg"
                                alt={order.user}
                                size="sm"
                            />
                            <div>
                                <Typography variant="small" className="font-medium">
                                    {order.user}
                                </Typography>
                                <Typography variant="small" color="gray">
                                    {order.phone}
                                </Typography>
                                <Typography variant="small" color="gray">
                                    {order.date}
                                </Typography>
                            </div>
                        </div>

                        {/* Product */}
                        <div className="flex items-center gap-3">
                            <img
                                src={order.product.image}
                                alt={order.product.title}
                                className="w-16 h-16 object-cover rounded-lg border"
                            />
                            <div>
                                <Typography variant="small" className="font-semibold">
                                    {order.product.title}
                                </Typography>
                                <Typography variant="small" color="gray">
                                    {formatPrice(order.product.price)}
                                </Typography>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="text-center">
                            <Typography variant="small" className="font-bold">
                                {order.quantity} dona
                            </Typography>
                        </div>

                        {/* Total */}
                        <div className="text-right">
                            <Typography variant="small" color="blue-gray">
                                Jami:
                            </Typography>
                            <Typography variant="small" className="font-bold text-blue-600">
                                {formatPrice(order.product.price * order.quantity)}
                            </Typography>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
