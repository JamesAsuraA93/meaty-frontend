import SidebarAdmin from "@/components/common/SideBarAdmin";
import Modal from "@/components/layout/Modal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  filePath?: string;
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

// function StatusSelect({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (value: string) => void;
// }) {
//   return (
//     <Select>
//       <SelectTrigger className="w-full">
//         <SelectValue placeholder={value || "Select status"} />
//       </SelectTrigger>
//       <SelectContent className="z-[999]">
//         <SelectGroup>
//           <SelectLabel>Status</SelectLabel>
//           <SelectItem value="PENDING" onSelect={() => onChange("PENDING")}>
//             Pending
//           </SelectItem>
//           <SelectItem value="SHIPPING" onSelect={() => onChange("SHIPPING")}>
//             Shipping
//           </SelectItem>
//           <SelectItem value="DELIVERED" onSelect={() => onChange("DELIVERED")}>
//             Delivered
//           </SelectItem>
//           <SelectItem value="CANCELED" onSelect={() => onChange("CANCELED")}>
//             Canceled
//           </SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }

export default function AdminOrders() {
  // const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orderSummary = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  useEffect(() => {
    axios.get('http://localhost:8003/orders')
      .then(response => {
        const fetchedOrders = response.data.map((order: { id: { toString: () => any; }; items: any[]; status: any; }) => ({
          id: order.id.toString(),
          user_id: order.items[0]?.order?.user?.email || 'Unknown', 
          total_price_amount: order.items.reduce((acc: number, item: { quantity: number; product: { price: number; }; }) => acc + item.quantity * item.product.price, 0),
          discount: 0,
          delivery_fee: 0,
          status: order.status,
          created_at: new Date().toISOString(), 
          items: order.items.map((item: { product: { name: any; price: number; filePath: any; }; quantity: number; }) => ({
            id: `${order.id}-${item.product.name}`,
            order_id: order.id.toString(),
            product_id: 'Unknown',
            quantity: item.quantity,
            subtotal: item.quantity * item.product.price,
            product: {
              id: 'Unknown',
              name: item.product.name,
              price: item.product.price,
              filePath: item.product.filePath
            }
          }))
        }));
        setOrders(fetchedOrders);
      })
      .catch(error => console.error('Failed to fetch orders:', error));
  }, []);

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(event.target.value);
  };

  const saveStatusChange = () => {
    if (selectedOrder) {
      const url = `http://localhost:8003/orders/${selectedOrder.id}/status`;
      axios.put(url, { status: newStatus })
        .then(() => {
          setOrders((orders) =>
            orders.map((order) =>
              order.id === selectedOrder.id ? { ...order, status: newStatus } : order,
            ),
          );
          closeModal();
        })
        .catch(error => console.error('Failed to update order status:', error));
    }
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1 p-4">
        <div className="mb-4 grid grid-cols-4 gap-4">
          <div className="rounded bg-blue-100 p-4 text-center shadow">
            <div className="text-lg font-bold">
              {/* {orderSummary["PENDING"] || 0} */}
              {orderSummary.PENDING}
            </div>
            <div>Pending Orders</div>
          </div>
          <div className="rounded bg-green-100 p-4 text-center shadow">
            <div className="text-lg font-bold">
              {/* {orderSummary.SHIPPING"] || 0} */}
              {orderSummary.SHIPPING}
            </div>
            <div>Shipping Orders</div>
          </div>
          <div className="rounded bg-yellow-100 p-4 text-center shadow">
            <div className="text-lg font-bold">
              {/* {orderSummary.DELIVERED"] || 0} */}
              {orderSummary.DELIVERED}
            </div>
            <div>Delivered Orders</div>
          </div>
          <div className="rounded bg-red-100 p-4 text-center shadow">
            <div className="text-lg font-bold">
              {/* {orderSummary.CANCELED"] || 0} */}
              {orderSummary.CANCELED}
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
              <div>
                <label>Status: </label>
                <select value={newStatus} onChange={handleStatusChange} className="border rounded p-2">
                  <option value="PENDING">Pending</option>
                  <option value="SHIPPING">Shipping</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELED">Canceled</option>
                </select>
              </div>
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
