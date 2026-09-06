import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useDwellTracking } from "../analytics/useDwellTracking.js";

export default function GalleryCategory({ gallery, delay }) {
  const ref = useDwellTracking(gallery.label);

  return (
    <div id={gallery.cls} className="gallery-anchor" ref={ref}>
      <div className="gallery-swiper-frame">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{ delay, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="gallery-swiper"
        >
          {gallery.items.map((item, j) => (
            <SwiperSlide key={j}>
              <div className="img-box">
                <img src={item.src} alt={item.label} />
                <time className="publish-date label-2" dateTime="2025">
                  {item.label}
                </time>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
