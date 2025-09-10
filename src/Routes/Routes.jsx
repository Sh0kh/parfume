import Category from "../Components/Category/Category";
import Dashboard from "../Components/Dashboard/Dashboard";
import Home from "../Components/Home/Home";
import HomeProduct from "../Components/Home/HomeProduct";
import ProductBuy from "../Components/Home/ProductBuy";
import AuthForm from "../Components/Login/Login";
import DetailOrder from "../Components/Orders/components/Detailorder";
import Orders from "../Components/Orders/Orders";
import DetailProduct from "../Components/Product/components/DetailProduct";
import Product from "../Components/Product/Product";
import Profile from "../Components/Profile/Profile";



export const userRoutes = [
    {
        name: 'Home',
        path: '/',
        component: <Home />
    },
    {
        name: 'Product',
        path: '/product/:id',
        component: <HomeProduct />
    },
    {
        name: 'Buy Product',
        path: '/buyProduct/:id',
        component: <ProductBuy />
    },
    {
        name: 'Logion',
        path: '/login',
        component: <AuthForm />
    }
]

export const AdminRoutes = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: <Dashboard />
    },
    {
        name: 'Category',
        path: '/products',
        component: <Category />
    },
    {
        name: 'Product',
        path: '/products/:id',
        component: <Product />
    },
    {
        name: 'Product Detail',
        path: '/product/:id',
        component: <DetailProduct />
    },
    {
        name: 'Orders',
        path: '/orders',
        component: <Orders />
    },
    {
        name: 'Orders detail',
        path: '/orders/:id',
        component: <DetailOrder />
    },
    {
        name: 'Profile',
        path: '/profil',
        component: <Profile />
    },

]
