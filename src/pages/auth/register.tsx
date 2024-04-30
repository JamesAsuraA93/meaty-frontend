// import Navbar from "@/components/common/NavBar";
import Provider from "@/components/layout/Provider";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
// import { format } from "path";
import Navbar from "@/components/layout/Navbar";
import { format } from "date-fns";
import React from "react";
// import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PATH_ENDPOINTS } from "@/config/apiEndpoint";
import { PATH_WEBSITE } from "@/config/pathWebsites";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  birthdate: z.date(),
  password: z.string().min(8).max(50),
  confirmPassword: z.string().min(8).max(50),
});

export default function RegisterAuth() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      birthdate: new Date(),
      confirmPassword: "",
    },
    // values: {
    //   email: "",
    //   password: "",
    //   birthdate: new Date(),
    //   confirmPassword: "",
    // },
  });

  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);

    try {
      const response = toast.promise(
        axios.post(PATH_ENDPOINTS.REGISTER, {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
        {
          loading: "Loading...",
          success: (res) => {
            console.log({
              res,
            });
            const token: string = res.data.access_token;
            localStorage.setItem("token", token);
            void router.push(PATH_WEBSITE.LOGIN);
            return "Register success";
          },
          error: (err) => {
            console.log({
              err,
            });
            return "Register failed";
          },
        },
      );
      console.log({
        response,
      });
      // await axios.post(PATH_ENDPOINTS.LOGIN, {
      //   data: values,
      // });
      // console.log({
      //   response,
      // });
    } catch (error) {
      console.error(error);
    }
  }

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      {/* <Provider> */}
      <Navbar />
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
        <Typography typoType="h1">Create Account</Typography>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      // value={field.value}
                      // onChange={field.onChange}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center justify-center p-2"
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center justify-center p-2"
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2 w-full">
              <Button type="submit" className="w-full">
                Register
              </Button>

              <div className="text-center">
                {`Have an account ? `}
                <Link href="/auth/login" className="text-blue-500">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
      {/* </Provider> */}
    </>
  );
}
