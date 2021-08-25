import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import CartContext from "../../contexts/CartContext";

// import ShowImage from "../core/ShowImage";
import "./index.scss";

const ProductCard = (product) => {
  const {
    _id,
    name,
    description,
    imageUrl,
    category,
    price,
    quantity
  } = product;
  const context = useContext(CartContext);
  const authContext = useContext(AuthContext);

  const onAddHandler = () => {
    context.addProduct(product);
  };

  return (
    <div className="card ">
      <div className="card-body">
        <div className="card-header card-header-1 ">{name}</div>
        <img alt="11" src={imageUrl} />
        {/* {shouldRedirect(redirect)} */}
        {/* <ShowImage item={product} url="product" /> */}
        <p className="card-p  mt-2">{description} </p>
        <p className="card-p black-10">$ {price}</p>
        <p className="black-9">Category: {category?.name}</p>

        <Link className="navigation" to={`/product/${_id}`}>
          View Details
        </Link>
        {authContext.user?.role === "admin" ? (
          <Link className="navigation" to={`/admin/product/edit/${_id}`}>
            Edit
          </Link>
        ) : null}
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
// {/* // <section className="card">
// //   <img alt="11" src={imageUrl} />
// //   <header>{name}</header>
// //   <footer>Price: {price} Euro</footer>
// //   <Link to={`/product/${id}`}>View Details</Link>
// //
// // </section> */}
