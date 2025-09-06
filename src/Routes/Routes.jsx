import Category from "../Components/Category/Category";
import Dashboard from "../Components/Dashboard/Dashboard";
import Home from "../Components/Home/Home";
import HomeProduct from "../Components/Home/HomeProduct";
import ProductBuy from "../Components/Home/ProductBuy";
import AuthForm from "../Components/Login/Login";
import Orders from "../Components/Orders/Orders";
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
        path: '/homeProduct',
        component: <HomeProduct />
    },
    {
        name: 'Buy Product',
        path: '/buyProduct',
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
        path: '/products/1',
        component: <Product />
    },
    {
        name: 'Orders',
        path: '/orders',
        component: <Orders />
    },
    {
        name: 'Profile',
        path: '/profil',
        component: <Profile />
    },

]
