import React, { useEffect, useState } from "react";
import Locations from "../../components/contactus/leftside/Locations";
import BreadCrumb from "../../components/contactus/BreadCrumb";
import Button from "../../components/contactus/leftside/Button";
import ShareCard from "../../components/contactus/leftside/ShareCard";
import InfoCard from "../../components/contactus/rightside/InfoCard";
import {
  HomeIcon,
  ClockIcon,
  PhoneIcon,
  ChatB,
} from "@heroicons/react/outline";
import { TruckIcon } from "@heroicons/react/solid";
import SEO from '@/components/SEO';
import { Whatssap } from "../../public/whatsapp.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import MapPicker from "react-google-map-picker";
import SimpleMap from "../../components/contactus/rightside/MapPicker";
import { setBranchId } from "../../redux/branchSlice";

export default function ContactUs() {
  const [branches, setBranches] = useState([]);
  const [branche, setBranche] = useState("");
  const [zoom, setZoom] = useState(5);
  const [location, setLocation] = useState({
    lat: 28,
    lng: 46,
  });

  const router = useRouter();

  const dispatch = useDispatch();

  const { branchID } = useSelector((state) => state.branch);

  //Get clicked branch id from redux and Get Branch Data by this id

  const getBranches = async (e) => {
    await axios
      .get("https://api.sedihisham.com/branches/getallbranches")
      .then((response) => {
        setBranches(response.data);
        // console.log("Branches " + JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getBranchData = async (e) => {
    await axios
      .get("https://api.sedihisham.com/branches/" + branchID)
      .then((response) => {
        setBranche(response.data);
        setLocation(JSON.parse(response.data.Location));
        // console.log("Branche " + JSON.parse(response.data.Location));
      })
      .catch((error) => {
        console.log(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      });
  };

  useEffect(() => {
    getBranchData();
  }, [branchID]);
  useEffect(() => {
    getBranches();
    getBranchData();
  }, [branchID]);

  const { local } = useSelector((state) => state.language);
  return (
    <div>
      <SEO 
        title="سيدي هشام - شركة العقاد للصناعة والتجارة"
        description="شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة"
        keywords="سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة"
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />
      <div className="  md:w-[80%] mt-20 md:mx-[10%]">
        <div
          className={
            local === "ar"
              ? "flex my-6 justify-end items-end"
              : "flex my-6 justify-start items-start"
          }
        >
          <BreadCrumb local={local} />
        </div>
        <div className="flex flex-col md:flex-row ">
          <div className="md:flex-[22%]">
            <Locations local={local} locations={branches} setZoom={setZoom} />
            <div className="w-[80%]  ml-[10%] my-1">
              <Button
                onClick={() => router.push("/contact")}
                text={local === "ar" ? "تراسل معنا" : "Contact us"}
                bgColor="[#007530]"
              />
            </div>
            <ShareCard local={local} />
          </div>

          <div className="md:flex-[78%] flex-col  px-3">
            <p
              className={
                local === "ar"
                  ? "text-end text-[20px] mt-4 md:mt-0 tracking-wide font-arabicBold text-medium text-green-700"
                  : "text-start text-[20px] mt-4 md:mt-0 tracking-wide font-arabicBold text-medium text-green-700"
              }
            >
              {branche.name}
            </p>
            <p
              className={
                local === "ar"
                  ? "text-end font-arabicMedium text-sm tracking-tight mb-6 opacity-80"
                  : "text-start font-arabicMedium text-sm tracking-tight mb-6 opacity-80"
              }
            >
              {branche?.description}
            </p>
            <div className="flex justify-between w-full">
              <div className="flex-[25%] w-full">
                <InfoCard
                  Icon={ClockIcon}
                  title="Opening Times "
                  desc={branche.openings_time}
                />
              </div>
              <div className="flex-[25%] w-full flex justify-end">
                <InfoCard
                  Icon={PhoneIcon}
                  title="Telephone"
                  desc={branche.phone_number}
                />
              </div>

              <div className="flex-[25%] flex justify-end">
                <InfoCard Icon={WhatsappIcon} title="Fax" desc={branche.fax} />
              </div>
              <div className="flex-[25%] flex justify-end">
                <InfoCard
                  Icon={TruckIcon}
                  title="delivery_time"
                  desc={branche.delivery_time}
                />
              </div>
            </div>

            <SimpleMap
              name={branche.name}
              lat={location.lat}
              lng={location.lng}
              zoom={zoom}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const WhatsappIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 28.713 28.851"
    >
      <path
        id="whatsapp"
        d="M24.78,4.193a14.3,14.3,0,0,0-22.5,17.25L.25,28.851l7.579-1.988a14.281,14.281,0,0,0,6.832,1.74h.006A14.3,14.3,0,0,0,24.78,4.193Zm-10.113,22h0a11.868,11.868,0,0,1-6.048-1.656l-.434-.258-4.5,1.18,1.2-4.385L4.6,20.62a11.883,11.883,0,1,1,10.066,5.569Zm6.518-8.9c-.357-.179-2.113-1.043-2.441-1.162s-.566-.179-.8.179-.923,1.162-1.131,1.4-.417.268-.774.089a9.757,9.757,0,0,1-2.873-1.773,10.775,10.775,0,0,1-1.987-2.474c-.208-.358,0-.533.157-.729a10.1,10.1,0,0,0,.893-1.222.657.657,0,0,0-.03-.626c-.089-.179-.8-1.937-1.1-2.653-.29-.7-.584-.6-.8-.613s-.446-.013-.685-.013a1.312,1.312,0,0,0-.953.447,4.007,4.007,0,0,0-1.25,2.98,6.949,6.949,0,0,0,1.459,3.7,15.923,15.923,0,0,0,6.1,5.394A20.446,20.446,0,0,0,17,20.962a4.9,4.9,0,0,0,2.25.142,3.68,3.68,0,0,0,2.411-1.7,2.985,2.985,0,0,0,.208-1.7c-.089-.149-.327-.238-.684-.417Zm0,0"
        transform="translate(-0.25)"
        fill="#007530"
        fillRule="evenodd"
      />
    </svg>
  );
};
