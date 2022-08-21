import { Outlet } from "react-router-dom";
import Aside from "./nested/Aside";
import Main from "./nested/Main";
import Navbar from "./nested/Navbar";
import Posts from "./nested/Posts";

const Home = () => {
  return (
    <div className="container">
      <div className="main-navbar">
        <Navbar />
      </div>
      <div className="home-container">
        <div className="aside-container"><Aside /></div>
        <div className="container-inner">
          <section className="both-container">
            <section className="main-container-mid">
              <div className="main-conainter-mid-inner">
                <Posts />
              </div>
            </section>
          </section>
          <div className="main-container"><Main /></div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
