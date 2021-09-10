import { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthContext from "../../contexts/AuthContext";
import CartContext from "../../contexts/CartContext";
import AdminBar from "../Admin/AdminBar"
import { addToCartAction } from "../../redux/action/cartActions"


import "./index.scss";

const ProductCard = (product) => {
  const { _id, name, description, images, category, price, quantity} = product;
  const authContext = useContext(AuthContext);

  const dispatch = useDispatch();

  const onAddHandler = () => {
    dispatch(addToCartAction(product))
  };

  return (
    <div className="card ">
      <div className="card-body">
        <div className="card-header card-header-1 ">{name}</div>
        <img alt="11" src={images[0]} width="150" height="auto" />
        {/* {shouldRedirect(redirect)} */}
        {/* <ShowImage item={product} url="product" /> */}
        <p className="card-p  mt-2">{description} </p>
        {images?.map((i) => (
          <img key={i} src={i} width="80" height="80" />
        ))}
        <p className="card-p black-10">$ {price}</p>
        <p className="black-9">Category: {category?.name}</p>

        <Link className="navigation" to={`/product/${_id}`}>
          View Details
        </Link>

        {/* {authContext.user?.role === "admin" ? (
          <div>
           Admin:
          <Link className="btn-pink" to={`/admin/product/edit/${_id}`}>
            Edit
          </Link>
            <Link className="btn-pink" to={`/admin/image/add/product/${_id}`}>
            Add Image
          </Link>
          </div>
        ) : null} */}
        <footer>
          <button
            className="btn btn-pink"
            onClick={onAddHandler}
            value="Add to Cart"
          />
        </footer>
        <br />
      </div>

      <AdminBar _id={product._id} />
    </div>
  );
};
export default ProductCard;

