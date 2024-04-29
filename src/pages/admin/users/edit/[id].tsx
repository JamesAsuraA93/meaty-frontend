/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SidebarAdmin from "@/components/common/SideBarAdmin";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  birthdate?: string;
  username: string;
  password: string;
  role: string;
  credit: number;
}

interface InputWithLabelProps {
  id: string;
  label: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
}

function InputWithLabel({
  id,
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
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
        disabled={disabled}
      />
    </div>
  );
}

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8001/getUser/${id}`)
        .then(response => {
          setUser({
            id: response.data.id.toString(),
            birthdate: new Date(response.data.birthdate).toISOString().split('T')[0],
            username: response.data.email,
            password: response.data.password,
            role: response.data.role,
            credit: response.data.credit,
          });
          setLoading(false);
        })
        .catch(error => {
          setError('Failed to fetch user data');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleCreditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const credit = parseFloat(e.target.value);
    setUser(prev => prev ? { ...prev, credit } : null);
  };

  const updateCredit = () => {
    if (user) {
      axios.put(`http://localhost:8001/updateUserCredit/${user.id}`, { credit: user.credit })
        .then(() => {
          alert("Credit updated successfully!");
          void router.push("/admin/users")
        })
        .catch(() => {
          alert("Failed to update credit.");
        });
    }
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex flex-1 flex-col p-4">
        <h1 className="mb-8">Edit User</h1>
        {user && (
          <div className="space-y-4">
            <InputWithLabel
              id="username"
              label="Username"
              value={user.username}
              disabled={true} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              } }            />
            <InputWithLabel
              id="birthdate"
              label="Birthdate"
              type="date"
              value={user.birthdate}
              disabled={true} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              } }            />
            <InputWithLabel
              id="role"
              label="Role"
              value={user.role}
              disabled={true} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.");
              } }            />
            <InputWithLabel
              id="credit"
              label="Credit"
              type="number"
              value={user.credit.toString()}
              onChange={handleCreditChange}
            />
          </div>
        )}
        <Button
          onClick={updateCredit}
          variant="default"
          className="mt-4"
        >
          Update Credit
        </Button>
      </div>
    </div>
  );
}
