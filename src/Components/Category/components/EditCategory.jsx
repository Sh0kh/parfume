import React, { useState, useCallback } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import Cropper from "react-easy-crop";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

// функция для получения обрезанного изображения
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
        canvas.toBlob((file) => {
            resolve(file);
        }, "image/jpeg");
    });
}

function createImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener("load", () => resolve(img));
        img.addEventListener("error", (error) => reject(error));
        img.setAttribute("crossOrigin", "anonymous");
        img.src = url;
    });
}

export default function EditCategory({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(data?.name || "");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(data?.file?.url || null);
    const [isLoading, setIsLoading] = useState(false);

    // crop states
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleOpen = () => setOpen(!open);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(file);
            setPreview(url);
        }
    };

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSubmit = async () => {
        if (!name.trim()) {
            Alert("Kategoriya nomini kiriting", "warning");
            return;
        }

        setIsLoading(true);

        try {
            let fileId = data?.file?.id || 0;

            if (image && croppedAreaPixels) {
                const croppedImageBlob = await getCroppedImg(preview, croppedAreaPixels, rotation);
                const croppedFile = new File([croppedImageBlob], image.name, { type: "image/jpeg" });

                const formData = new FormData();
                formData.append("files", croppedFile);

                const uploadResponse = await $api.post("api/v1/file/uploads", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                fileId = uploadResponse?.data?.object[0]?.id;
            }

            const payload = {
                name: name.trim(),
                fileId: fileId,
                isActive: true,
            };

            await $api.put(`/admin/categories/${data.id}`, payload);

            Alert("Kategoriya muvaffaqiyatli yangilandi", "success");
            refresh();
            handleOpen();
        } catch (error) {
            console.error("Xatolik:", error);
            Alert(
                `Xatolik: ${error.response?.data?.message || error.message || "Server xatosi"}`,
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button
                color="blue"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleOpen}
            >
                <PencilIcon className="h-4 w-4" />
            </Button>

            <Dialog open={open} handler={handleOpen} size="lg">
                <DialogHeader>Kategoriyani tahrirlash</DialogHeader>
                <DialogBody divider className="max-h-[70vh] overflow-y-auto">
                    <form className="space-y-6">
                        <div>
                            <Input
                                label="Kategoriya nomi"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Rasm yuklash
                            </Typography>
                            <Input type="file" onChange={handleFileChange} disabled={isLoading} />
                        </div>

                        {preview && (
                            <div>
                                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 rounded-lg overflow-hidden">
                                    <Cropper
                                        image={preview}
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
                            </div>
                        )}
                    </form>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="red" onClick={handleOpen} disabled={isLoading}>
                        Bekor qilish
                    </Button>
                    <Button
                        color="blue"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center gap-2"
                    >
                        {isLoading ? (
                            <div className="flex justify-center gap-[10px]">
                                Saqlanmoqda
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            <>
                                <PencilIcon className="h-5 w-5" />
                                Saqlash
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
