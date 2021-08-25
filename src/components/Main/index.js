import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import "./index.scss";
import PageWrapper from "../PageWrapper";
// import {
//   getCategories,
//   getProducts,
//   getProductsByCategory
// } from "../../utils/getProductService";
import AuthContext from "../../contexts/AuthContext";
import SwiperCoverflow from "../core/SwiperCoverflow";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../redux/action/productsActions";

const Main = (props) => {
  const context = useContext(AuthContext);
  // const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);

  const products = useSelector((state) => state.productsReducer.products);
  const categories = useSelector((state) => state.productsReducer.categories);
  const loading = useSelector((state) => state.productsReducer.loading);

  //Actions - с useDispatch dispatch-ваме action-ите
  const dispatch = useDispatch();

  useEffect(() => {
    //export const productActions = {getAllProducts,getProduct..може и директно да екпортваме функциите в action-ите
    dispatch(productActions.getAllCategories());
    if (props.match.params.category) {
      dispatch(
        productActions.getAllProductsByCategory(props.match.params.category)
      );
    } else {
      dispatch(productActions.getAllProducts());
    }
  }, []);
  // useEffect(() => {
  //   getCategories().then((res) => setCategories(res));

  //   if (props.match.params.category) {
  //     getProductsByCategory(props.match.params.category).then((res) =>
  //       setProducts(res)
  //     );
  //   } else {
  //     getProducts().then((res) => setProducts(res));
  //   }
  // }, [props.match.params]);
  console.log("main categories " + categories)
  return (
    <PageWrapper>
      <main>
        {/* <SwiperCoverflow /> */}
        {categories?.map((c) => (
          <Link to={`/product/category/${c._id}`} key={c._id}>
            {c.name}
          </Link>
        ))}

        <div className="card-container">
          <article className="layout-flex">
            {/* за да заредим всички items */}
            {products?.map((p) => (
              <ProductCard key={p._id} {...p} />
            ))}
          </article>
        </div>
      </main>
    </PageWrapper>
  );
};
export default Main;
