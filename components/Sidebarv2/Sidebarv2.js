import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiFillFileWord, AiFillHome, AiFillPropertySafety } from "react-icons/ai";
import { BiShieldQuarter } from "react-icons/bi";
import { FaClipboardList, FaMedal, FaPaperPlane, FaUsersCog } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { BsBoxArrowLeft, BsClipboardCheck } from "react-icons/bs";
import { HiUserGroup, IconName } from "react-icons/hi";

const Sidebarv2 = (props) => {
   const router = useRouter();

   const onClick = (index, item) => {
      if (router.isReady) {
         router.push(item.href);
      }
   };

   const Menu = [
      {
         label: "Home",
         href: "/",
         svgPath: (
            <AiFillHome size={20} />
         ),
      },
      {
         label: "Work Bench",
         href: "/work-bench",
         svgPath: (
            <BiShieldQuarter size={20} />
         ),
      },
      {
         label: "Claims Bench",
         href: "/claims-bench",
         svgPath: (
            <FaClipboardList size={20} />
         ),
      },
      {
         label: "Customer Access",
         href: "/customer-access",
         svgPath: (
            <HiUserGroup size={20} />
         ),
      },
      {
         label: "Compliance",
         href: "/compliance",
         svgPath: (
            <BsClipboardCheck size={20} />
         ),
      },
      {
         label: "Document Library",
         href: "/document-library",
         svgPath: (
            <AiFillFileWord size={20} />
         ),
      },
      {
         label: "Training & Education",
         href: "/training-education",
         svgPath: (
            <FaMedal size={20} />
         ),
      },
      {
         label: "Newsroom",
         href: "/newsroom",
         svgPath: (
            <IoNewspaper size={20} />
         ),
      },
      {
         label: "Contact Us",
         href: "/contact-us",
         svgPath: (
            <FaPaperPlane size={20} />
         ),
      },
      {
         label: "Broker Access",
         href: "/broker-access",
         svgPath: (
            <FaUsersCog size={20} />
         ),
      },
   ];
   const [sidebarOpen, setSidebarOpen] = useState(true);

   const [inactive, setInactive] = useState(false)

   useEffect(() => {
      props.onCollapse(inactive)
   }, [inactive])

   return (
      <>
         <div id="sidebar" className={`side-menu-wrapper content-shadow ${inactive ? "inactive" : "" }`}>
            <div className="top-section">
               <div className="logo">
                  <img src="/img/head-logo.png" alt="" />
               </div>
               <div 
                  className="toggle-menu-btn rounded-md bg-contenta-blue transform -rotate-45"
                  onClick={() => {
                     setInactive(!inactive)
                  }}
               >
                  {inactive ? ( <MdChevronRight size={24} className="transform rotate-45"/> ) : ( <MdChevronLeft size={24} className="transform rotate-45"/> )}
               </div>
            </div>
            <div className="mt-7 main-menu">
               {Menu.map((item, index) => (
                  <nav key={index} >
                     <a
                        className={`cursor-pointer montserrat-regular flex items-center mt-1 py-3 px-5 menu-item ${
                           router.pathname === item.href
                              ? "bg-contenta-blue text-white rounded-lg font-montserratBold transition duration-300 ease-in-out "
                              : "hover:bg-gray-200 rounded-lg text-contenta-gray font-montserratBold transition duration-300 ease-in-out"
                        }`}
                        onClick={() => onClick(index, item)}
                     >
                        <div className="menu-icon">
                           {item.svgPath}
                        </div>

                        <span className="ml-8">
                           {item.label}
                        </span>
                     </a>
                  </nav>
               ))}
               <div 
                  className="py-2 px-5 cursor-pointer text-sm hover:bg-gray-200 transition duration-300 ease-in-out font-montserratBold text-contenta-pinky-red"
                  onClick={
                     (e) => {
                        e.preventDefault();
                        logout();
                     }
                  } 
               >
                  <div className="menu-logout">
                     <div className="logout-icon">
                        <BsBoxArrowLeft size={20} />
                     </div>
                     <span className="ml-3">Log out</span>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Sidebarv2;
