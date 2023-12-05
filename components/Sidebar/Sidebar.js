/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiFillFileWord, AiFillHome } from "react-icons/ai";
import { BiShieldQuarter } from "react-icons/bi";
import { FaClipboardList, FaMedal, FaPaperPlane } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { BsBoxArrowLeft, BsClipboardCheck } from "react-icons/bs";
import { HiUserGroup, IconName } from "react-icons/hi";

const Sidebar = () => {
   const router = useRouter();

   const onClick = (index, item) => {
      if (router.isReady) {
         router.push(item.href);
      }
   };
   const [sidebarOpen, setSidebarOpen] = useState(true);

   const Menu = [
      {
         label: "Home",
         href: "/",
         svgPath: (
            <AiFillHome size={15}/>
         ),
      },
      {
         label: "Work Bench",
         href: "/work-bench",
         svgPath: (
            <BiShieldQuarter size={15} />
         ),
      },
      {
         label: "Claims Bench",
         href: "/claims-bench",
         svgPath: (
            <FaClipboardList size={15} />
         ),
      },
      {
         label: "Customer Access",
         href: "/customer-access",
         svgPath: (
            <HiUserGroup size={15} />
         ),
      },
      {
         label: "Compliance",
         href: "/compliance",
         svgPath: (
            <BsClipboardCheck size={15} />
         ),
      },
      {
         label: "Document Library",
         href: "/document-library",
         svgPath: (
            <AiFillFileWord size={15} />
         ),
      },
      {
         label: "Training & Education",
         href: "/training-education",
         svgPath: (
            <FaMedal size={15} />
         ),
      },
      {
         label: "Newsroom",
         href: "/newsroom",
         svgPath: (
            <IoNewspaper size={15} />
         ),
      },
      {
         label: "Contact Us",
         href: "/contact-us",
         svgPath: (
            <FaPaperPlane size={15} />
         ),
      },
   ];

   const [inactive, setInactive] = useState(false)

   return (
      <>
         <div className={`side-menu ${inactive ? "inactive" : "" }`}>
         {/* <div
            className={() =>
               `${
                  sidebarOpen
                     ? "translate-x-0 ease-out"
                     : "-translate-x-full ease-in"
               }`
            }
            className="fixed z-30 inset-y-0 left-0 w-72 transition duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 -translate-x-full ease-in shadow-2xl"
         > */}
            <div className="flex items-center justify-center mt-3">
               <div className="logo">
                  <img src="/img/head-logo.png" alt="" />
               </div>
            </div>

            <div className="mt-7">
               {Menu.map((item, index) => (
                  <nav key={index}>
                     <a
                        className={`cursor-pointer montserrat-regular flex items-center mt-1 py-3 px-5 ${
                           router.pathname === item.href
                              ? "bg-contenta-blue text-white rounded-lg font-montserratBold transition duration-300 ease-in-out"
                              : "hover:bg-gray-200 rounded-lg text-contenta-gray font-montserratBold transition duration-300 ease-in-out"
                        }`}
                        onClick={() => onClick(index, item)}
                     >
                        {item.svgPath}

                        <span className="mx-3 text-sm ">{item.label}</span>
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
                  <div className="flex">
                     <div>
                        <BsBoxArrowLeft size={20} />
                     </div>
                     <div className="mx-3">
                        Log out
                     </div>
                  </div>
               </div>
            </div>
            <div className="ml-10">
               <div className="flex justify-end toggle-menu rounded-md">
                  <button className="toggle-icon bg-contenta-blue transform -rotate-45 text-white p-1 rounded" onClick={() => setInactive(!inactive)}>
                     {inactive ? ( <MdChevronRight size={24} className="transform rotate-45"/> ) : ( <MdChevronLeft size={24} className="transform rotate-45"/> )}
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default Sidebar;
