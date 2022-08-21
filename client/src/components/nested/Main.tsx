import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiBilliardsFill } from "react-icons/ri";
import { BsMegaphone, BsThreeDots, BsCameraVideo } from "react-icons/bs";
import "../../styles/Main.css";

const pic1 = require('../../imgs/pic1.jpg')
const pic2 = require('../../imgs/pic2.jpg')
const img6 = require('../../imgs/img6.jpg')
const img2 = require('../../imgs/img2.jpg')
const img3 = require('../../imgs/img3.jpg')
const img4 = require('../../imgs/img4.jpg')

export default function Main() {
  return (
    <div className="main-container-right">
      <div className="main-container-right-inner">
        <div className="main-sponsered">
        <h1>Sponsered</h1>
          <div className="sponsor">
            <img src={pic1} width="130" height="130" alt="" />
            <div className="sponsor-text">
              <h4>Playstation 5</h4>
              <h5>www.playstation.com</h5>
            </div>
          </div>
          <div className="sponsor">
            <img src={pic2} width="130" height="130" alt="" />
            <div className="sponsor-text">
              <h4>Grilling Collection</h4>
              <h5>www.grillingcollection.com</h5>
            </div>
          </div>
          <div className="main-container-right-bottom">
            <h3>
              Your Pages and profiles{" "}
              <span className="space-between">
                <BsThreeDots />
              </span>
            </h3>
            <h4>
              <RiBilliardsFill size={28} /> Blue Glove Care
            </h4>
            <span className="text-edit">
              <MdOutlineNotificationsActive /> 1 Notification
            </span>
            <span className="text-edit">
              <BsMegaphone /> Create promotion
            </span>
            <h3 className="space-between-text">
              Contacts{" "}
              <span className="wrap">
                <BsCameraVideo />
                <AiOutlineSearch />
                <BsThreeDots />
              </span>
            </h3>
            <div className="contacts">
              <div className="contacts-in">
                <img src={img6} alt="" />
                <span className="img-online"></span>
                <label htmlFor="">Ahmed Mahmoud</label>
              </div>
              <div className="contacts-in">
                <img src={img4} alt="" />
                <span className="img-online"></span>
                <label htmlFor="">Menna Mahmoud</label>
              </div>
              <div className="contacts-in">
                <img src={img2} alt="" />
                <span className="img-online"></span>
                <label htmlFor="">Mahmoud AboElmaaty</label>
              </div>
              <div className="contacts-in">
                <img src={img3} alt="" />
                <span className="img-online"></span>
                <label htmlFor="">Samar Mahmoud</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
