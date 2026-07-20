// import React from "react";
// import { _IMAGES } from "../data/data";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import logo from "../../public/images/logo.png";
import OptimizedImage from "@/components/common/OptimizedImage";
import errImg from "../../public/images/eim.png"

// const _IMAGES = [
//   {
//     original: "https://sedihisham.com/images/newsImg.png",
//     thumbnail: "https://sedihisham.com/images/newsImg.png",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original:
//       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX/AAD/////u7v/6+v/0ND/aWn/mZn/zc3/9fX/h4f/5ub/+Pj/tbX/t7f/oKD/ODj/Kir/3d3/wMD/MzP/UVH/1dX/yMj/qan/lJT/TU3/gID/Fxf/PT3/eHj/Dg7/jY3/ZWX/Q0P/XV3/IiL/cXH/q6v/X1//eXnZjuaVAAAE20lEQVR4nO2d63aiQAyAOyKgXAVF0Lbrtbvv/4YLZ9didUDQQEjI9689RyffwcCQub0p7rxhB9A5YkgfMaSPGNJHDOkjhvQRQ/qIIX3EkD5iSB8xpI8Y0kcM6SOG9BFD+oghfcSQPmJIHzGkjxi+jHEhml4Tff+/6wBeMXTdWU6SrD0/DQIry3Z709yEYbh4e45F/tmNae53WWYFQep76yQpmnDd3gxdw4mi2LPm27O5OZzenzRpy/vpsDHP27nlxVHkGO18Gxo6dmx9HjfLvpzqeF9ujp9WbDtQhnZqPvur65qFmdovGjrBCtviIaug/mLWGdp77Ogbsq+7ktWG0fAvX8kqam+4xQ66JduWhk6IHXFrwop01BuuscN9inVzQw871ifxmhr62JE+jd/MMMGO8wWSJoYudpQvcd9nvTc8Ygf5EsfHhlTvMhfu7ja3hu4JO8QXOd3+Tm8NA+wIXyZ4YIgdHwD1htSzsMCrNTxghwfAoc7QwI4OBKPGcIIdHAiTGsMzdnAgnGsMP7CDA+Gj2tDBjg0Ip9LQxg4NCLvS0MIODQir0vATOzQgPisNedxobm4114Yz7MjAmFUY8ujRFBgVhjRriDrWFYYpdmBgpBWGXB4WPx8X14Y8eqUF5wrDJXZgYCwrDLHjAmSshnwehz8eiFeGlMcrbkm0hjF0M4hTOGKtIfig2iRGm37jaw3Ba6UTpTLo72yIpzWcQzdT1LwMnG7EXGtoQjfzr6qXbKC/twGm1hB84PBSt4x/QX/zQ45aQ/A3/LIy23uf/kNrCH5zv6o9Gz2XgBa9GyoV9ZqOWsMZeLb8HD9QcY/Dy79mGIZ9pqPWMAJv5s5QGb3NB4yQDPub06kznIK3ojPM07GXDvkU0VCpoIcegM4QfuCpylDNwLvAd5TDTyiGSjldp6POEL7iXWOYN9dtZa+sepeGX+Ct1BoqlXaZjl8aQ/ia/gPDTtOxrOtjGubp2NlUT53hDryVx4Z5OnY0KrvTGML/ZJoY5vnfSTqWZQx8w27ScVCGeTr+Bm9bZwjf7W9smKcj9KTIcpFQaQheamtjqJQHm45lsW0whsBpMkhDZezh2h6mYf4GB5aOQzVUygcazBmuoVIwd5zhGnK/htzzkP29lPvzsIc+Da9+6R+NIf93C3k/bM/Q3vH512n419r410v517z5j1vwH3viP37IfwyY/zg+/7kY/OfT8J8TxX9eG/+5iSOYX8p/jjD/ed785+rzX2/Bf80M/3VP/Neu8V9/yH8NKf91wCMw5L8en/+eCvz3xeC/twn//Wn4PBCr9hjiv08U/72+RrBfG5fHRfWee/z3TeS/9yWTW03N/qVMeqZ1e9Dy30eYR6+mbi9o/vt5s9iT3a815FDJuDW6+Zv/2Qj8z7cgn4kPzygZwTkzIzgriPT4RaPznij33XSzsHSGZO82jc9do1pXbHF23gjOP1T8z7BUIziHVPE/S7aA+3nA/68k6zOdy4vJ+Vzuaxifra73dYvD65Nk7flpEFhZttub5ioMw2d/1Yv8syvT3O+yzAqC1PfsJCmacNs5wRk2wrgQTa+Jvv/fdQCdG6IjhvQRQ/qIIX3EkD5iSB8xpI8Y0kcM6SOG9BFD+oghfcSQPmJIHzGkjxjSRwzpI4b0EUP6iCF9/gKCNIdvAhrz/wAAAABJRU5ErkJggg==",
//     thumbnail:
//       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX/AAD/////u7v/6+v/0ND/aWn/mZn/zc3/9fX/h4f/5ub/+Pj/tbX/t7f/oKD/ODj/Kir/3d3/wMD/MzP/UVH/1dX/yMj/qan/lJT/TU3/gID/Fxf/PT3/eHj/Dg7/jY3/ZWX/Q0P/XV3/IiL/cXH/q6v/X1//eXnZjuaVAAAE20lEQVR4nO2d63aiQAyAOyKgXAVF0Lbrtbvv/4YLZ9didUDQQEjI9689RyffwcCQub0p7rxhB9A5YkgfMaSPGNJHDOkjhvQRQ/qIIX3EkD5iSB8xpI8Y0kcM6SOG9BFD+oghfcSQPmJIHzGkjxi+jHEhml4Tff+/6wBeMXTdWU6SrD0/DQIry3Z709yEYbh4e45F/tmNae53WWYFQep76yQpmnDd3gxdw4mi2LPm27O5OZzenzRpy/vpsDHP27nlxVHkGO18Gxo6dmx9HjfLvpzqeF9ujp9WbDtQhnZqPvur65qFmdovGjrBCtviIaug/mLWGdp77Ogbsq+7ktWG0fAvX8kqam+4xQ66JduWhk6IHXFrwop01BuuscN9inVzQw871ifxmhr62JE+jd/MMMGO8wWSJoYudpQvcd9nvTc8Ygf5EsfHhlTvMhfu7ja3hu4JO8QXOd3+Tm8NA+wIXyZ4YIgdHwD1htSzsMCrNTxghwfAoc7QwI4OBKPGcIIdHAiTGsMzdnAgnGsMP7CDA+Gj2tDBjg0Ip9LQxg4NCLvS0MIODQir0vATOzQgPisNedxobm4114Yz7MjAmFUY8ujRFBgVhjRriDrWFYYpdmBgpBWGXB4WPx8X14Y8eqUF5wrDJXZgYCwrDLHjAmSshnwehz8eiFeGlMcrbkm0hjF0M4hTOGKtIfig2iRGm37jaw3Ba6UTpTLo72yIpzWcQzdT1LwMnG7EXGtoQjfzr6qXbKC/twGm1hB84PBSt4x/QX/zQ45aQ/A3/LIy23uf/kNrCH5zv6o9Gz2XgBa9GyoV9ZqOWsMZeLb8HD9QcY/Dy79mGIZ9pqPWMAJv5s5QGb3NB4yQDPub06kznIK3ojPM07GXDvkU0VCpoIcegM4QfuCpylDNwLvAd5TDTyiGSjldp6POEL7iXWOYN9dtZa+sepeGX+Ct1BoqlXaZjl8aQ/ia/gPDTtOxrOtjGubp2NlUT53hDryVx4Z5OnY0KrvTGML/ZJoY5vnfSTqWZQx8w27ScVCGeTr+Bm9bZwjf7W9smKcj9KTIcpFQaQheamtjqJQHm45lsW0whsBpMkhDZezh2h6mYf4GB5aOQzVUygcazBmuoVIwd5zhGnK/htzzkP29lPvzsIc+Da9+6R+NIf93C3k/bM/Q3vH512n419r410v517z5j1vwH3viP37IfwyY/zg+/7kY/OfT8J8TxX9eG/+5iSOYX8p/jjD/ed785+rzX2/Bf80M/3VP/Neu8V9/yH8NKf91wCMw5L8en/+eCvz3xeC/twn//Wn4PBCr9hjiv08U/72+RrBfG5fHRfWee/z3TeS/9yWTW03N/qVMeqZ1e9Dy30eYR6+mbi9o/vt5s9iT3a815FDJuDW6+Zv/2Qj8z7cgn4kPzygZwTkzIzgriPT4RaPznij33XSzsHSGZO82jc9do1pXbHF23gjOP1T8z7BUIziHVPE/S7aA+3nA/68k6zOdy4vJ+Vzuaxifra73dYvD65Nk7flpEFhZttub5ioMw2d/1Yv8syvT3O+yzAqC1PfsJCmacNs5wRk2wrgQTa+Jvv/fdQCdG6IjhvQRQ/qIIX3EkD5iSB8xpI8Y0kcM6SOG9BFD+oghfcSQPmJIHzGkjxjSRwzpI4b0EUP6iCF9/gKCNIdvAhrz/wAAAABJRU5ErkJggg==",
//   },
//   {
//     original:
//       "data:image/png;base64,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",
//     thumbnail:
//       "data:image/png;base64,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",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
// ];

import React from "react";

export default function ReactImageGalleryTest({ images }) {
  return (
    <div>
      <div className="w-[100%]">
        {images.length === 0 ? (
          <div>This product has no images</div>
        ) : (
          <ImageGallery
            // autoPlay={false}
            // originalHeight={20}
            showFullscreenButton={false}
            showPlayButton={false}
            onErrorImageURL={`${"/images/eim.png"}`}
            // lazyLoad={true}
            showThumbnails={true}
            thumbnailPosition={"left"}
            items={images}
            disableSwipe={false}
            disableThumbnailSwipe={true}
            // disableThumbnailScroll={false}
          />
        )}
      </div>
    </div>
  );
}
