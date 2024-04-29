import React from "react";
import SidebarAdmin from "@/components/common/SideBarAdmin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/router';

const products = [
  { id: "1", name: "Blue berry muffin", description: "nice weed nice mao", price: 99.99, imageUrl: "https://www.bccannabisstores.com/cdn/shop/files/1062860_1800x1800.jpg?v=1684339496" },
  { id: "2", name: "Bruce Banner", description: "nice weed nice mao", price: 99.99, imageUrl: "https://www.bccannabisstores.com/cdn/shop/files/1062860_1800x1800.jpg?v=1684339496" },
  { id: "3", name: "Thai muffin", description: "nice weed nice mao", price: 99.99, imageUrl: "https://www.bccannabisstores.com/cdn/shop/files/1062860_1800x1800.jpg?v=1684339496" },
  { id: "4", name: "Noob weed", description: "nice weed nice mao", price: 99.99, imageUrl: "https://www.bccannabisstores.com/cdn/shop/files/1062860_1800x1800.jpg?v=1684339496" },
];

export default function AdminProducts() {
  const router = useRouter();

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1>Products</h1>
          <Button onClick={() => router.push("/admin/products/edit/0")} variant="default">
            Add Product
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Image</TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.imageUrl} alt={product.name} className="rounded-full" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="text-right">{product.price} $</TableCell>
                <TableCell>
                  <Button onClick={() => router.push(`/admin/products/edit/${product.id}`)} variant="secondary">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
