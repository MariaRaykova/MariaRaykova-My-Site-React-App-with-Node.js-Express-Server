import Header from "../Header";
import Footer from "../Footer";
import Aside from "../Aside";

function PageWrapper({ children }){
  return (
    <div>
        <Header />
        <div className="content-container">
        {children}
          <Aside />
           </div>
        <Footer />
    </div>
  );
}
export default PageWrapper;
