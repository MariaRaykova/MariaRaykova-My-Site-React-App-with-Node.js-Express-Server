import { useState, useEffect } from "react";
import {} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import { getProducts } from "../../../utils/getProductService";
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
        {productsMain?.map((p) => (
          <SwiperSlide
            key={p._id}
            style={{
              backgroundImage: `url(${p.image}/600/300)`,
              backgroundSize: "cover"
            }}
          >
            {" "}
          </SwiperSlide>
        ))}
        {/* <SwiperSlide key={p._id}>
            <img src={`${p.image}/800/300`} alt="swipe" />
          </SwiperSlide> */}
      </Swiper>
    </div>
  );
}
