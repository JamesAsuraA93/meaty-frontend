// import Navbar from "@/components/common/NavBar";
import OrderItem from "@/components/common/OrderItem";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CircleDollarSign, HandCoins } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export interface InterfaceBasket {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  price: number;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  filePath: string;
  fileId?: number;
}

export enum PaymentType {
  CASH = "CASH",
  CREDIT = "CREDIT",
}

// basketId[],
// firstname,
// lastname,
// phone,
// emailInfo,
// address,
// district,
// paymentType = enum PaymentType,
// postalCode,
// province,

const formSchema = z.object({
  basketId: z.array(z.string()),
  firstname: z.string(),
  lastname: z.string(),
  phone: z.string(),
  emailInfo: z.string(),
  address: z.string(),
  district: z.string(),
  paymentType: z.enum([PaymentType.CASH, PaymentType.CREDIT]),
  postalCode: z.string(),
  province: z.string(),
});

export default function Checkout() {
  // const [quantity, setQuantity] = useState(1); // สร้าง state สำหรับจำนวนสินค้าและฟังก์ชันเพิ่มค่า

  // const incrementQuantity = () => {
  //   setQuantity((prevQuantity) => prevQuantity + 1);
  // };

  // const decrementQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity((prevQuantity) => prevQuantity - 1);
  //   }
  // };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      basketId: [],
      firstname: "",
      lastname: "",
      phone: "",
      emailInfo: "",
      address: "",
      district: "",
      paymentType: PaymentType.CASH,
      postalCode: "",
      province: "",
    },
  });

  // // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values);
  // }

  const [basket, setBasket] = useState<InterfaceBasket[]>([]); // สร้าง state สำหรับตะกร้าสินค้า

  const [credit, setCredit] = useState<number>(0); // สร้าง state สำหรับเก็บเครดิต

  useEffect(() => {
    // const basketData = localStorage.getItem("basket");

    const getBasket = async () => {
      try {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:8003/basket/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log({
          response,
        });

        // console.log(response.data);

        setBasket(response.data as InterfaceBasket[]);
        const basketId: string[] = response.data.map(
          (item: InterfaceBasket) => `${item.id}`,
        );
        form.setValue(
          "basketId",
          basketId,
          // response.data.map((item) => `${item.id}`),
        );
      } catch (error) {
        console.error(error);
      }
    };
    void getBasket();

    // if (basketData) {
    //   setBasket(JSON.parse(basketData));
    // }
  }, []);

  const makeOrder = async () => {
    const valueForm = form.getValues();

    console.log({
      valueForm,
    });

    // return;
    try {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");

      toast.promise(
        await axios.post(
          `http://localhost:8003/checkout/${email}`,
          {
            basketId: valueForm.basketId,
            firstname: valueForm.firstname,
            lastname: valueForm.lastname,
            phone: valueForm.phone,
            emailInfo: valueForm.emailInfo,
            address: valueForm.address,
            district: valueForm.district,
            paymentType: valueForm.paymentType,
            postalCode: valueForm.postalCode,
            province: valueForm.province,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
        {
          loading: "Checkout...",
          success: (res) => {
            console.log({
              res,
            });
            // console.log(res.data)
            // setBasket(res.data as InterfaceBasket[])
            return "Order successfully";
          },
          error: (err) => {
            console.log(err);
            return "Order failed";
          },
        },
      );
      // console.log({
      //   response,
      // });

      // console.log(response.data);

      // setBasket(response.data as InterfaceBasket[]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar
        callback={(data) => {
          console.log(data);
          setCredit(data.credits);
        }}
      />
      <div className="flex">
        <div className="ml-10 w-[50%]">
          <h1 className="pt-5 text-3xl">Checkout</h1>
          <p className="pt-10">Personal Information:</p>
          <div className="flex pt-5">
            <div className="grid w-full max-w-sm items-center gap-1.5 pr-5">
              <Label htmlFor="firstname" className="text-[#858585]">
                First name
              </Label>
              <Input
                type="firstname"
                id="firstname"
                value={form.watch("firstname")}
                onChange={(e) => form.setValue("firstname", e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pl-5">
              <Label htmlFor="lname" className="text-[#858585]">
                Last name
              </Label>
              <Input
                type="lname"
                id="lastname"
                value={form.watch("lastname")}
                onChange={(e) => form.setValue("lastname", e.target.value)}
              />
            </div>
          </div>
          <div className="flex pt-5">
            <div className="grid w-full max-w-sm items-center gap-1.5 pr-5">
              <Label htmlFor="phone" className="text-[#858585]">
                Phone
              </Label>
              <Input
                type="phone"
                id="phone"
                value={form.watch("phone")}
                onChange={(e) => form.setValue("phone", e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pl-5">
              <Label htmlFor="email" className="text-[#858585]">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={form.watch("emailInfo")}
                onChange={(e) => form.setValue("emailInfo", e.target.value)}
              />
            </div>
          </div>
          <h1 className="pt-10 text-3xl">Delivery details:</h1>
          <div className="pt-5">
            <Label htmlFor="address" className="text-[#858585]">
              Address
            </Label>
            <Input
              type="address"
              id="address"
              value={form.watch("address")}
              onChange={(e) => form.setValue("address", e.target.value)}
            />
          </div>

          <div className="flex pt-5">
            <div className="grid w-full max-w-sm items-center gap-1.5 pr-5">
              <Label htmlFor="province" className="text-[#858585]">
                Province
              </Label>
              <Input
                type="province"
                id="province"
                value={form.watch("province")}
                onChange={(e) => form.setValue("province", e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 pl-5">
              <Label htmlFor="district" className="text-[#858585]">
                District
              </Label>
              <Input
                type="district"
                id="district"
                value={form.watch("district")}
                onChange={(e) => form.setValue("district", e.target.value)}
              />
            </div>
          </div>
          <div className="w-[40%] pt-5">
            <Label htmlFor="postcode" className="text-[#858585]">
              Post code
            </Label>
            <Input
              type="postcode"
              id="postcode"
              value={form.watch("postalCode")}
              onChange={(e) => form.setValue("postalCode", e.target.value)}
            />
          </div>

          <p className="pt-5">Payment:</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="credit"
                value={PaymentType.CREDIT as PaymentType}
                onCheckedChange={(checked) => {
                  // console.log(checked);
                  form.setValue(
                    "paymentType",
                    checked ? PaymentType.CREDIT : PaymentType.CASH,
                  );
                }}
                checked={
                  form.watch("paymentType") === PaymentType.CREDIT
                    ? true
                    : false
                }
              />
              <label
                htmlFor="credit"
                className="text-xm pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Credits
              </label>
              <CircleDollarSign />
            </div>
            <Button className="mt-5 h-10 w-60 justify-center bg-[#5A934C] text-white">
              Balance : {credit}$
            </Button>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="cash"
              value={PaymentType.CASH as PaymentType}
              onCheckedChange={(checked) => {
                // console.log(checked);
                form.setValue(
                  "paymentType",
                  checked ? PaymentType.CASH : PaymentType.CREDIT,
                );
              }}
              checked={
                form.watch("paymentType") === PaymentType.CASH ? true : false
              }
            />
            <label
              htmlFor="cash"
              className="text-xm pl-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Cash on delivery
            </label>
            <HandCoins />
          </div>
        </div>
        <div className="ml-auto w-[35%] pt-5">
          <h1 className="text-2xl">Your order:</h1>
          <div>
            <div className="flex justify-between pt-5">
              <p>Subtotal:</p>
              <p className="mr-10">
                ${" "}
                {basket
                  .reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0,
                  )
                  .toFixed(2)}
                {/* {basket.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0,
                )} */}
              </p>
            </div>
            <div className="flex justify-between border-b pb-3 pt-1">
              <p>Delivery:</p>
              <p className="mr-10">$ 15</p>
            </div>
          </div>
          <div className="flex justify-between pt-3">
            <h1>Total:</h1>
            <h1 className="mr-10">
              $
              {(
                basket.reduce(
                  (acc, item) => acc + item.product.price * item.quantity,
                  0,
                ) + 15
              ).toFixed(2)}
            </h1>
          </div>
          <Button
            onClick={makeOrder}
            className="mt-5 h-10 w-[90%] justify-center bg-[#5A934C] pr-3 text-white"
          >
            Purchase
          </Button>
          {basket.map((item) => (
            <OrderItem
              key={item.id}
              callback={(id, quantity) => {
                console.log(id, quantity);
              }}
              {...item}
              // id={item.id}
              // name={item.product.name}
              // description={item.product.description}
              // price={item.price}
              // quantity={item.quantity}
              // filePath={item.product.filePath}
            />
          ))}
          {/* <Order />
          <Order />
          <Order />
          <Order />
          <Order />
          <Order />
          <Order /> */}
        </div>
      </div>
    </>
  );
}
