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
    <div>
      <Header />
      <div className="content-container content-limiter">
        <div className={className}>{children}</div>
        {/* има значение къде са props.children */}
        {/* {children} */}
        <Aside />
      </div>
      <Footer />
    </div>
  );
}
export default PageWrapper;
