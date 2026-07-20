import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OrderSent from "../../../components/alert/OrderSent";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;

  const [order, setOrder] = useState();

  const fetchOrder = async () => {
    if (id === undefined) {
      const { id } = router.query;
    } else {
      await axios
        .get(`https://api.sedihisham.com/orders/findone/${id}`)
        .then((response) => {
          setOrder(response.data);
        });

      // console.log("order :"+JSON.stringify(response.data));
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div className="mt-24">
      <OrderSent points={order?.reward_points} id={id} />
    </div>
  );
}
