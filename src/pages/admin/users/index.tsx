import React from "react";
import SidebarAdmin from "@/components/common/SideBarAdmin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/router';

const users = [
  { id: "1", birthdate: "1990-01-01", username: "blueberry42", role: "USER", credit: 150.50},
  { id: "2", birthdate: "1985-05-15", username: "banner_bruce", role: "ADMIN", credit: 220.00},
  { id: "3", birthdate: "1992-08-09", username: "thai_thunder", role: "USER", credit: 185.75},
  { id: "4", birthdate: "1989-12-30", username: "weed_noob", role: "USER", credit: 95.00},
];

export default function AdminUsers() {
  const router = useRouter();

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1>Users</h1>
          <Button onClick={() => router.push("/admin/users/edit/0")} variant="default">
            Add User
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Birthdate</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Credit</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.birthdate}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.credit.toFixed(2)} $</TableCell>
                <TableCell>
                  <Button onClick={() => router.push(`/admin/users/edit/${user.id}`)} variant="secondary">
                    Edit
                  </Button>
                  <Button onClick={() => console.log("delete user : ", user.id)} variant="outline">
                    Delete
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
