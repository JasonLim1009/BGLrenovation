import { useEffect, useRef, useState } from "react";

/**
 * slides: [{ img, subtitleClass, subtitle, title, text }]
 */
export default function HeroSlider({ slides }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const slideNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const slidePrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  return (
    <section className="hero text-center" aria-label="home" id="home">
      <ul className="hero-slider">
        {slides.map((slide, i) => (
          <li className={`slider-item${i === current ? " active" : ""}`} key={i}>
            <div className="slider-bg">
              <img src={slide.img} width="1880" height="950" alt="" className="img-cover" />
            </div>

            <p className={`${slide.subtitleClass || "label-2"} section-subtitle slider-reveal`}>
              {slide.subtitle}
            </p>

            <h1 className="display-1 hero-title slider-reveal">{slide.title}</h1>

            <p className="body-2 hero-text slider-reveal">{slide.text}</p>
          </li>
        ))}
      </ul>

      <button
        className="slider-btn prev"
        aria-label="slide to previous"
        onClick={slidePrev}
        onMouseOver={() => clearInterval(intervalRef.current)}
        onMouseOut={startAutoSlide}
      >
        <ion-icon name="chevron-back"></ion-icon>
      </button>

      <button
        className="slider-btn next"
        aria-label="slide to next"
        onClick={slideNext}
        onMouseOver={() => clearInterval(intervalRef.current)}
        onMouseOut={startAutoSlide}
      >
        <ion-icon name="chevron-forward"></ion-icon>
      </button>

      <a href="https://wa.me/60106668311" className="hero-btn has-after">
        <img src="/assets/images/ecoearth.png" width="48" height="48" alt="booking icon" />
        <span className="label-2 text-center span">Book A Time</span>
      </a>
    </section>
  );
}
