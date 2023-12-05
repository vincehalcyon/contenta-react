import Header from 'components/Header/Header';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { IoMdDownload } from "react-icons/io";
import { useRequest } from 'lib/custom-hook';
import AppLoading from 'components/Base/AppLoading';

const DocumentPage = () => {
   const router = useRouter();
   const { documentId } = router.query;
   
   const {data: document, isValidating: documentIsValidating, mutate: updateData} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/node/api/document_library`})
   const data = document && document.find((item) => item.view_node === `/document-library/${documentId}`)

   return (
      <>
         <Header page="Document Library " />
         <div className="flex flex-col px-7 py-10">
            <div>
               <a href="#"
                  className="flex text-sm items-center justify-reverse cursor-pointer text-xs font-montserratBold text-contenta-pinky-red"
                  onClick={(e) => {
                     e.preventDefault();
                     router.back()
                  }}
               >
                  <div className="">
                     <BiChevronLeft size={25} />
                  </div>
                  <div className="my-2">
                     Back to Document Library
                  </div>
               </a>
            </div>
            <div className="flex flex-col flex-wrap py-5">
               <div className="flex flex-row gap-5">
                  <div className="w-full pr-5 xl:w-9/12 lg:w-full content-shadow bg-white rounded-lg p-5">
                     <div className="break-normal flex pb-5">
                        {
                           data?.category_name === 'Policy' && 
                           (
                              <div className="px-4 py-1 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-seaweed-green text-contenta-jungle-green">
                                 Policy
                              </div>
                           )
                        }
                        {
                           data?.category_name === 'Brochure' && 
                           (
                              <div className="px-4 py-1 rounded-xl text-sm font-montserratBold justify-center flex text-contenta-darkish-red bg-contenta-pinky-red">
                                 Brochure
                              </div>
                           )
                        }
                        {
                           data?.category_name === 'Claim' && 
                           (
                              <div className="px-4 py-1 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-blue text-contenta-light-blue">
                                 Claim
                              </div>
                           )
                        }
                        {
                           data?.category_name === 'Other' && 
                           (
                              <div className="px-4 py-1 rounded-xl text-sm font-montserratBold justify-center flex bg-gray-300 text-contenta-greyish-brown">
                                 Other
                              </div>
                           )
                        }
                     </div>
                   
                     {/* <div className="flex justify-center">
                        <img className="object-cover" src={data.image} />
                        <img className="object-cover" src="../img/sample-doc.jpg" />
                     </div> */}
                     <div>
                        <div className="flex justify-center">
                           {documentIsValidating && <AppLoading />}
                        </div>
                        {!documentIsValidating && 
                           <iframe width="100%" height="900" src={data.file} title="description"></iframe>
                        }
                     </div>
                  </div>
                  <div className="w-full xl:w-3/12">
                     <div className="flex flex-col lg:flex-row xl:flex-row flex-wrap w-full gap-3">
                        {data &&
                           <div key={data.category_id} className="flex-col justify-center flex-wrap max-w-md min-w-md bg-white rounded-xl content-shadow">
                              <img 
                                 className="object-cover xxl:h-60 xxl:w-94 xl:h-52 xl:w-56 lg:h-60 lg:w-72 rounded-tl-xl rounded-tr-xl" 
                                 src={data.image} height="150" width="239" 
                              />
                              <div className="text-sm break-normal flex m-3 justify-center items-center text-sm text-contenta-greyish-brown font-montserratBold">
                                 {data.title}
                              </div>
                              <div className="flex flex-row justify-center text-sm m-3 items-center">
                                 <div className="text-contenta-greyish-brown font-montserratRegular">
                                    Added {data.post_date}
                                 </div>
                              </div>
                              <div className="flex flex-row justify-center gap-2 text-sm">
                                 <div className="text-contenta-greyish-brown font-montserratRegular">
                                    Added by
                                 </div>
                                 <div className="font-montserratBold text-contenta-greyish-brown">
                                    {data.name}
                                 </div>
                              </div>
                              <div
                                 className="break-normal flex justify-center my-2 p-5"
                              >
                                 {
                                    data.category_name === 'Policy' && 
                                    (
                                       <div className="px-4 py-1 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-seaweed-green text-contenta-jungle-green">
                                          Policy
                                       </div>
                                    )
                                 }
                                 {
                                    data.category_name === 'Brochure' && 
                                    (
                                       <div className="px-4 py-1 rounded-xl text-sm font-montserratBold justify-center flex text-contenta-darkish-red bg-contenta-pinky-red">
                                          Brochure
                                       </div>
                                    )
                                 }
                                 {
                                    data.category_name === 'Claim' && 
                                    (
                                       <div className="px-4 py-1 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-blue text-contenta-light-blue">
                                          Claim
                                       </div>
                                    )
                                 }
                                 {
                                    data.category_name === 'Other' && 
                                    (
                                       <div className="px-4 py-1 rounded-xl text-sm font-montserratBold justify-center flex bg-gray-300 text-contenta-greyish-brown">
                                          Other
                                       </div>
                                    )
                                 }
                              </div>
                              <div
                                 className="flex justify-center bg-contenta-blue p-3 rounded-bl-xl rounded-br-xl text-white font-montserratBold text-sm cursor-pointer hover:bg-contenta-blue-hover"
                              >
                                 <IoMdDownload size={24} /> Download Copy
                              </div>
                           </div>
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
export default DocumentPage;