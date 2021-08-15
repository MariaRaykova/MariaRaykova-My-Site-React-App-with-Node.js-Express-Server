import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import { getProducts } from "../../../utils/getData";
// import "./index.scss";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

export default function SwiperCoverflow() {
  const [productsMain, setProductsMain] = useState([]);
  useEffect(() => {
    getProducts().then((res) => {
      setProductsMain(res);
    });
  }, []);

  return (
    <div className="my-container">
      <Swiper
        pagination
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        slidesPerView={2}
        centeredSlides
        loop
        style={{ height: "500px", width: "1200px" }}
        //на целия контейнер
      >
        {/* <SwiperSlide
          style={{
            backgroundImage: "url(http://lorempixel.com/600/600/nature/1)"
          }}
        >
          Slide 1
        </SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage: "url(http://lorempixel.com/600/600/nature/2)"
          }}
        >
          Slide 2
        </SwiperSlide>
        <SwiperSlide
          style={{
            backgroundImage: "url(http://lorempixel.com/600/600/nature/3)"
          }}
        >
          Slide 3
        </SwiperSlide> */}

        {productsMain?.map((p) => (
          // <SwiperSlide key={p._id}>
          //   <img src={`${p.imageUrl}/100/300`} alt="swipe" />
          // </SwiperSlide>

           <SwiperSlide key={p._id}
          style={{
            backgroundImage: `url(${p.imageUrl})`,
            backgroundSize: "cover"
          }}
        >
          Slide
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
