import { LocationMarkerIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { setBranchId } from "../../../redux/branchSlice";

export default function Locations({
  locations,
  local,
  setZoom,
  loading = false,
}) {
  const dispatch = useDispatch();

  const { branchID } = useSelector((state) => state.branch);

  const isAr = local === "ar";

  const activeBranchId = branchID || locations?.[0]?.id;

  const handleSelect = (branchId) => {
    dispatch(setBranchId(branchId));
    setZoom(16);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
        <div className="text-start">
          <h2 className="text-[17px] font-bold text-primary">
            {isAr ? "فروعنا" : "Our branches"}
          </h2>

          <p className="mt-1 text-[11px] leading-5 text-slate-400">
            {isAr
              ? "اختر الفرع لعرض بياناته"
              : "Choose a branch to view its details"}
          </p>
        </div>

        <span className="flex h-9 min-w-9 items-center justify-center rounded-full border border-primary/15 bg-primary/5 px-3 text-xs font-bold text-primary">
          {locations?.length || 0}
        </span>
      </div>

      <div className="branch-list max-h-[380px] overflow-y-auto p-2">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="mb-1 flex min-h-[56px] animate-pulse items-center gap-3 rounded-xl px-3"
              >
                <span className="h-9 w-9 rounded-lg bg-slate-100" />

                <span className="h-4 flex-1 rounded bg-slate-100" />
              </div>
            ))
          : locations?.map((branch) => {
              const active = String(activeBranchId) === String(branch.id);

              return (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => handleSelect(branch.id)}
                  aria-pressed={active}
                  className={`group mb-1 flex min-h-[56px] w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors duration-200 ${
                    active
                      ? "bg-primary text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 ${
                      active
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-slate-200 bg-white text-primary group-hover:border-primary/20"
                    }`}
                  >
                    <LocationMarkerIcon
                      className="h-[18px] w-[18px]"
                      strokeWidth={1.8}
                    />
                  </span>

                  <span className="min-w-0 flex-1 truncate pt-0.5 text-[14px] font-semibold">
                    {branch.name}
                  </span>

                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      active ? "bg-white" : "border border-slate-300"
                    }`}
                  />
                </button>
              );
            })}

        {!loading && locations?.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-slate-400">
            {isAr
              ? "لا توجد فروع متاحة حاليًا."
              : "No branches are currently available."}
          </p>
        )}
      </div>

      <style jsx global>{`
        .branch-list {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 116, 139, 0.35) transparent;
        }

        .branch-list::-webkit-scrollbar {
          width: 4px;
        }

        .branch-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .branch-list::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: rgba(100, 116, 139, 0.35);
        }
      `}</style>
    </section>
  );
}
