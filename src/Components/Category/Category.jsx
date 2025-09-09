import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import CreateCategory from "./components/CreateCategory";
import { NavLink } from "react-router-dom";
import { $api } from "../../utils";
import { Alert } from "../../utils/Alert";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Kategoriyalarni olish funksiyasi
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await $api.get(`/admin/categories`);

      console.log("Kategoriya API javob:", response.data);

      // array yoki objectni tekshirish
      const data =
        Array.isArray(response.data)
          ? response.data
          : response.data?.object ?? [];

      setCategories(data);

      Alert("Kategoriyalar muvaffaqiyatli yuklandi ✅", "success");
    } catch (error) {
      console.error("Kategoriya olishda xato:", error);
      Alert(`Xatolik kategoriyalarni olishda: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Yuqorida "Yangi kategoriya" tugmasi */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mr-auto">Kategoriyalar</h1>
        <CreateCategory />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Yuklanmoqda...</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-red-500">Kategoriyalar topilmadi!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              shadow={true}
              className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col"
            >
              {/* Rasm */}
              <img
                src={cat.image}
                alt={cat.name}
                className="h-52 w-full object-contain rounded-t-xl"
              />

              {/* Body */}
              <CardBody className="flex flex-col flex-1 justify-between text-center">
                {/* Title */}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-4"
                >
                  {cat.name}
                </Typography>

                {/* Tugmalar */}
                <div className="flex justify-center gap-2 mt-auto">
                  <Button
                    color="blue"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => Alert("Edit bosildi ✏️", "info")}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    color="red"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => Alert("Delete bosildi ❌", "warning")}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                  <NavLink to={`/products/${cat.id}`}>
                    <Button
                      color="green"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </NavLink>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
