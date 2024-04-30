/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from "react";
import SidebarAdmin from "@/components/common/SideBarAdmin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/router';
import axios from 'axios';

interface User {
  id: number;
  birthdate: string;
  username: string;
  role: string;
  credit: number;
}

export default function AdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8001/allUser')
      .then(response => {
        setUsers(response.data.map((user: any) => ({
          id: user.id,
          username: user.email, // Assuming 'email' is used as 'username'
          birthdate: new Date(user.birthdate).toLocaleDateString(),
          role: user.role,
          credit: user.credit
        })));
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1>Users</h1>
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
              <TableRow key={user.id.toString()}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.birthdate}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.credit.toFixed(2)} $</TableCell>
                <TableCell>
                  <Button onClick={() => router.push(`/admin/users/edit/${user.id}`)} variant="secondary">
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
