import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import "./index.scss";

const ProductCard = (product) => {
  const { id, name, description, imageUrl, category, price, quantity } = product;
  const context = useContext(CartContext);

  const onAddHandler = () => {
    context.addProduct(product);
  };
  return (
    <div className="card ">
      <div className="card-body">
        <img alt="11" src={imageUrl} />
        <div className="card-header card-header-1 ">{name}</div>
        <p className="card-p  mt-2">{description.substring(0, 100)} </p>
        <p className="card-p black-10">$ {price}</p>
        <p className="black-9">Category: {category?.name}</p>
        <Link to={`/product/${id}`}>View Details</Link>
        <footer>
          <button
            className="btn btn-pink"
            onClick={onAddHandler}
            value="Add to Cart"
          />
        </footer>
        <br />
      </div>
    </div>
  );
};
export default ProductCard;
