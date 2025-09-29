import React, { useState, useCallback } from "react";
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
import { PlusIcon } from "@heroicons/react/24/solid";
import Cropper from "react-easy-crop";
import { $api } from "../../../utils";
import { useParams } from "react-router-dom";

// helper: загрузка картинки
function createImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener("load", () => resolve(img));
        img.addEventListener("error", (error) => reject(error));
        img.setAttribute("crossOrigin", "anonymous");
        img.src = url;
    });
}

// helper: получить обрезанный Blob
async function getCroppedImg(imageSrc, croppedAreaPixels, rotation = 0) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const safeArea = Math.max(image.width, image.height) * 2;
    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-safeArea / 2, -safeArea / 2);
    ctx.drawImage(image, (safeArea - image.width) / 2, (safeArea - image.height) / 2);

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.putImageData(
        data,
        Math.round(0 - (safeArea / 2 - image.width / 2) - croppedAreaPixels.x),
        Math.round(0 - (safeArea / 2 - image.height / 2) - croppedAreaPixels.y)
    );

    return new Promise((resolve) => {
        canvas.toBlob((file) => resolve(file), "image/jpeg");
    });
}

export default function CreateProduct({ refresh }) {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [file, setFile] = useState(null);

    // crop states
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    // form states
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [isActive, setIsActive] = useState(true);
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

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            let fileId = null;

            if (file && croppedAreaPixels) {
                const croppedImageBlob = await getCroppedImg(imagePreview, croppedAreaPixels, rotation);
                const croppedFile = new File([croppedImageBlob], file.name, { type: "image/jpeg" });

                const formData = new FormData();
                formData.append("files", croppedFile);

                const fileRes = await $api.post("api/v1/file/uploads", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                fileId = fileRes?.data?.object[0]?.id;
            }

            const productData = {
                name,
                description,
                price: Number(price),
                isActive,
                categoryId: Number(id),
                files: fileId ? [fileId] : [],
            };

            await $api.post("api/v1/product/create", productData);

            handleOpen();
            refresh();
            setName("");
            setDescription("");
            setPrice("");
            setFile(null);
            setImagePreview(null);
            setIsActive(true);
        } catch (err) {
            console.error("Tovar qo'shishda xato:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Button color="blue" className="flex items-center gap-2" onClick={handleOpen}>
                <PlusIcon className="h-5 w-5" />
                Yangi Tovar
            </Button>

            <Dialog open={open} handler={handleOpen} size="lg">
                <DialogHeader>
                    <Typography variant="h5">Yangi Tovar Qo'shish</Typography>
                </DialogHeader>

                <DialogBody divider className="space-y-4 max-h-[70vh] overflow-y-auto">
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
                            <>
                                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 rounded-lg overflow-hidden mt-3">
                                    <Cropper
                                        image={imagePreview}
                                        crop={crop}
                                        zoom={zoom}
                                        rotation={rotation}
                                        aspect={4 / 3}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onRotationChange={setRotation}
                                        onCropComplete={onCropComplete}
                                    />
                                </div>

                                {/* Controls */}
                                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                                    <label className="flex items-center gap-2 w-full sm:w-auto">
                                        Zoom:
                                        <input
                                            type="range"
                                            min={1}
                                            max={3}
                                            step={0.1}
                                            value={zoom}
                                            onChange={(e) => setZoom(e.target.value)}
                                            className="w-full sm:w-40"
                                        />
                                    </label>
                                    <label className="flex items-center gap-2 w-full sm:w-auto">
                                        Rotate:
                                        <input
                                            type="range"
                                            min={0}
                                            max={360}
                                            step={1}
                                            value={rotation}
                                            onChange={(e) => setRotation(e.target.value)}
                                            className="w-full sm:w-40"
                                        />
                                    </label>
                                </div>
                            </>
                        )}
                    </div>

                    <Input
                        label="Narxi (UZS)"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        disabled={isLoading}
                        crossOrigin={undefined}
                    />

                    <Textarea
                        label="Qo'shimcha Ma’lumot"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isLoading}
                    />

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
                                Saqlanmoqda...
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            "Saqlash"
                        )}
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
