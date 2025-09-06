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
import { PlusIcon } from "@heroicons/react/24/solid";

export default function CreateCategory() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOpen = () => setOpen(!open);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // FormData backend uchun
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);

        console.log("Yangi kategoriya:", { name, image });

        // Masalan:
        // axios.post("/category", formData, { headers: { "Content-Type": "multipart/form-data" } })

        setOpen(false);
        setName("");
        setImage(null);
        setPreview(null);
    };

    return (
        <div className="">
            {/* Tugma modal ochish uchun */}
            <Button color="blue" className="flex items-center gap-2" onClick={handleOpen}>
                <PlusIcon className="h-5 w-5" />
                Yangi Kategoriya
            </Button>

            {/* Modal */}
            <Dialog open={open} handler={handleOpen} size="sm">
                <DialogHeader>Kategoriya yaratish</DialogHeader>
                <DialogBody divider>
                    <form className="space-y-6">
                        {/* Nomi */}
                        <div>
                            <Input
                                label=" Kategoriya nomi"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Fayl yuklash */}
                        <div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Rasm yuklash
                            </Typography>
                            <Input type="file" onChange={handleFileChange} />
                        </div>

                        {/* Preview */}
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
                    <Button variant="text" color="red" onClick={handleOpen}>
                        Bekor qilish
                    </Button>
                    <Button color="blue" onClick={handleSubmit} className="flex items-center gap-2">
                        <PlusIcon className="h-5 w-5" />
                        Yaratish
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
