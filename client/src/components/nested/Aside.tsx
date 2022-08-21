import React from "react";
import { FaUserFriends, FaStore } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbBrandPagekit } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { FiFlag } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdRecentActors, MdKeyboardArrowDown } from "react-icons/md";
import { RiBilliardsFill } from "react-icons/ri";
import "../../styles/Aside.css";

const Aside = () => {
  return (
    <section className="main-container">
      <div className="main-container-left">
        <h1>Facebook</h1>
        <h3>Suggested</h3>
        <h4>
          <FaUserFriends className="dc" /> Friends
        </h4>
        <h4>
          <HiOutlineUserGroup className="dc" /> Group
        </h4>
        <h4>
          <FaStore className="dc"/>
          Marketplace
        </h4>
        <h4>
          <TbBrandPagekit className="dc"/>
          Saved
        </h4>
        <h4>
          <IoMdTime className="dc"/>
          Memories
        </h4>
        <h4>
          <FiFlag className="dc"/>
          Pages
        </h4>
        <h4>
          <AiOutlineCalendar className="dc"/>
          Events
        </h4>
        <h4>
          <MdRecentActors className="dc" />
          Most Recent
        </h4>
        <h4>
          <MdKeyboardArrowDown className="dc" />
          See more
        </h4>
        <div className="main-container-left-bottom">
          <h3>Your shortcuts</h3>
          <h4>
            <RiBilliardsFill className="dc" /> 8 Ball Pool
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Aside;
