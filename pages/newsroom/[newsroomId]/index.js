import { BiChevronLeft } from "react-icons/bi";
import Header from "components/Header/Header";
import Router, { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";
import { useRequest } from "lib/custom-hook";
import Link from "next/link";

const NewsroomPerPage = () => {
   const router = useRouter();
   const { newsroomId } = router.query;

   console.log('newsRoom', newsroomId)

   const {data: newsRoom, isValidating: newsRoomIsValidating, mutate: updateNewsRoom} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/node/api/newsroom`})
   const data = newsRoom && newsRoom.find((item) => item.view_node === `/newsroom/${newsroomId}`)

   console.log('news', newsRoom)
   console.log("data", data)

   return (
      <Fragment>
         <Header page="Newsroom " />
         <div className="flex flex-col px-7 py-10 items">
            <div className="pb-5 text-sm text-contenta-greyish-brown font-montserratBold">
               <a href="#"
                  className="flex text-sm items-center justify-reverse cursor-pointer text-xs font-montserratBold text-contenta-pinky-red"
                  onClick={(e) => {
                     e.preventDefault();
                     router.push(`/compliance/`)
                  }}
               >
                  <BiChevronLeft size={25} /> Back to Newsroom
               </a>
            </div>
            <div className="flex flex-col flex-wrap py-5">
               {data && 
                  <div className="flex flex-row gap-5">
                     <div className="w-full pr-5 xl:w-9/12 lg:w-full content-shadow bg-white rounded-lg p-5">
                        <div className="px-6 py-4 text-contenta-greyish-brown">
                           <div className="flex justify-between items-center">
                              <span className="text-xxs flex items-center text-contenta-greyish-brown font-montserratBold mb-2">
                                 <img src={data?.category_image} alt=""/>{data?.category_name}
                              </span>
                              <span className="text-xxs text-contenta-greyish-brown font-MontserratRegular">
                                 {data?.created}
                              </span>
                           </div>
                           <div className="font-montserratBold text-xl py-5">
                              {data?.title}
                           </div>
                           <div className="flex text-xxs gap-1">
                              <span className="font-montserratRegular text-contenta-greyish-brown">From:</span>
                              <a href="#" className="text-contenta-blue">www.cnbc.com</a>
                           </div>
                           <div className="py-5">
                              <p
                                 className=""
                                 dangerouslySetInnerHTML={{
                                    __html: data?.body,
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col w-full xl:w-3/12">
                        <div className="pb-5 text-sm text-contenta-greyish-brown font-montserratBold">
                           Latest Article
                        </div>
                        <div className="gap-3">
                           {newsRoom && newsRoom.map(item => 
                              <div key={item?.id} className="max-w-sm rounded-xl overflow-hidden content-shadow bg-white mb-5" >
                                 <div className="px-6 py-4 text-contenta-greyish-brown">
                                    <div className="flex justify-between items-center">
                                       <span className="text-xxs flex items-center text-contenta-greyish-brown font-montserratBold mb-2">
                                          <img src={item.category_image} alt=""/>{item.category_name}
                                       </span>
                                       <span className="text-xxs text-contenta-greyish-brown font-MontserratRegular">
                                          {item.created}
                                       </span>
                                    </div>
                                    <div className="pt-3 text-sm font-montserratBold min-h-15">
                                       {item.title}
                                    </div>
                                 </div>
                                 <div className="px-6 py-4 pb-2 text-xxs flex justify-end items-center font-montserratBold text-contenta-pinky-red hover:text-contenta-tractor-red">
                                    <Link href={`${item.view_node}`}>Read Article</Link>
                                    <FaChevronRight />
                                 </div>
                              </div>
                           )}
                        </div>
                        <div className="pb-5 flex justify-center text-sm text-contenta-greyish-brown font-montserratBold">
                           <a href="#"
                              className="flex text-xxs items-center justify-reverse cursor-pointer text-xs font-montserratBold text-contenta-pinky-red"
                              onClick={(e) => {
                                 e.preventDefault();
                                 Router.push(`/newsroom`)
                              }}
                           >
                              See all articles
                           </a>
                        </div>
                     </div>
                  </div>
               }
            </div>
         </div>
      </Fragment>
   )
}
export default NewsroomPerPage;
