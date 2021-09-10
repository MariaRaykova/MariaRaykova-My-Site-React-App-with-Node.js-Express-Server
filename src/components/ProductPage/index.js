import "./index.scss";
import React, { useState, useEffect } from "react";
import { getImagesByProductAction, getSingleProduct } from "../../redux/action/productsActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import PageWrapper from "../PageWrapper";
import ImageThumbnailViewer from "../core/ImageThumbnailViewer";

const ProductPage = () => {
  const match = useRouteMatch();
  const id = match.params.id; //или  const { id } = useParams();
  //Reducers - с useSelector вземаме стейта - не import-ваме нищо - state.productsReducer:
  //state от reducers - products(state = initialState ...,
  //productsReducer от rootReducer - const rootReducer = combineReducers({ productsReducer: prodReducer, ...
  //{product} от InitialState-a, аз го взех като state.productsReducer.product
  const product = useSelector((state) => state.productsReducer.product);
  const loading = useSelector((state) => state.productsReducer.loading);
  const images = useSelector((state) => state.productsReducer.images);
  const mainImage = useSelector((state) => state.productsReducer.mainImage);
  // const [mainImage, setMainImage] = useState(null)
  //Actions - с useDispatch dispatch-ваме action-ите
  const dispatch = useDispatch();

  useEffect(() => {
    //export const productActions = {getAllProducts,getProduct..може и директно да екпортваме функциите в action-ите
    dispatch(getSingleProduct(id));
    // if(product?.images.length>0){
    //   setMainImage(product?.images[0])
    // }
  }, []);
  const showLoading = () => {
    if (loading) {
      return (
        <div className="alert alert-success">
          <h2>Loading...</h2>
        </div>
      );
    }
  }

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
            {/* <img alt="11" src={mainImage}  width="360" height="auto"/> */}
          </div>
        </div>
          <ImageThumbnailViewer {...product} />
          {/* {product?.images?.map((i) => (
            <img key={i} src={i} width="150" height="150" />
          ))} */}
        </main>
      </PageWrapper>
    );
  };

  export default ProductPage;