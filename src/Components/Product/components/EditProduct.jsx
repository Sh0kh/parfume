import { useState, useCallback } from "react";
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
import Cropper from "react-easy-crop";
import { $api } from "../../../utils";

function getCroppedImg(imageSrc, crop, rotation = 0) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const radians = (rotation * Math.PI) / 180;

            const safeArea = Math.max(image.width, image.height) * 2;
            canvas.width = safeArea;
            canvas.height = safeArea;

            ctx.translate(safeArea / 2, safeArea / 2);
            ctx.rotate(radians);
            ctx.translate(-safeArea / 2, -safeArea / 2);
            ctx.drawImage(image, (safeArea - image.width) / 2, (safeArea - image.height) / 2);

            const data = ctx.getImageData(0, 0, safeArea, safeArea);

            canvas.width = crop.width;
            canvas.height = crop.height;

            ctx.putImageData(
                data,
                Math.round(0 - safeArea / 2 + image.width / 2 - crop.x),
                Math.round(0 - safeArea / 2 + image.height / 2 - crop.y)
            );

            canvas.toBlob((blob) => {
                resolve(blob);
            }, "image/jpeg");
        };
        image.onerror = (err) => reject(err);
    });
}

export default function EditProduct({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // crop states
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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

    const onCropComplete = useCallback((_, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            let fileId = null;

            // ✅ agar yangi rasm yuklangan bo‘lsa → obrezka + upload
            if (file && imagePreview && croppedAreaPixels) {
                const croppedBlob = await getCroppedImg(imagePreview, croppedAreaPixels, rotation);
                const formData = new FormData();
                formData.append("files", croppedBlob, "cropped.jpg");

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
                files: fileId ? [fileId] : [], // eski rasmni qaytarmaymiz
                categoryName: data?.categoryName,
            };

            await $api.put("api/v1/product/update", productData);

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

                <DialogBody divider className="space-y-4 max-h-[70vh] overflow-y-auto">
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
                            <div className="mt-3">
                                <div className="relative w-full h-60 bg-black rounded-lg overflow-hidden">
                                    <Cropper
                                        image={imagePreview}
                                        crop={crop}
                                        zoom={zoom}
                                        rotation={rotation}
                                        aspect={1}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onRotationChange={setRotation}
                                        onCropComplete={onCropComplete}
                                    />
                                </div>

                                {/* zoom control */}
                                <div className="mt-2">
                                    <label className="text-sm">Zoom: {zoom.toFixed(1)}x</label>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        value={zoom}
                                        onChange={(e) => setZoom(Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                {/* rotate control */}
                                <div className="mt-2">
                                    <label className="text-sm">Rotate: {rotation}°</label>
                                    <input
                                        type="range"
                                        min={0}
                                        max={360}
                                        step={1}
                                        value={rotation}
                                        onChange={(e) => setRotation(Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            </div>
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
