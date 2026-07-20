import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
// import StatusSelector from "../components/StatusSelector";

const data = [
  {
    id: <div className="text-[14px] text-[#0388CC]">001</div>,
    phone: (
      <div className="text-[14px] font-[700] underline text-[#0F3F62]">
        090101010
      </div>
    ),
    email: (
      <div className="text-[14px] underline text-[#0388CC]">
        kenan@big-bang.ae
      </div>
    ),
    products: 3,
    adress: "maroc",
    time: "18:16:03",
    date: "01/01/01",
    total: <div className="text-[14px] font-[777] text-[#000]">999</div>,
    status: <div>HHHHHH</div>,
    view: (
      <div className="text-[14px] bg-[#0388CC] cursor-pointer rounded w-fit px-3 py-[2px] text-[white] text-center">
        <Link href="/orders/orderDetails">
          <FontAwesomeIcon icon={faEye} />
        </Link>
      </div>
    ),
  },
];

export default data;
