import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/solid";
import CreateCategory from "./components/CreateCategory";
import { NavLink } from "react-router-dom";
import { $api } from "../../utils";
import Loading from "../UI/Loadings/Loading";
import DeleteCategory from "./components/DeleteCategory";
import EditCategory from "./components/EditCategory";
import CONFIG from "../../utils/Config";
import Photo from "../../img/Photo.jpg";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await $api.get(`/admin/categories`);
      const data =
        Array.isArray(response.data)
          ? response.data
          : response.data?.object ?? [];
      setCategories(data);
    } catch (error) {
      console.error("Kategoriya olishda xato:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left gap-4 pb-4 border-b">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          Kategoriyalar
        </h1>
        <div className="flex justify-center sm:justify-end">
          <CreateCategory refresh={fetchCategories} />
        </div>
      </div>

      {/* Body */}
      {categories.length === 0 ? (
        <div className="h-[350px] w-full flex flex-col items-center justify-center text-gray-500">
          <svg
            className="w-12 h-12"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m10 0h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M10 13H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m7 0a4 4 0 1 1-3.995 4.2L13 17l.005-.2A4 4 0 0 1 17 13"
            ></path>
          </svg>
          <p className="text-lg font-medium">Kategoriyalar topilmadi</p>
          <p className="text-sm text-gray-400">Yangi kategoriya qo‘shib ko‘ring</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              shadow={true}
              className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow flex flex-col"
            >
              {/* Image */}
              <img
                src={cat?.file?.id ? CONFIG.API_URL + cat.file.id : Photo}
                alt={cat?.name}
                className="h-52 w-full object-contain rounded-t-xl"
              />

              {/* Body */}
              <CardBody className="flex flex-col flex-1 justify-between text-center">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-4 truncate"
                >
                  {cat.name}
                </Typography>

                {/* Actions */}
                <div className="flex justify-center gap-2 mt-auto">
                  <EditCategory data={cat} refresh={fetchCategories} />
                  <DeleteCategory categoryId={cat?.id} refresh={fetchCategories} />
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
