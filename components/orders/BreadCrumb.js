import { Breadcrumbs } from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Breadcrumb({ visible }) {
  const router = useRouter();
  return (
    <div className="flex">
      <div
        onClick={() => router.push("/orders")}
        className="h-8 w-8 mt-1 -mr-2 justify-center items-center flex  text-blue-900 opacity-75"
      >
        <ArrowLeftIcon width={16} height={16} />
      </div>
      <Breadcrumbs>
        <Link
          href="/orders"
          className="opacity-60 text-[16px] tracking-wide text-blue-900 font-bold"
        >
          orders
        </Link>
        {visible ? (
          <Link
            href="/orders/orderDetails"
            className="opacity-60 text-blue-900 text-[16px] tracking-wide  font-normal"
          >
            Order Details
          </Link>
        ) : (
          <div></div>
        )}
      </Breadcrumbs>
    </div>
  );
}
