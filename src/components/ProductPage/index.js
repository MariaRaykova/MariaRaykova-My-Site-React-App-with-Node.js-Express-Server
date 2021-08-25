import "./index.scss";
import React, { useState, useEffect } from "react";
import { productActions } from "../../redux/action/productsActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import PageWrapper from "../PageWrapper";
import ImagesGallery from "../Carousel/";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const ProductPage = () => {
  //https://www.voidcanvas.com/10-best-react-carouselimage-slider-plugins-with-demo/
  //https://dev.to/davidepacilio/35-free-react-templates-and-themes-32ci
  //https://www.gatsbyjs.com/use-cases/e-commerce/www.danielwellington.com
  //https://reactjsexample.com/react-carousel-image-gallery-component-with-thumbnail-and-mobile-support/
  //https://stackoverflow.com/questions/50376891/react-js-thumbnail-gallery
  //https://www.freakyjolly.com/react-responsive-carousel-image-gallery-with-thumbnails-using-components/
  const match = useRouteMatch();
  const id = match.params.id; //или  const { id } = useParams();
  const [isActive, setActive] = useState(false);
  //Reducers - с useSelector вземаме стейта - не import-ваме нищо - state.productsReducer:
  //state от reducers - products(state = initialState ...,
  //productsReducer от rootReducer - const rootReducer = combineReducers({ productsReducer: prodReducer, ...
  //{product} от InitialState-a, аз го взех като state.productsReducer.product
  const product = useSelector((state) => state.productsReducer.product);
  const loading = useSelector((state) => state.productsReducer.loading);

  //Actions - с useDispatch dispatch-ваме action-ите
  const dispatch = useDispatch();

  useEffect(() => {
    //export const productActions = {getAllProducts,getProduct..може и директно да екпортваме функциите в action-ите
    dispatch(productActions.getProduct(id));
  }, []);

  const showLoading = () => {
    if (loading) {
      return (
        <div className="alert alert-success">
          <h2>Loading...</h2>
        </div>
      );
    }
  };
  // const isActive = {
  //   fontWeight: "bold",
  //   backgroundColor: "rgba(255, 255, 255, 0.1)",
  // };

  //const context = useContext(AuthContext);
  // useEffect(() => {
  //   getCategories().then((res) => setCategories(res));

  //   if (props.match.params.category) {
  //     console.log(props.match.params.category);
  //     getProductsByCategory(props.match.params.category).then((res) =>
  //       setProducts(res)
  //     );
  //   } else {
  //     getProducts().then((res) => setProducts(res));
  //   }
  // }, [props.match.params]);
  return (
    <PageWrapper>
      <main>
        {showLoading()}
        <div className="body">
          <div className="image-big">
            <div>{product?.name}</div>
            <div>{product?._id}</div>
            <img alt="11" src={product?.imageUrl} />
          </div>
        </div>
        {/* <ImagesGallery id={product?.imageUrl} /> */}
        <div class="glodetail-wrap">
          <div class="product-main" data-spm="1000016" data-spm-max-idx="2">
            <div class="product-main-wrap">
              <div class="img-view-wrap" itemprop="image" data-spm="1000017">
                <div class="img-view">
                  <div class="image-viewer">
                    <div class="image-view-magnifier-wrap">
                      <img
                        alt="Vintage  Bohemian Black Lace with Metal Beads Knot Headband  Rhinestone Knotted Bow Hairband Hair Accessories"
                        class="magnifier-image"
                        src="https://ae01.alicdn.com/kf/HTB1zhqDSMHqK1RjSZFPq6AwapXar/Vintage-Bohemian-Black-Lace-with-Metal-Beads-Knot-Headband-Rhinestone-Knotted-Bow-Hairband-Hair-Accessories.jpg_Q90.jpg_.webp"
                      />
                      <div class="magnifier-loading-wrap">
                        <div class="magnifier-loading-cover"></div>
                        <div class="magnifier-loading"></div>
                      </div>
                      <div
                        class="magnifier-cover"
                        data-spm-anchor-id="a2g0o.detail.1000017.i0.15965708Ho9diR"
                      ></div>
                    </div>
                  </div>

                  <div class="images-view-wrap">
                    <ul class="images-view-list">
                      <li class="">
                        <div class="images-view-item">
                          <img
                            alt="Vintage  Bohemian Black Lace with Metal Beads Knot Headband  Rhinestone Knotted Bow Hairband Hair Accessories"
                            src="https://ae01.alicdn.com/kf/HTB1DeuDSQzoK1RjSZFlq6yi4VXap/Vintage-Bohemian-Black-Lace-with-Metal-Beads-Knot-Headband-Rhinestone-Knotted-Bow-Hairband-Hair-Accessories.jpg_50x50.jpg_.webp"
                          />
                        </div>
                      </li>
                      <li class="">
                        <div class="images-view-item">
                          <img
                            alt="Vintage  Bohemian Black Lace with Metal Beads Knot Headband  Rhinestone Knotted Bow Hairband Hair Accessories"
                            src="https://ae01.alicdn.com/kf/HTB1lb5MSNjaK1RjSZFAq6zdLFXae/Vintage-Bohemian-Black-Lace-with-Metal-Beads-Knot-Headband-Rhinestone-Knotted-Bow-Hairband-Hair-Accessories.jpg_50x50.jpg_.webp"
                          />
                        </div>
                      </li>
                      <li class="active">
                        <div class="images-view-item">
                          <img
                            alt="Vintage  Bohemian Black Lace with Metal Beads Knot Headband  Rhinestone Knotted Bow Hairband Hair Accessories"
                            src="https://ae01.alicdn.com/kf/HTB1zhqDSMHqK1RjSZFPq6AwapXar/Vintage-Bohemian-Black-Lace-with-Metal-Beads-Knot-Headband-Rhinestone-Knotted-Bow-Hairband-Hair-Accessories.jpg_50x50.jpg_.webp"
                          />
                        </div>
                      </li>
                      <li class="">
                        <div class="images-view-item">
                          <img
                            alt="Vintage  Bohemian Black Lace with Metal Beads Knot Headband  Rhinestone Knotted Bow Hairband Hair Accessories"
                            src="https://ae01.alicdn.com/kf/HTB1A9a1SNnaK1RjSZFBq6AW7VXaO/Vintage-Bohemian-Black-Lace-with-Metal-Beads-Knot-Headband-Rhinestone-Knotted-Bow-Hairband-Hair-Accessories.jpg_50x50.jpg_.webp"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="product-info">
                <div class="product-title">
                  <h1 class="product-title-text">
                    Vintage Bohemian Black Lace with Metal Beads Knot Headband
                    Rhinestone Knotted Bow Hairband Hair Accessories
                  </h1>
                </div>
                <div class="split-line-thin"></div>
                <div class="product-price">
                  <div class="product-price-current">
                    <span class="product-price-value">US $4.50</span>
                  </div>
                </div>
                <div class="split-line-thin"></div>
                <div class="product-sku">
                  <div class="sku-wrap">
                    <div class="sku-property">
                      <div class="sku-title">
                        Color: <span class="sku-title-value">pearl bow</span>
                      </div>
                      <ul class="sku-property-list">
                        <li class="sku-property-item">
                          <div class="sku-property-image">
                            <img
                              src="https://ae01.alicdn.com/kf/HTB1htasSSrqK1RjSZK9q6xyypXa7/Vintage-Bohemian-Black-Lace-with-Metal-Beads-Knot-Headband-Rhinestone-Knotted-Bow-Hairband-Hair-Accessories.jpg_50x50.jpg_.webp"
                              class=""
                              title="rhinestone knot"
                              alt="rhinestone knot"
                            />
                          </div>
                        </li>
                        <li class="sku-property-item">
                          <div class="sku-property-image">
                            <img
                              src="https://ae01.alicdn.com/kf/HTB1A9qESIbpK1RjSZFyq6x_qFXa4/Vintage-Bohemian-Black-Lace-with-Metal-Beads-Knot-Headband-Rhinestone-Knotted-Bow-Hairband-Hair-Accessories.jpg_50x50.jpg_.webp"
                              class=""
                              title="metal beads knot"
                              alt="metal beads knot"
                            />
                          </div>
                        </li>
                        <li class="sku-property-item">
                          <div class="sku-property-image">
                            <img
                              src="https://ae01.alicdn.com/kf/HTB1PXqzSH2pK1RjSZFsq6yNlXXaW/Vintage-Bohemian-Black-Lace-with-Metal-Beads-Knot-Headband-Rhinestone-Knotted-Bow-Hairband-Hair-Accessories.jpg_50x50.jpg_.webp"
                              class=""
                              title="metal beads bow"
                              alt="metal beads bow"
                            />
                          </div>
                        </li>
                        <li class="sku-property-item">
                          <div class="sku-property-image">
                            <img
                              src="https://ae01.alicdn.com/kf/HTB1VNmZSOLaK1RjSZFxq6ymPFXah/Vintage-Bohemian-Black-Lace-with-Metal-Beads-Knot-Headband-Rhinestone-Knotted-Bow-Hairband-Hair-Accessories.jpg_50x50.jpg_.webp"
                              class=""
                              title="rhinestone bow"
                              alt="rhinestone bow"
                            />
                          </div>
                        </li>
                        <li class="sku-property-item">
                          <div class="sku-property-image">
                            <img
                              src="https://ae01.alicdn.com/kf/HTB1bEKsSPDpK1RjSZFrq6y78VXaG/Vintage-Bohemian-Black-Lace-with-Metal-Beads-Knot-Headband-Rhinestone-Knotted-Bow-Hairband-Hair-Accessories.jpg_50x50.jpg_.webp"
                              class=""
                              title="pearl flower knot"
                              alt="pearl flower knot"
                            />
                          </div>
                        </li>
                        <li class="sku-property-item selected">
                          <div class="sku-property-image">
                            <img
                              src="https://ae01.alicdn.com/kf/HTB1N4qDSQzoK1RjSZFlq6yi4VXa2/Vintage-Bohemian-Black-Lace-with-Metal-Beads-Knot-Headband-Rhinestone-Knotted-Bow-Hairband-Hair-Accessories.jpg_50x50.jpg_.webp"
                              class=""
                              title="pearl bow"
                              alt="pearl bow"
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
};
export default ProductPage;
