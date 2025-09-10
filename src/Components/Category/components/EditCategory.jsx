import React, { useState } from "react";
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
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function EditCategory({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(data?.name || "");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(data?.file?.url || null);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            Alert("Kategoriya nomini kiriting", "warning");
            return;
        }

        setIsLoading(true);

        try {
            let fileId = data?.file?.id || 0;

            // Agar yangi rasm tanlansa — upload qilamiz
            if (image) {
                const formData = new FormData();
                formData.append("files", image);

                const uploadResponse = await $api.post("api/v1/file/uploads", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                fileId = uploadResponse?.data?.object[0]?.id;
            }

            // Yangilash
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
                `Xatolik: ${error.response?.data?.message || error.message || "Server xatosi"
                }`,
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

            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Kategoriyani tahrirlash</DialogHeader>
                <DialogBody divider>
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
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Rasm yuklash
                            </Typography>
                            <Input type="file" onChange={handleFileChange} disabled={isLoading} />
                        </div>

                        {preview && (
                            <div className="mt-4 flex justify-center">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-32 w-auto rounded-lg border object-cover"
                                />
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
