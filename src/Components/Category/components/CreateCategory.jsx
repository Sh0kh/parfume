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
import { PlusIcon } from "@heroicons/react/24/solid";
import Cropper from "react-easy-crop";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

// функция для вырезания и конвертации картинки
const getCroppedImg = async (imageSrc, crop, rotation) => {
    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous");
            image.src = url;
        });

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

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.putImageData(
        data,
        Math.round(0 - (safeArea / 2 - image.width / 2) - crop.x),
        Math.round(0 - (safeArea / 2 - image.height / 2) - crop.y)
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, "image/jpeg");
    });
};

export default function CreateCategory({ refresh }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [imageSrc, setImageSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // cropper state
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleOpen = () => {
        setOpen(!open);
        if (open) {
            // очистка при закрытии
            setName("");
            setImageSrc(null);
            setImageFile(null);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setRotation(0);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageSrc(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            Alert("Kategoriya nomini kiriting", "warning");
            return;
        }

        setIsLoading(true);

        try {
            let fileId = 0;

            if (imageSrc) {
                const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
                const formData = new FormData();
                formData.append("files", croppedBlob, imageFile?.name || "cropped.jpg");

                const uploadResponse = await $api.post("api/v1/file/uploads", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                fileId = uploadResponse?.data?.object[0]?.id;
            }

            const data = {
                name: name.trim(),
                fileId: fileId,
                isActive: true,
            };

            await $api.post("/admin/categories", data);
            Alert("Kategoriya muvaffaqiyatli yaratildi", "success");
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
        <div>
            <Button color="blue" className="flex items-center gap-2" onClick={handleOpen}>
                <PlusIcon className="h-5 w-5" />
                Yangi Kategoriya
            </Button>

            <Dialog open={open} handler={handleOpen} size="lg">
                <DialogHeader>Kategoriya yaratish</DialogHeader>
                <DialogBody divider className="space-y-6 max-h-[70vh] overflow-y-auto">
                    <Input
                        label="Kategoriya nomi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                    />

                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                            Rasm yuklash
                        </Typography>
                        <Input type="file" onChange={handleFileChange} disabled={isLoading} />
                    </div>

                    {imageSrc && (
                        <>
                            {/* Responsive редактор */}
                            <div className="relative w-full h-[280px] sm:h-[380px] md:h-[480px] bg-gray-100 rounded-lg overflow-hidden">
                                <Cropper
                                    image={imageSrc}
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

                            {/* Контролы */}
                            <div className="flex flex-col sm:flex-row items-center gap-4">
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
                                Yaratilmoqda
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            <>
                                <PlusIcon className="h-5 w-5" />
                                Yaratish
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
