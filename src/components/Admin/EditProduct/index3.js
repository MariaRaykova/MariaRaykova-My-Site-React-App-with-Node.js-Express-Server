import { useContext, useEffect, useState } from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import PageWrapper from "../../PageWrapper";
import ProductCard from "../../ProductCard";
import { editProduct, uploadImage } from "../adminHandlers";
import { getCategories, getProduct } from "../../../utils/getProductData";

const EditProduct = (props) => {
  const history = useHistory();
  const match = useRouteMatch();
  const context = useContext(AuthContext);
  const _id = context.user._id;
  const [values, setValues] = useState({
    product: [
      {
        name: "",
        description: "",
        price: "",
        quantity: "",
        imageUrl: "",
        category: ""
      }
    ],
    categories: [],
    image: null,
    newProductArray: [],
    newInputData: {},
    loading: false,
    error: ""
  });
  const {
    product,
    categories,
    image,
    newProductArray,
    newInputData,
    loading,
    error
  } = values;

  useEffect(() => {
    getProduct(match.params.id).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, product: data });
      }
    });
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data
        });
      }
    });
    if (product.length > 0) {
      newProductArray: [{ ...product, _id }];
    }
  }, []);

  const handleChange = (inputName) => (e) => {
    if (inputName === "photoFromFile") {
      setValues({ ...values, image: e.target.files[0] });
    } else {
      const value = e.target.value;
      setValues({
        ...values,
        newInputData: { inputName, value },
        newProductArray: { ...newProductArray, [inputName]: value }
      });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });

    if (image) {
      uploadImage(image).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, imageUrl: data.secure_url });
        }
      });

      setValues({
        ...values,
        newProductArray: {
          ...newProductArray,
          imageUrl: product.imageUrl
        }
      });
    }
    editProduct(match.params.id, { ...newProductArray }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, product: data, loading: false });
      }
    });
    history.push(`/admin/product/edit/${newProductArray._id}`);
  };
  // setProducts((oldArray) => [...oldArray, product]);
  const showProductCard = () => {
    if (product !== []) {
      return <ProductCard {...newProductArray} />;
    }
  };
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
  const showLoading = () => {
    if (loading) {
      return (
        <div className="alert alert-success">
          <h2>Loading...</h2>
        </div>
      );
    }
  };
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  return (
    <PageWrapper>
      <main>
        {/* <div></div>
        <button onClick={showWidget}>Upload Photo</button> */}
        {showProductCard()}
        {showError()}
        {showLoading()}
        <section className="create">
          <form onSubmit={onSubmitHandler}>
            <fieldset>
              <legend>Edit Product</legend>

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
                  <label className="btn btn-secondary">
                    <input
                      onChange={handleChange("photoFromFile")}
                      type="file"
                      name="photoFromFile"
                      accept="image/*"
                    />
                  </label>
                  <span className="actions"></span>
                </span>
              </p>
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
                {/* <span className="input">
           <input
             type="text"
             name="category"
             id="category"
             // placeholder="likes"
           />
           <span className="actions"></span> 
         </span>*/}
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
