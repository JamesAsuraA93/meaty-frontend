// import Navbar from "@/components/common/Navbar";
import Navbar from "@/components/layout/Navbar";
import Provider from "@/components/layout/Provider";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PATH_ENDPOINTS } from "@/config/apiEndpoint";
import { PATH_WEBSITE } from "@/config/pathWebsites";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

export default function LoginAuth() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    // values: {
    //   email: "",
    //   password: "",
    // },
  });

  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    try {
      const response = toast.promise(
        axios.post(PATH_ENDPOINTS.LOGIN, {
          email: values.email,
          password: values.password,
        }),
        {
          loading: "Loading...",
          success: (res) => {
            console.log({
              res,
            });
            const token: string = res.data.access_token;
            localStorage.setItem("token", token);
            void router.push(PATH_WEBSITE.HOME);
            return "Login success";
          },
          error: (err) => {
            console.log({
              err,
            });
            return "Login failed";
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
      <Provider>
        <Navbar />
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
          <Typography typoType="h1">Login</Typography>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
              <Button type="submit" className="w-full">
                Login
              </Button>

              <FormDescription className="text-center">
                {`Don't have an account yet? `}
                <Link href="/auth/register" className="text-blue-500">
                  Sign up
                </Link>
                <br />
                or
                <br />
                <Link href="/auth/forgot-password" className="text-blue-500">
                  Forgot password?
                </Link>
              </FormDescription>
            </form>
          </Form>
        </div>
      </Provider>
    </>
  );
}
