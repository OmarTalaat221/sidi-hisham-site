import Link from "next/link";

export default function Breadcrumb({ show, local, currentPage }) {
  const breadcrumbItems = local === "ar" 
    ? {
        home: "الرئيسية",
        kitchen: "المطبخ",
        products: "المنتجات",
        recipes: "الطبخات",
        cookDetails: "تفاصيل الطبخة",
        categories: "الفئات"
      }
    : {
        home: "Home",
        kitchen: "Kitchen",
        products: "Products",
        recipes: "Recipes",
        cookDetails: "Cook Details",
        categories: "Categories"
      };

  const isRTL = local === "ar";
  const separator = isRTL ? "\\" : "/";

  const renderBreadcrumbItem = (href, text, isActive = false, isLast = false) => (
    <li key={href} className="flex gap-1 items-center">
      {!isLast && (
        <span className={`text-gray-400 mx-1`}>
          { " " + separator + " "}
        </span>
      )}
      {isActive ? (
        <span className={`text-sm font-medium mx-1 ${isLast ? 'text-red-600' : 'text-gray-500'}`}>
          {" " + text + " "}
        </span>
      ) : (
        <Link
          href={href}
          className={`text-sm font-medium hover:text-red-600 transition-colors duration-200 ${
            isLast ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
          }`}
        >
          {" " + text + " "}
        </Link>
      )}
    </li>
  );

  const getBreadcrumbPath = () => {
    if (local === "ar") {
      return [
        { href: "/", text: breadcrumbItems.home },
        { href: "/ketchen", text: breadcrumbItems.kitchen },
        ...(show 
          ? [
              { href: "/ketchen", text: breadcrumbItems.recipes },
              { href: "#", text: breadcrumbItems.cookDetails, isActive: true }
            ]
          : [
              { href: "/categories", text: breadcrumbItems.products }
            ]
        )
      ];
    } else {
      return [
        { href: "/", text: breadcrumbItems.home },
        { href: "/ketchen", text: breadcrumbItems.kitchen },
        ...(show 
          ? [
              { href: "/ketchen/recipes/", text: breadcrumbItems.recipes },
              { href: "#", text: breadcrumbItems.cookDetails, isActive: true }
            ]
          : [
              { href: "/categories", text: breadcrumbItems.products }
            ]
        )
      ];
    }
  };

  const breadcrumbPath = getBreadcrumbPath();

  return (
    <nav 
      className="w-full py-4 px-4 md:px-6 lg:px-8" 
      aria-label="Breadcrumb"
      // dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        <ol className={`flex items-center flex-wrap ${
          isRTL 
            ? 'flex-row-reverse' 
            : ''
        }`}>
          {breadcrumbPath.map((item, index) => 
            renderBreadcrumbItem(
              item.href, 
              item.text, 
              item.isActive, 
              index === breadcrumbPath.length - 1
            )
          )}
        </ol>
      </div>
    </nav>
  );
}
