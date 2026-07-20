import OptimizedImage from "@/components/common/OptimizedImage";
import Link from "next/link";

export default function SocialMediaIcon({ src, href }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-300 hover:border-primary hover:bg-primary"
    >
      <div className="relative h-[18px] w-[18px] transition-all duration-300 group-hover:brightness-0 group-hover:invert">
        <OptimizedImage
          src={src}
          fill={true}
          alt="Social Icon"
          className="!h-full !w-full object-contain"
        />
      </div>
    </Link>
  );
}
