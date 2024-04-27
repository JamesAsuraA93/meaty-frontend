import React, { useEffect, useState } from "react";
import SidebarAdmin from "@/components/common/SideBarAdmin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Modal from "@/components/layout/Modal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/router";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  subtotal: number;
  product: Product;
}

interface Order {
  id: string;
  user_id: string;
  total_price_amount: number;
  discount: number;
  delivery_fee: number;
  status: string;
  created_at: string;
  formattedDate?: string;
  items: OrderItem[];
}

const initialOrders = [
  {
    id: "1",
    user_id: "1",
    total_price_amount: 120.0,
    discount: 10.0,
    delivery_fee: 5.0,
    status: "PENDING",
    created_at: "2021-09-15T12:34:56Z",
    items: [
      {
        id: "101",
        order_id: "1",
        product_id: "001",
        quantity: 2,
        subtotal: 60.0,
        product: { id: "001", name: "Product A", price: 30.0 },
      },
      {
        id: "102",
        order_id: "1",
        product_id: "002",
        quantity: 2,
        subtotal: 60.0,
        product: { id: "002", name: "Product B", price: 30.0 },
      },
      {
        id: "103",
        order_id: "1",
        product_id: "003",
        quantity: 2,
        subtotal: 60.0,
        product: { id: "003", name: "Product C", price: 30.0 },
      },
    ],
  },
  {
    id: "2",
    user_id: "2",
    total_price_amount: 200.0,
    discount: 20.0,
    delivery_fee: 10.0,
    status: "SHIPPING",
    created_at: "2021-10-01T11:22:33Z",
    items: [
      {
        id: "104",
        order_id: "2",
        product_id: "004",
        quantity: 1,
        subtotal: 100.0,
        product: { id: "004", name: "Product D", price: 100.0 },
      },
      {
        id: "105",
        order_id: "2",
        product_id: "005",
        quantity: 2,
        subtotal: 100.0,
        product: { id: "005", name: "Product E", price: 50.0 },
      }
    ],
  },
  {
    id: "3",
    user_id: "3",
    total_price_amount: 300.0,
    discount: 30.0,
    delivery_fee: 15.0,
    status: "DELIVERED",
    created_at: "2021-11-12T14:45:00Z",
    items: [
      {
        id: "106",
        order_id: "3",
        product_id: "006",
        quantity: 3,
        subtotal: 300.0,
        product: { id: "006", name: "Product F", price: 100.0 },
      }
    ],
  },
  {
    id: "4",
    user_id: "4",
    total_price_amount: 400.0,
    discount: 50.0,
    delivery_fee: 20.0,
    status: "CANCELED",
    created_at: "2021-12-24T17:00:00Z",
    items: [
      {
        id: "107",
        order_id: "4",
        product_id: "007",
        quantity: 4,
        subtotal: 400.0,
        product: { id: "007", name: "Product G", price: 100.0 },
      }
    ],
  },
  {
    id: "5",
    user_id: "5",
    total_price_amount: 500.0,
    discount: 25.0,
    delivery_fee: 25.0,
    status: "PENDING",
    created_at: "2022-01-05T19:21:00Z",
    items: [
      {
        id: "108",
        order_id: "5",
        product_id: "008",
        quantity: 5,
        subtotal: 500.0,
        product: { id: "008", name: "Product H", price: 100.0 },
      }
    ],
  },
  {
    id: "6",
    user_id: "6",
    total_price_amount: 600.0,
    discount: 60.0,
    delivery_fee: 30.0,
    status: "SHIPPING",
    created_at: "2022-02-14T10:30:00Z",
    items: [
      {
        id: "109",
        order_id: "6",
        product_id: "009",
        quantity: 6,
        subtotal: 600.0,
        product: { id: "009", name: "Product I", price: 100.0 },
      }
    ],
  }
];

function StatusSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={value || "Select status"} />
      </SelectTrigger>
      <SelectContent className="z-[999]">
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="PENDING" onSelect={() => onChange("PENDING")}>
            Pending
          </SelectItem>
          <SelectItem value="SHIPPING" onSelect={() => onChange("SHIPPING")}>
            Shipping
          </SelectItem>
          <SelectItem value="DELIVERED" onSelect={() => onChange("DELIVERED")}>
            Delivered
          </SelectItem>
          <SelectItem value="CANCELED" onSelect={() => onChange("CANCELED")}>
            Canceled
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orderSummary = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number },
  );

  useEffect(() => {
    setOrders((orders) =>
      orders.map((order) => ({
        ...order,
        formattedDate: new Date(order.created_at).toLocaleDateString(),
      })),
    );
  }, []);

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusChange = (status: string) => {
    setNewStatus(status);
  };

  const saveStatusChange = () => {
    if (selectedOrder) {
      setOrders((orders) =>
        orders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: newStatus }
            : order,
        ),
      );
      closeModal();
    }
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 p-4">
        <div className="mb-4 grid grid-cols-4 gap-4">
          <div className="rounded bg-blue-100 p-4 text-center shadow">
            <div className="text-lg font-bold">
              {orderSummary["PENDING"] || 0}
            </div>
            <div>Pending Orders</div>
          </div>
          <div className="rounded bg-green-100 p-4 text-center shadow">
            <div className="text-lg font-bold">
              {orderSummary["SHIPPING"] || 0}
            </div>
            <div>Shipping Orders</div>
          </div>
          <div className="rounded bg-yellow-100 p-4 text-center shadow">
            <div className="text-lg font-bold">
              {orderSummary["DELIVERED"] || 0}
            </div>
            <div>Delivered Orders</div>
          </div>
          <div className="rounded bg-red-100 p-4 text-center shadow">
            <div className="text-lg font-bold">
              {orderSummary["CANCELED"] || 0}
            </div>
            <div>Canceled Orders</div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Delivery Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.user_id}</TableCell>
                <TableCell>${order.total_price_amount.toFixed(2)}</TableCell>
                <TableCell>${order.discount.toFixed(2)}</TableCell>
                <TableCell>${order.delivery_fee.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.formattedDate}</TableCell>
                <TableCell>
                  <Button onClick={() => openModal(order)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isModalOpen && selectedOrder && (
          <Modal isOpen={isModalOpen}>
            <div className="rounded bg-white p-12 shadow-lg">
              <h2 className="mb-4">Order Details</h2>
              <p>User ID: {selectedOrder.user_id}</p>
              <p>Total Price: ${selectedOrder.total_price_amount.toFixed(2)}</p>
              <p>Discount: ${selectedOrder.discount.toFixed(2)}</p>
              <p>Delivery Fee: ${selectedOrder.delivery_fee.toFixed(2)}</p>
              <p>Status: {selectedOrder.status}</p>
              <p className="mb-4">Created At: {selectedOrder.formattedDate}</p>
              <div className="mb-8">
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item) => (
                    <div key={item.id} className="mb-2">
                      <p>
                        {item.product.name} - Qty: {item.quantity} Subtotal: $
                        {item.subtotal.toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No items found for this order.</p>
                )}
              </div>
              <StatusSelect
                value={selectedOrder.status}
                onChange={handleStatusChange}
              />
              <Button onClick={saveStatusChange} className="mr-4 mt-4">
                Save Changes
              </Button>
              <Button onClick={closeModal} className="mt-8" variant="outline">
                Close
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
