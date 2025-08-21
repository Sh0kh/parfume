import Home from "../Components/Home/Home";
import AuthForm from "../Components/Login/Login";
import Listening from "../Components/Mock1/Listening/Listening";



export const userRoutes = [
    {
        name: 'Home',
        path: '/',
        component: <Home />
    },
    {
        name: 'Logion',
        path: '/login',
        component: <AuthForm />
    },
    {
        name: 'Mock 1 listening',
        path: '/mock1/listening',
        component: <Listening />
    }
]