import {  useEffect, useState } from "react";
import {Link} from "react-router-dom"
import Product from "../ProductCard";
import "./index.scss";
import PageWrapper from "../PageWrapper";
import { getCategories, getProducts, getProductsByCategory} from "../../utils/getData";
import ProductCard from "../ProductCard";


const Main = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {

    getCategories().then(res=>setCategories(res))

    if(props.match.params.category){
      getProductsByCategory(props.match.params.category).then((res) => setProducts(res))
    }else {
      getProducts().then((res) => setProducts(res))
    }
  }, [props.match.params]); 

  return (
    <PageWrapper>
      <main>
      {categories?.map((c) => 
                   (<Link to={`/product/${c._id}`} key={c._id}>
                      {c.name}
                    </Link>))}
        <div className="card-container">
          <article className="layout-flex">
            {products?.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </article>
        </div>
      </main>
    </PageWrapper>
  );
};
export default Main;
