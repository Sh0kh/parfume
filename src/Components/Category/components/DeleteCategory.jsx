import { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
} from "@material-tailwind/react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function DeleteCategory({ categoryId, refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        if (!loading) setOpen(!open); // loading paytida yopib bo‘lmaydi
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await $api.delete(`/admin/categories/${categoryId}`);
            Alert("Kategoriya muvaffaqiyatli o‘chirildi", "success");
            refresh();
            setOpen(false);
        } catch (error) {
            console.log(error);
            Alert(
                `Xatolik: ${error.response?.data?.message || error.message || "Server xatosi"
                }`,
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                color="red"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleOpen}
            >
                <TrashIcon className="h-4 w-4" />
            </Button>

            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogHeader className="text-lg font-bold text-red-600">
                    O‘chirishni tasdiqlaysizmi?
                </DialogHeader>
                <DialogBody divider>
                    Siz haqiqatdan ham bu kategoriyani o‘chirmoqchimisiz?
                    Bu amalni ortga qaytarib bo‘lmaydi.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="blue-gray"
                        onClick={handleOpen}
                        className="mr-2"
                        disabled={loading}
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        color="red"
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex items-center gap-2"
                    >
                        {loading ? (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            "Ha, o‘chirish"
                        )}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
