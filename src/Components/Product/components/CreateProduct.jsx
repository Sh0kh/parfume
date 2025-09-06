import { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function CreateProduct() {
    const [open, setOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleOpen = () => setOpen(!open);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="">
            {/* Кнопка открыть модалку */}
            <Button color="blue" className="flex items-center gap-2" onClick={handleOpen}>
                <PlusIcon className="h-5 w-5" />
                Yangi Tovar
            </Button>

            {/* Модалка */}
            <Dialog open={open} handler={handleOpen} size="md">
                <DialogHeader>
                    <Typography variant="h5">Yangi Tovar Qo'shish</Typography>
                </DialogHeader>

                <DialogBody divider className="space-y-4">
                    {/* Title */}
                    <Input label="Tovar Nomi" crossOrigin={undefined} />

                    {/* Foto upload */}
                    <div>
                        <Typography className="mb-2 font-medium">Foto yuklash</Typography>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mt-3 w-full h-40 object-cover rounded-lg border"
                            />
                        )}
                    </div>

                    {/* Price */}
                    <Input label="Narxi (UZS)" type="number" crossOrigin={undefined} />

                    {/* Info */}
                    <Textarea label="Qo'shimcha Ma’lumot" />
                </DialogBody>

                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-2">
                        Bekor qilish
                    </Button>
                    <Button color="blue" onClick={handleOpen}>
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
