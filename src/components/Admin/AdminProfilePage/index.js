import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import PageWrapper from "../../PageWrapper";
import Orders from "../Orders";

const AdminProfilePage = () => {
  const context = useContext(AuthContext);

  return (
    <PageWrapper>
      <main>
        <div className="row">
          <div className="card">
            <h4 className="card-header">Admin Links</h4>
            <ul className="list-group">
              <li className="list-group-product">
                <Link className="nav-link" to="/admin/category/create">
                  Create Category
                </Link>
              </li>
              <li className="list-group-product">
                <Link className="nav-link" to="/admin/product/create">
                  Create Product
                </Link>
              </li>
              <li className="list-group-product">
                <Link className="nav-link" to="/admin/orders">
                  View Orders
                </Link>
              </li>
              <li className="list-group-product">
                <Link className="nav-link" to="/admin/products">
                  Manage Products
                </Link>
              </li>
            </ul>
          </div>
          <div className="card mb-5">
            <h3 className="card-header">Admin Information</h3>
            <ul className="list-group">
              <li className="list-group-product">{context.user.name}</li>
              <li className="list-group-product">{context.user.email}</li>
              <li className="list-group-product">
                {context.user.role === "admin" ? "Admin" : "Registered User"}
              </li>
            </ul>
          </div>
          <Orders />
        </div>
      </main>
    </PageWrapper>
  );
};
export default AdminProfilePage;
