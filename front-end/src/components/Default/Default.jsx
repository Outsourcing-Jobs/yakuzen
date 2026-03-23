import "./Default.css";
import Header from "../Header/Header";
import AppFooter from "../Footer/Footer";
import FooterShipping from "../Footer/FooterShipping";
import FloatingContact from "./FloatingContact";
import GlobalBackground from "./GlobalBackground";
import GlobalMenu from "./GlobalMenu";

const Default = ({ children, footerType }) => {
  return (
    <div>
      <Header />
      <div className="content-wrapper">
        <GlobalMenu />
        <div className="main-content">{children}</div>
      </div>
      {footerType === "shipping" && <FooterShipping />}
      {footerType === "" && <AppFooter />}

      <FloatingContact />
    </div>
  );
};

export default Default;
