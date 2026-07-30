import OptimizedImage from "@/components/common/OptimizedImage";
import Link from "next/link";

export default function SocialMediaIcon({ src, href, label = "Social media" }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#7C1422]"
    >
      <span className="absolute inset-1 rounded-full border border-white/8 transition-all duration-300 group-hover:border-white/16" />

      <span className="relative h-[18px] w-[18px] brightness-0 invert transition-transform duration-300 group-hover:scale-105">
        <OptimizedImage
          src={src}
          fill={true}
          alt={label}
          className="!h-full !w-full object-contain"
        />
      </span>
    </Link>
  );
}
