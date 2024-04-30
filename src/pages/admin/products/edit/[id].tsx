/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { type ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SidebarAdmin from "@/components/common/SideBarAdmin";
import { Upload } from "lucide-react";
import axios from "axios";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  brand: string;
  cbdMax: number;
  cbdMin: number;
  producedIn: string;
  thcMax: number;
  thcMin: number;
  timeDelivery: string;
  filePath: string;
}

interface InputWithLabelProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function InputWithLabel({
  id,
  label,
  value,
  onChange,
  type = "text",
}: InputWithLabelProps) {
  return (
    <div className="space-y-4">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        name={id}
        placeholder={label}
        value={value}
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
}

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    quantity: 999,
    brand: "",
    cbdMax: 0,
    cbdMin: 0,
    producedIn: "",
    thcMax: 0,
    thcMin: 0,
    timeDelivery: "",
    filePath: "",
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:8002/product/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "cbdMax" ||
        name === "cbdMin" ||
        name === "thcMax" ||
        name === "thcMin"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(
          "http://localhost:8006/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        const filePath = response.data.file.path;
        setProduct((prev) => ({ ...prev, filePath }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const addOrUpdateProduct = async () => {
    try {
      if (id === "0") {
        await axios.post("http://localhost:8002/product", product);
        alert("New product added!");
        void router.push("/admin/products");
      } else {
        await axios.put(`http://localhost:8002/product/${id}`, product);
        alert("Product updated!");
        void router.push("/admin/products");
      }
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };

  const imageUrl = `http://localhost:8006/files/${encodeURIComponent(product.filePath)}`;

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex flex-1 flex-col p-4 md:flex-row">
        <div className="flex-1 space-y-4 p-4">
          <div className="relative h-[20rem] text-center">
            <label htmlFor="upload-image" className="cursor-pointer">
              <img
                src={imageUrl || "/placeholder.png"}
                // alt="Product"
                alt="Product Image"
                className="mb-4 rounded-lg object-cover shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg "
                style={{ width: "100%", height: "100%" }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-5 text-lg font-semibold text-white transition-all duration-300 ease-in-out
              hover:bg-opacity-50
              "
              >
                <Upload size={32} />
              </div>
            </label>
            <input
              type="file"
              id="upload-image"
              style={{ display: "none" }}
              onChange={handleImageUpload}
              className="h-[20rem] "
            />
          </div>
        </div>
        <div className="flex-1">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid grid-cols-3 gap-1">
                <TabsTrigger value="info">General Info</TabsTrigger>
                <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <InputWithLabel
                  id="name"
                  label="Name"
                  value={product.name}
                  onChange={handleInputChange}
                />
                <InputWithLabel
                  id="description"
                  label="Description"
                  value={product.description}
                  onChange={handleInputChange}
                />
                <InputWithLabel
                  id="price"
                  type="number"
                  label="Price"
                  value={product.price}
                  onChange={handleInputChange}
                />
              </TabsContent>
              <TabsContent value="manufacturing">
                <InputWithLabel
                  id="timeDelivery"
                  label="Time Delivery"
                  value={product.timeDelivery}
                  onChange={handleInputChange}
                />
                <InputWithLabel
                  id="producedIn"
                  label="Produced In"
                  value={product.producedIn}
                  onChange={handleInputChange}
                />
                <InputWithLabel
                  id="brand"
                  label="Brand"
                  value={product.brand}
                  onChange={handleInputChange}
                />
              </TabsContent>
              <TabsContent value="specifications">
                <InputWithLabel
                  id="thcMin"
                  type="number"
                  label="THC Min (%)"
                  value={product.thcMin}
                  onChange={handleInputChange}
                />
                <InputWithLabel
                  id="thcMax"
                  type="number"
                  label="THC Max (%)"
                  value={product.thcMax}
                  onChange={handleInputChange}
                />
                <InputWithLabel
                  id="cbdMin"
                  type="number"
                  label="CBD Min (%)"
                  value={product.cbdMin}
                  onChange={handleInputChange}
                />
                <InputWithLabel
                  id="cbdMax"
                  type="number"
                  label="CBD Max (%)"
                  value={product.cbdMax}
                  onChange={handleInputChange}
                />
              </TabsContent>
            </Tabs>
          )}
          <Button
            onClick={addOrUpdateProduct}
            variant="default"
            className="mt-4"
          >
            {id === "0" ? "Add Product" : "Update Product"}
          </Button>
        </div>
      </div>
    </div>
  );
}
