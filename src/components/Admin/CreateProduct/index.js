import { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import PageWrapper from "../../PageWrapper";
import { createProduct, uploadImage } from "../adminHandlers";
import   {getCategories, getProducts} from "../../../utils/getData"

const CreateProduct = () => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleChangeImage = (e) => {
    e.preventDefault();
    setLoading(true);
    uploadImage(e.target.files[0]).then((data) => {
      // if (data.error) {
      //   setError({ ...product, error: data.error });
      // } else {
      setUrl(data.secure_url );
      setLoading(false);
      // }
    });
  };
  const handleChangeCategory = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const onCreateSubmitHandler = (e) => {
    e.preventDefault();
    const userId = context.user._id;
    const name = e.target.name.value;
    const description = e.target.description.value;
    const image = url ? url : e.target.image.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;

     createProduct( {userId, name, description, image, selectedCategoryId, price, quantity} ).then(() => {
        history.push("/");
      })
  };
 
  useEffect(() => {
    getProducts().then((res) => setProducts(res));
    getCategories().then((res) => setCategories(res));
  }, []); 
  const productsList = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">All Categories</h2>
          <ul className="list-group">
            {products?.map((p) => (
              <li
                key={p._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.name}</strong>
                <strong>{p.description}</strong>
                <strong>{p.category}</strong>
                <strong>{p.price}</strong>
                <Link className=".btn-pink" to={`/admin/product/delete/${p._id}`}>
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
  return (
    <PageWrapper>
      <main>
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
              <label className="btn btn-secondary">
                <input
                  onChange={handleChangeImage}
                  type="file"
                  name="photoFromFile"
                  accept="image/*"
                />
                {showLoading()}
                {/* <div>
                  <h1>Uploaded image will be displayed here</h1>
                  <img src={products?.imageUrl} alt="" />
                </div> */}
              </label>
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
                <select onChange={handleChangeCategory} defaultValue="Categories" >
                <option>Please select</option>
                  {categories?.map((c) => (
                   (<option
                      key={c._id}
                      value={c._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      id={c._id}
                    >
                      {c.name}
                    </option>)
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
        {productsList()}
      </main>
    </PageWrapper>
  );
};
export default CreateProduct;
