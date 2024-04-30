import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function OrderHome() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:8003/orders")
      .then((response) => {
        console.log({
          response,
        });
        // })
        // setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return <div>OrderHome</div>;
}
