import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
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
  birthdate: string;
  username: string;
  password: string;
  role: string;
  credit: number;
}

interface InputWithLabelProps {
  id: string;
  label: string;
  value: string;
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

function RoleSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const handleSelect = (role: string) => {
    onChange(role);
  };

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={value || "Select role"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem value="USER" onSelect={() => handleSelect("USER")}>
            User
          </SelectItem>
          <SelectItem value="ADMIN" onSelect={() => handleSelect("ADMIN")}>
            Admin
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<User>({
    id: id as string,
    birthdate: "",
    username: "",
    password: "",
    role: "USER",
    credit: 0,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role: string) => {
    setUser((prev) => ({ ...prev, role }));
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex flex-1 flex-col p-4">
        <h1 className="mb-8">Edit User</h1>
        <div className="space-y-4">
          <InputWithLabel
            id="username"
            label="Username"
            value={user.username}
            onChange={handleInputChange}
          />
          <InputWithLabel
            id="password"
            label="Password"
            type="password"
            value={user.password}
            onChange={handleInputChange}
          />
          <InputWithLabel
            id="birthdate"
            label="Birthdate"
            type="date"
            value={user.birthdate}
            onChange={handleInputChange}
          />
          <div className="space-y-4">
            <Label htmlFor="role">Role</Label>
            <RoleSelect value={user.role} onChange={handleRoleChange} />
          </div>
          <InputWithLabel
            id="credit"
            label="Credit"
            type="number"
            value={user.credit.toString()}
            onChange={handleInputChange}
          />
        </div>
        <Button
          onClick={() => alert("User updated!")}
          variant="default"
          className="mt-4"
        >
          Update User
        </Button>
      </div>
    </div>
  );
}
