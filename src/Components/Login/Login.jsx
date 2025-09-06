import { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";

export default function LoginPage() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log({ phone, password });
        // bu yerda axios.post("/login", { phone, password }) qilsa bo‘ladi
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-2xl rounded-2xl">
                <form onSubmit={handleLogin}>
                    <CardBody className="flex flex-col gap-6">
                        <h1 className="text-3xl font-bold text-center">
                            Kirish
                        </h1>
                        <Input
                            label="Login"
                            size="lg"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                        <Button type="submit" fullWidth>
                            Kirish
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
