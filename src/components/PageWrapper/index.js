import Header from "../Header";
import Footer from "../Footer";
import Aside from "../Aside";

function PageWrapper({
  title = "Online Shop New Desire",
  description,
  className,
  children
}) {
  return (
    <div className="page-container">
      <Header />
        <main >{children}</main>
      <Footer />
      <p className="reserved">All rights reserved &copy; MariaRaykova</p>
    </div>
  );
}
export default PageWrapper;
