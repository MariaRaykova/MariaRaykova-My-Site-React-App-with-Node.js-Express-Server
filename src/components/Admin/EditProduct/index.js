import { useContext, useEffect, useState } from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import PageWrapper from "../../PageWrapper";
import ProductCard from "../../ProductCard";
import { editProduct, uploadImage } from "../adminHandlers";
import { getCategories, getProduct } from "../../../utils/getData";

const EditProduct = (props) => {
  const history = useHistory();
  const match = useRouteMatch();
  const context = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [newInputData, setNewInputData] = useState({
    inputName: "",
    inputNewValue: ""
  });
  const [newProductArray, setNewProductArray] = useState([]);
  const _id = context.user._id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getProduct(match.params.id).then((res) => {
      setProduct(...res, _id);
      setNewProductArray(...res, _id);
    });
    getCategories().then((res) => setCategories(res));
  }, []);

  //за всяка промяна на някое от полетата добавяме новия запис в новия масив от продукти

  //ако качваме снимка ще вземем самия файл за upload
  const handleChangeImage = (e) => {
    e.preventDefault();
    setLoading(true);
    uploadImage(e.target.files[0]).then((data) => {
      // if (data.error) {
      //   setError({ ...product, error: data.error });
      // } else {
      setNewProductArray({ ...newProductArray, imageUrl: data.secure_url });
      setLoading(false);
      // }
    });
  };

  //ако имаме промяна в някое друго поле вземаме името на полето и новата му стойност и го сетваме в новия масив от продукти
  const handleChange = (inputName) => (e) => {
    const inputNewValue = e.target.value;
    setNewInputData({ inputName, inputNewValue });
    setNewProductArray({ ...newProductArray, [inputName]: inputNewValue });
  };

  const onEditSubmitHandler = (e) => {
    e.preventDefault();
    editProduct(match.params.id, { ...newProductArray }).then((data) => {
      // if (data.error) {
      //   setError({ ...product, error: data.error });
      // } else {
      history.push(`/`);
      // }
    });
  };
  //картичката със старите данни на продукта
  const showProductCard = () => {
    if (product !== []) {
      return <ProductCard {...product} />;
    }
  };
  const showLoading = () => {
    if (loading) {
      return (
        <div className="alert alert-success">
          <h2>Loading...</h2>
        </div>
      );
    }
  };
  // const showError = () => (
  //   <div
  //     className="alert alert-danger"
  //     style={{ display: error ? "" : "none" }}
  //   >
  //     {error}
  //   </div>
  // );
  //ако upload-ваме с widget...
  // let widget = window.cloudinary.createUploadWidget(
  //   {
  //     cloudName: "dszjcx6ai",
  //     uploadPreset: "React eCommerce"
  //   },
  //   (error, result) => {}
  // );
  // const showWidget = () => {
  //   widget.open();
  // };
  return (
    <PageWrapper>
      <main>
        {/* <div></div>
        <button onClick={showWidget}>Upload Photo</button> */}
        {loading ? showLoading() : showProductCard()}
        {/* {showError()} */}
        <section className="create">
          <form onSubmit={onEditSubmitHandler}>
            <fieldset>
              <legend>Edit Product</legend>
              {/* От newProductArray вземаме стойностите, не от product */}
              <p className="field">
                <label htmlFor="name">Name</label>
                <span className="input">
                  <input
                    onChange={handleChange("name")}
                    value={newProductArray?.name}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="name"
                  />
                  <span className="actions"></span>
                </span>
              </p>
              <p className="field">
                <label htmlFor="description">Description</label>
                <span className="input">
                  <input
                    onChange={handleChange("description")}
                    value={newProductArray?.description}
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
                    onChange={handleChange("imageUrl")}
                    value={newProductArray?.imageUrl}
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
                <div>
                  <h1>Uploaded image will be displayed here</h1>
                  <img src={newProductArray?.imageUrl} alt="" />
                </div>
              </label>
              <p className="field">
                <label htmlFor="price">Price</label>
                <span className="input">
                  <input
                    onChange={handleChange("price")}
                    value={newProductArray?.price}
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Price"
                  />
                  <span className="actions"></span>
                </span>
              </p>
              <p className="field">
                <label htmlFor="quantity">Quantity</label>
                <span className="input">
                  <input
                    onChange={handleChange("quantity")}
                    value={newProductArray?.quantity}
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="quantity"
                  />
                  <span className="actions"></span>
                </span>
              </p>
              <p className="field">
                <label htmlFor="category">Category</label>
                <select onChange={handleChange("category")}>
                  <option>Please select</option>
                  {categories?.map((c) => (
                    <option
                      key={c._id}
                      value={c._id}
                      // className="list-group-item d-flex justify-content-between align-items-center"
                      // id={c._id}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </p>
              <input
                className="btn btn-pink submit"
                type="submit"
                value="Edit"
              />
            </fieldset>
          </form>
        </section>
      </main>
    </PageWrapper>
  );
};
export default EditProduct;
