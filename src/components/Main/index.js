import { useEffect, useState } from "react";
import Product from "../Product";
import "./index.scss";
import { API } from "../../config";
import PageWrapper from "../PageWrapper";

const Main = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/product/`)
      .then((res) => res.json())
      .then((res) => setProducts(res))
      .catch((err) => console.log(err));
  }, []); //празния обект означава, че ще се изпълни само първия път
  return (
    <PageWrapper>
      <main>
        <div className="card-container">
          <article className="layout-flex">
            {/* за да заредим всички items */}
            {products.map((x) => (
              <Product key={x.id} {...x} />
            ))}
          </article>
        </div>
      </main>
    </PageWrapper>
  );
};
export default Main;
