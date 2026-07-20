import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import parse from 'html-react-parser';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  const { local } = useSelector((state) => state.language);
  let [categoriesB] = useState({
    "Privacy policy": [
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
      },
    ],
    "General terms": [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
      },
    ],
    "financial terms": [
      {
        id: 3,
        title: "Is tech making coffee better or worse?",
      },
    ],
  });
  let [categories] = useState({
    "سياسة الخصوصية": [
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
      },
    ],
    "شروط عامة": [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
      },
    ],
    "الشروط المالية": [
      {
        id: 3,
        title: "Is tech making coffee better or worse?",
      },
    ],
  });
  // Get privacy policy data
  const [general, setGeneral] = useState("");
  const [financial, setFinancial] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState([]);
  const getPrivacyPolicyData = async () => {
    await axios
      .get("https://api.sedihisham.com/pages/getall/privacy_policy")
      .then((response) => {
        setPrivacyPolicy(response?.data);
        // console.log("Branches " + JSON.stringify(response?.data));
      })
      .catch((error) => {
        console.log("error");
      });
  };

  useEffect(() => {
    getPrivacyPolicyData();
  }, []);
  //   useEffect(()=>{
  // getPrivacyPolicyData()
  //   },[privacyPolicy])

  if (privacyPolicy?.length === 0) {
    getPrivacyPolicyData();
  }

  return (
    <div className="md:w-[80%] z-60 mt-10   md:mx-[10%] px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex mt-10 -mb-10 space-x-5 w-full  rounded-xl justify-center items-center p-2">
          {Object.keys(local === "ar" ? categories : categoriesB).map(
            (category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5  text-sm font-arabicLight leading-5 ",
                    selected ? "bg-[#D40017] text-white " : "  text-black"
                  )
                }
              >
                {category}
              </Tab>
            )
          )}
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2"
            )}
          >
            <h3
              className={
                local === "ar"
                  ? "text-sm text-black font-medium leading-5 text-end"
                  : "text-sm text-black font-medium leading-5 text-start"
              }
            >
              {privacyPolicy?.length !== 0
                ? local === "ar"
                  ? parse(
                      privacyPolicy?.find(
                        (item) => item.field_name === "general"
                      )?.description_ar
                    )
                  : parse(
                      privacyPolicy?.find(
                        (item) => item.field_name === "general"
                      )?.description_en
                    )
                : ""}
            </h3>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2"
            )}
          >
            <h3
              className={
                local === "ar"
                  ? "text-sm text-black font-medium leading-5 text-end"
                  : "text-sm text-black font-medium leading-5 text-start"
              }
            >
              {privacyPolicy?.length !== 0
                ? local === "ar"
                  ? parse(
                      privacyPolicy?.find(
                        (item) => item.field_name === "financial"
                      )?.description_ar
                    )
                  : parse(
                      privacyPolicy?.find(
                        (item) => item.field_name === "financial"
                      )?.description_en
                    )
                : ""}
            </h3>
          </Tab.Panel>
          <Tab.Panel
            // key={idx}
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2"
            )}
          >
            <h3
              className={
                local === "ar"
                  ? "text-sm text-black font-medium leading-5 text-end"
                  : "text-sm text-black font-medium leading-5 text-start"
              }
            >
              {privacyPolicy?.length !== 0 &&
              privacyPolicy?.find((item) => item.field_name === "privacy")
                ? local === "ar"
                  ? parse(
                      privacyPolicy?.find(
                        (item) => item.field_name === "privacy"
                      )?.description_ar
                    )
                  : parse(
                      privacyPolicy?.find(
                        (item) => item.field_name === "privacy"
                      )?.description_en
                    )
                : ""}
            </h3>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
