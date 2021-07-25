import React, { useContext, useState, useEffect } from "react";

import { Link , useHistory} from "react-router-dom";

import PageWrapper from "../../PageWrapper";
import AuthContext from "../../../contexts/AuthContext";
import {createCategory} from "../adminHandlers";
import   {getCategories} from "../../../utils/getData"

const CreateCategory = () => {
  const context = useContext(AuthContext);
  const [name, setName] = useState("");
  // const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);


  const clickCreateSubmitHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    createCategory({ name }).then((data) => {
      setName(data);
      e.target.name.value = ""
      setSuccess(true);
    });
  };
  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, [success]);

  const newCategoryForm = () => (
    <form onSubmit={clickCreateSubmitHandler}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          autoFocus
          required
        />
      </div>
      <button type="submit" className="btn btn-outline-primary">
        Create Category
      </button>
    </form>
  );
  const categoriesList = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">All Categories</h2>
          <ul className="list-group">
            {categories.map((c) => (
              <li
                key={c._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{c.name}</strong>
                <Link to={`/admin/category/delete/${c._id}`}>
                  <span className="badge badge-warning badge-pill">Delete</span>
                </Link>
                <Link to={`/admin/category/edit/${c._id}`}>
                  <span className="badge badge-warning badge-pill">Edit</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // const showSuccess = () => {
  //   if (success) {
  //     return <h3 className="text-success">{name} is created</h3>;
  //   }
  // };

  // const showError = () => {
  //   if (error) {
  //     return <h3 className="text-danger">Category should be unique</h3>;
  //   }
  // };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/profile" className="text-warning">
        Back to Profile
      </Link>
    </div>
  );

  return (
    <PageWrapper
      title="Add a new category"
      description={`Hello, ${context.user.name}, ready to add a new category?`}
    >
      <main>
        {/* {showSuccess()}
          {showError()} */}
        {newCategoryForm()}

        {goBack()}
        {categoriesList()}
      </main>
    </PageWrapper>
  );
};

export default CreateCategory;
