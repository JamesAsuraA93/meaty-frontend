import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarAdmin from "@/components/common/SideBarAdmin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/router';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:8002/product')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

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
                  <img src={`http://localhost:8006/files/${encodeURIComponent(product.filePath)}`} alt={product.name} className="rounded-full" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="text-right">{product.price}$</TableCell>
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
