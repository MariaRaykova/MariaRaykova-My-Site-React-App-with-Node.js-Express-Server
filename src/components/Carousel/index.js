import { useState, useEffect } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { getProductService } from "../../utils/getProductService";
const ImagesGallery = (imageUrl) => {
  const [images, setImages] = useState(null);

  // useEffect(() => {
  //   let shouldCancel = false;

  //   const call = async () => {
  //     const response = await getProductService(id);
  //     if (!shouldCancel && response && response.imageUrl.length > 0) {
  //       console.log("ot carusel" + response);
  //       setImages(
  //         response.imageUrl.map((url) => ({
  //           original: `${url}=w1024`,
  //           thumbnail: `${url}=w100`
  //         }))
  //       );
  //     }
  //   };
  //   call();
  //   return () => (shouldCancel = true);
  // }, []);

  return images ? <ImageGallery items={images} /> : null;
};

export default ImagesGallery;
