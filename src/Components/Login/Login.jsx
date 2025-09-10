import { useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Input,
    Button,
} from "@material-tailwind/react";
import { $api } from "../../utils";
import { Alert } from "../../utils/Alert";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/v1/admin/login`, { username, password });
            localStorage.setItem("token", response?.data?.object?.accessToken);
            Alert("Muvaffaqiyatli", "success");
            setUsername("");
            setPassword("");
            navigate("/dashboard");
        } catch (error) {
            Alert(`Xatolik: ${error}`, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-2xl rounded-2xl">
                <CardBody className="flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-center">Kirish</h1>
                    <Input
                        label="Login"
                        size="lg"
                        type="tel"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        label="Parol"
                        size="lg"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </CardBody>
                <CardFooter className="pt-0 flex flex-col gap-4">
                    <Button
                        onClick={handleLogin}
                        fullWidth
                        disabled={loading}
                        className="flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            "Kirish"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
