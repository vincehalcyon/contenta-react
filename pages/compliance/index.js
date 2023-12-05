import React from "react";
import { BiChevronRight } from "react-icons/bi";
import Router from 'next/router';
import Header from "components/Header/Header";
import AppButton from "components/Base/AppButton";
import { useRequest } from "lib/custom-hook";


export default function Compliance() {

   const {data, isValidating: tabsIsValidating, mutate: updateData} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/node/api/compliance`})

   const overview = [
      {
         id: 1,
         count: '7',
         title: 'All Compliance',
      },
      {
         id: 2,
         count: '57%',
         title: 'Compliance Marked as Read',
      }

   ]

   return (
      <>
         <Header page="Compliance " />
         <div className="flex flex-col px-7 py-10 items">
            <div className="text-sm text-contenta-greyish-brown font-montserratBold">
               Compliance Overview
            </div>
            <div class="grid gap-4 grid-cols-2 flex-wrap py-5">
               {overview.map((item, index) =>
                  <div className="bg-white flex flex-row items-center content-shadow rounded-lg py-7 px-10 gap-5" key={index}>
                     <div className="text-3xl text-contenta-greyish-brown font-montserratBold">
                        {item.count}
                     </div>
                     <div className="text-sm text-contenta-greyish-brown font-montserratBold">
                        {item.title}
                     </div>
                  </div>
               )}
            </div>
            <div className="flex flex-col">
               <div className="flex flex-row justify-between font-montserratBold py-5">
                  <div className="text-sm text-contenta-greyish-brown ">
                     Newest Compliance
                  </div>
                  <div className="text-sm text-contenta-tractor-red">
                     <a href="#"
                        className="flex flex-row items-center"
                        onClick={(e) => {
                           e.preventDefault();
                           Router.push(`compliance/filter?type=All`)
                        }}
                     >
                        See all <BiChevronRight size={24} />
                     </a>
                  </div>
               </div>
               <div className="flex flex-col lg:flex-row xl:flex-row fhd:items-start xxl:items-start xl:items-start items-center flex-wrap m-2 gap-3">
                  {data?.map((item, i) => {
                     if(i < 8) {
                        return <div
                                 className="flex-1 items-center justify-center rounded max-w-sm cursor-pointer"
                                 key={i}
                                 onClick={(e) => {
                                    e.preventDefault();
                                    Router.push(`${item.view_node}`)
                                 }}
                              >
                              <div className="flex flex-col justify-center items-center flex-wrap fhd:max-w-md xxl:max-w-md xl:max-w-md lg:max-w-md fhd:min-w-md xxl:min-w-md xl:min-w-md min-w-64 bg-white rounded-xl shadow-lg ">
                                 <img
                                    className="
                                       object-cover 
                                       fhd:h-72 
                                       xxl:h-60 
                                       xl:h-60 
                                       lg:h-48 
                                       w-full
                                       rounded-tl-xl 
                                       rounded-tr-xl
                                       "
                                    src={item.image_raw}
                                 />
                                 <div className="text-sm break-normal mt-3 px-3 text-contenta-greyish-brown font-montserratBold truncate fhd:max-w-sm xxl:max-w-sm xl:max-w-xs lg:max-w-56 max-w-xs">
                                    {item.title}
                                 </div>
                                 <div className="flex flex-row fhd:text-xs xxl:text-xs xl:text-xs lg:text-xxs text-xs fhd:m-2 xxl:m-2 xl:m-2 items-center text-gray-700">
                                    <div className="text-contenta-greyish-brown font-montserratRegular">
                                       Added {item.created}
                                    </div>
                                 </div>
                                 <div
                                    className="text-sm break-normal px-3 text-sodexo-dark-purple-blue pb-4"
                                 >
                                    {
                                       item.category === 'Certification' && 
                                       (
                                          <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-seaweed-green text-contenta-jungle-green">
                                             Certification
                                          </div>
                                       )
                                    }
                                    {
                                       item.category === 'Regulation' && 
                                       (
                                          <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex text-contenta-darkish-red bg-contenta-pinky-red">
                                             Regulation
                                          </div>
                                       )
                                    }
                                    {
                                       item.category === 'Documentation' && 
                                       (
                                          <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-blue text-contenta-light-blue">
                                             Documentation
                                          </div>
                                       )
                                    }
                                    {
                                       item.category === 'Policy' && 
                                       (
                                          <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex bg-gray-300 text-contenta-greyish-brown">
                                             Policy
                                          </div>
                                       )
                                    }
                                 </div>
                              </div>
                           </div>
                        }
                     }
                  )}
               </div>
            </div>
         </div>
      </>
   )
}
