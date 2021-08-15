import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import AuthContext from "../../contexts/AuthContext";
import "./index.scss";

const ProductCard = (product) => {
  const { _id, name, description, imageUrl, category, price, quantity } = product;
  const context = useContext(CartContext);
  const authContext = useContext(AuthContext);

  const onAddHandler = () => {
    context.addProduct(product);
  };

  return (
    <div className="card ">
      <div className="card-body">
        <img alt="11" src={imageUrl}   />
        <div className="card-header card-header-1 ">{name}</div>
        <p className="card-p  mt-2">{description} </p>
        <p className="card-p black-10">$ {price}</p>
        <p className="black-9">Category: {category?.name}</p>
        <Link className=".btn-pink" to={`/product/${_id}`}>View Details</Link>
        {authContext.user?.role==="admin" ? <Link className=".btn-pink" to={`/admin/product/edit/${_id}`}>Edit</Link> : null}
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
