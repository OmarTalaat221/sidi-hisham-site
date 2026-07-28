import GoogleMapReact from "google-map-react";

function Marker({ name }) {
  return (
    <div className="group relative -translate-x-1/2 -translate-y-full">
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white bg-primary text-white shadow-lg">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M12 21s6-5.35 6-11a6 6 0 10-12 0c0 5.65 6 11 6 11z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="12" cy="10" r="2.2" fill="currentColor" />
        </svg>
      </span>

      {name && (
        <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white group-hover:block">
          {name}
        </span>
      )}
    </div>
  );
}

export default function SimpleMap({
  lat,
  lng,
  name,
  zoom,
  loading = false,
  language = "en",
}) {
  if (loading) {
    return (
      <div className="flex h-[420px] items-center justify-center bg-slate-50 sm:h-[500px] lg:h-[590px]">
        <span className="h-9 w-9 animate-spin rounded-full border-4 border-primary/15 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="h-[420px] w-full overflow-hidden sm:h-[500px] lg:h-[590px]">
      <GoogleMapReact
        key={`${lat}-${lng}-${language}`}
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          language,
        }}
        center={{
          lat,
          lng,
        }}
        zoom={zoom}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          gestureHandling: "cooperative",
        }}
      >
        <Marker lat={lat} lng={lng} name={name} />
      </GoogleMapReact>
    </div>
  );
}
