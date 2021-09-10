import { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getAllCategories, uploadImageAction, clearUrl } from "../../../redux/action/productsActions";
import AuthContext from "../../../contexts/AuthContext";
import PageWrapper from "../../PageWrapper";
import { createProduct, uploadImage } from "../adminHandlers";

import ProductCard from "../../ProductCard";

const CreateProduct = () => {

  const history = useHistory();
  const context = useContext(AuthContext);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
 
const [product, setProduct] = useState()

  const products = useSelector((state) => state.productsReducer.products);
  const categories = useSelector((state) => state.productsReducer.categories);
  const loading = useSelector((state) => state.productsReducer.loading);
  const url = useSelector((state) => state.productsReducer.url);
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());

  }, []);
  const handleChangeImage = (e) => {
    e.preventDefault();
    dispatch(uploadImageAction(e.target.files[0]))
  };

  const showUploadedImage = () => {
    if (url) {
      return (<img alt="11" src={url} width="80" height="80" />)
    }
  }
 

  // const handleChangeImage = (e) => {
  //   e.preventDefault();
  //   setLoadingUpload(true);
  //   uploadImage(e.target.files[0]).then((data) => {
  //     // if (data.error) {
  //     //   setError({ ...product, error: data.error });
  //     // } else {
  //     setUrl(data.secure_url);
  //     setLoadingUpload(false);
  //     // }
  //   });
  // };
  const handleChangeCategory = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const onCreateSubmitHandler = (e) => {
    e.preventDefault();
    const userId = context.user._id;
    const name = e.target.name.value;
    const description = e.target.description.value;
    const imageUrl = url ? url : e.target.image.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
    console.log("ot create submit image " + imageUrl)
    createProduct({ name, description, imageUrl, selectedCategoryId, price, quantity }).then((res) => {
        setProduct(res)
        dispatch(clearUrl())
      });
    }

    const showProductCard = (product) => {
      return (
        <ProductCard {...product} />
      )
    }

      const showCreateForm = () => (
        <section className="create">
          <form onSubmit={onCreateSubmitHandler}>
            <fieldset>
              <legend>Create Product</legend>

              <p className="field">
                <label htmlFor="name">Name</label>
                <span className="input">
                  <input type="text" name="name" id="name" placeholder="name" />
                  <span className="actions"></span>
                </span>
              </p>
              <p className="field">
                <label htmlFor="description">Description</label>
                <span className="input">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Description"
                  />
                  <span className="actions"></span>
                </span>
              </p>
              <p className="field">
                <label htmlFor="image">Image URL</label>
                <span className="input">
                  <input
                    type="text"
                    name="image"
                    id="image"
                    placeholder="Image"
                  />
                  <span className="actions"></span>
                </span>
              </p>
              <label className="btn-secondary">
                <input
                  onChange={handleChangeImage}
                  type="file"
                  name="photoFromFile"
                  accept="image/*"
                />
                {showLoading()}
                <div>
                  <p>Uploaded image will be displayed here</p>
                  {showUploadedImage()}
                </div>
              </label>
              {/* <label className="btn btn-secondary">
          <input
            onChange={handleChangeImage}
            type="file"
            name="photoFromFile"
            accept="image/*"
          />
          {showLoadingUpload()}
          {/* <div>
            <h1>Uploaded image will be displayed here</h1>
            <img src={products?.image} alt="" />
          </div> 
        </label> */}
              <p className="field">
                <label htmlFor="price">Price</label>
                <span className="input">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    placeholder="Price"
                  />
                  <span className="actions"></span>
                </span>
              </p>
              <p className="field">
                <label htmlFor="quantity">quantity</label>
                <span className="input">
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    placeholder="quantity"
                  />
                  <span className="actions"></span>
                </span>
              </p>
              <p className="field">
                <label htmlFor="category">Category</label>
                <select
                  onChange={handleChangeCategory}
                  defaultValue="Categories"
                >
                  <option>Please select</option>
                  {categories?.map((c) => (
                    <option
                      key={c._id}
                      value={c._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      id={c._id}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </p>
              <input
                className="btn btn-pink submit"
                type="submit"
                value="Create"
              />
            </fieldset>
          </form>
        </section>

      );
      const productsList = () => (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">

              <h2 className="text-center">All Products</h2>
              <ul className="list-group">
                {products?.map((p) => (
                  <li
                    key={p._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <strong>{p.name}</strong>
                    <strong>{p.description}</strong>
                    <strong>{p.category.name}</strong>
                    <strong>{p.price}</strong>
                    <Link
                      className=".btn-pink"
                      to={`/admin/product/delete/${p._id}`}
                    >
                      <span className="badge badge-warning badge-pill">Delete</span>
                    </Link>
                    <Link className=".btn-pink" to={`/admin/product/edit/${p._id}`}>
                      <span className="badge badge-warning badge-pill">Edit</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
      const showLoading = () => {
        if (loading) {
          return (
            <div className="alert alert-success">
              <h2>Loading...</h2>
            </div>
          );
        }
      };
      // const showLoadingUpload = () => {
      //   if (loadingUpload) {
      //     return (
      //       <div className="alert alert-success">
      //         <h2>Loading...</h2>
      //       </div>
      //     );
      //   }
      // };
      return (
        <PageWrapper>
          <main>
            {product ? showProductCard(product) : showCreateForm()}
            {loading ? showLoading() : productsList()}
          </main>
        </PageWrapper>
      );
    };
    export default CreateProduct;
