import { HomeIcon, ChevronDownIcon } from "@heroicons/react/outline";

const SelectCountry = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  local
}) => {
  return (
    <div className="">
      <label className={`mb-2 tracking-tight text-end text-[13px] font-medium text-gray-600 flex ${local === "ar"?"justify-end":"justify-start"}`}>
        <span className={local === "ar"?"text-red-500 ":"text-red-500 hidden"}>*</span> {labelText || name}
      </label>
      <div className="mt-3.5 font-bold px-5 absolute">
        <ChevronDownIcon width={18} height={18} />
      </div>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="rounded-none text-end px-6  rounded-l-lg bg-gray-50 border text-gray-600 focus:ring-blue-500 appearance-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  "
      >
        {list?.map((itemValue, index) => {
          return (
            <option
              key={index}
              value={itemValue.name}
              className="font-medium"
            >
              {itemValue.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectCountry;
