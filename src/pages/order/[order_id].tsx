import Navbar from "@/components/common/Navbar";
import { useRouter } from "next/router";

export default function OrderDetail() {
  const router = useRouter();
  const { order_id } = router.query;
  return (
    <>
      <Navbar />
      <div className="flex h-full w-full items-center justify-center">
        Order : {order_id}
      </div>
    </>
  );
}
