/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import axios from 'axios';

const Header = (props, test) => {
   const {linkTo, page, label} = props
   const router = useRouter();

   const [data, setData] = useState();
   useEffect(() => {
      axios
         .get(`https://s3.staging.halcyondigitalhost.com/node/api/pages`)
         .then((res) => {
         console.log(res.data, "test");
         const currentPage = res.data.find((item) => item.title === page)

         setData(currentPage);
      })
   }, [page]);
   console.log(data)


   return (
      <header className="flex justify-start items-center py-4 px-6 header-banner shadow-2xl">
         <div className="flex items-center">
            {/* <div x-data="{ notificationOpen: false }" className="relative">
               <button
                  click="notificationOpen = ! notificationOpen"
                  className="flex text-[#de4523] focus:outline-none"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-14 w-14 text-white"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                     />
                  </svg>
               </button>
            </div> */}
            <AiFillHome size={48} className="text-white" />
            
            <div className="px-3 text-white">
               <span className="font-montserratBold text-lg">{data?.title}</span>
               <p
                  className="text-xxs font-montserratRegular"
                  dangerouslySetInnerHTML={{
                     __html: data?.body,
                  }}
               />
            </div>
         </div>
      </header>
   );
};

export default Header;
