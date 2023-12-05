import React, { useEffect, useState } from "react";
import { MdPhoneInTalk } from "react-icons/md";
import { BsFillEnvelopeFill } from "react-icons/bs";
import Header from "components/Header/Header";
import axios from "axios";
import { useRequest } from "lib/custom-hook";


export default function ContactUs() {

   // const [data, setData] = useState();

   const {data, isValidating: tabsIsValidating, mutate: updateData} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/node/api/contact`})

   // useEffect(() => {
   //    axios
   //       .get(`https://s3.staging.halcyondigitalhost.com/node/api/contact`)
   //       .then((res) => {
   //          console.log(res);
   //          setData(res.data);
   //       });
   // }, [data]);

   return (
      <>
         <Header page="Contact Us " label="this is for Contact Us"/>
         <div className="flex flex-col px-7 py-10">
            <div className="w-full flex flex-col justify-center items-center">
               {data?.map((item,index) => {
                  return (
                     <div className="w-full flex flex-col items-center justify-center pb-7" key={index}>
                        <div className="w-1/3 py-5 text-sm font-montserratBold text-contenta-greyish-brown">
                           {item.title}
                        </div>
                        <div className="flex flex-col content-shadow bg-white rounded-lg w-1/3 p-5 text-contenta-greyish-brown">
                           <div className="flex flex-row py-3">
                              <div className="w-1/2 flex gap-2">
                                 <MdPhoneInTalk size={24}  /> 
                                 <span className="font-montserratRegular text-sm">
                                    {item.phone_label}
                                 </span>
                              </div>
                              <div className="w-full font-montserratBold text-sm">
                                 {item.phone_number}
                              </div>
                           </div>
                           <div className="flex flex-row py-3">
                              <div className="w-1/2 flex gap-2">
                                 <BsFillEnvelopeFill size={24}/>
                                 <span className="font-montserratRegular text-sm">
                                    Email
                                 </span>
                              </div>
                              <div className="w-full font-montserratBold text-sm">
                                 {item.email}
                              </div>
                           </div>
                           <div className="py-3 flex justify-center text-center italic text-sm px-5">
                              <p
                                 className=""
                                 dangerouslySetInnerHTML={{
                                    __html: item.body,
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>
      </>
   )
}
