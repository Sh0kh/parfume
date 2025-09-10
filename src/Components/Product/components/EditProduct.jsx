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
    Checkbox,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { $api } from "../../../utils";

export default function EditProduct({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(data?.fileList?.[0]?.filePath || null);
    const [file, setFile] = useState(null);

    // form states
    const [name, setName] = useState(data?.name || "");
    const [description, setDescription] = useState(data?.description || "");
    const [price, setPrice] = useState(data?.price || "");
    const [isActive, setIsActive] = useState(data?.isActive ?? true);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = () => {
        if (!isLoading) setOpen(!open);
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            let fileId = data?.fileList?.[0]?.id || null;

            // 1️⃣ Faylni alohida yuborish
            if (file) {
                const formData = new FormData();
                formData.append("files", file);

                const fileRes = await $api.post("api/v1/file/uploads", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                fileId = fileRes?.data?.object[0]?.id;
            }

            const productData = {
                id: data?.id,
                name,
                description,
                price: Number(price),
                isActive,
                categoryId: data?.categoryId,
                files: fileId ? [fileId] : [],
                categoryName: data?.categoryName,
                fileList: data?.fileList
            };

            await $api.put(`api/v1/product/update`, productData);

            handleOpen();
            refresh();
        } catch (err) {
            console.error("Tovar yangilashda xato:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Edit tugmasi */}
            <Button color="blue" size="sm" onClick={handleOpen} className="flex items-center gap-1">
                <PencilIcon className="h-4 w-4" />
            </Button>

            {/* Modal */}
            <Dialog open={open} handler={handleOpen} size="md">
                <DialogHeader>
                    <Typography variant="h5">Tovarni Tahrirlash</Typography>
                </DialogHeader>

                <DialogBody divider className="space-y-4">
                    {/* Nomi */}
                    <Input
                        label="Tovar Nomi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                        crossOrigin={undefined}
                    />

                    {/* Foto upload */}
                    <div>
                        <Typography className="mb-2 font-medium">Foto yuklash</Typography>
                        <input type="file" accept="image/*" onChange={handleImageChange} disabled={isLoading} />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mt-3 w-full h-40 object-cover rounded-lg border"
                            />
                        )}
                    </div>

                    {/* Narxi */}
                    <Input
                        label="Narxi (UZS)"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        disabled={isLoading}
                        crossOrigin={undefined}
                    />

                    {/* Qo‘shimcha ma’lumot */}
                    <Textarea
                        label="Qo'shimcha Ma’lumot"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isLoading}
                    />

                    {/* Aktiv yoki yo‘q */}
                    <Checkbox
                        label="Faol"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        disabled={isLoading}
                    />
                </DialogBody>

                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-2" disabled={isLoading}>
                        Bekor qilish
                    </Button>
                    <Button
                        color="blue"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center gap-2"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                Yangilanmoqda...
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            "Yangilash"
                        )}
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
