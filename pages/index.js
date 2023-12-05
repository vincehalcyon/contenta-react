import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDollarCircle, AiFillFileWord, AiFillSetting, AiOutlineExclamationCircle } from "react-icons/ai";
import { BiShieldQuarter } from "react-icons/bi";
import { FaChevronRight, FaClipboardList, FaCoins } from "react-icons/fa";
import Router, { useRouter } from 'next/router';
import Header from "components/Header/Header";

export default function Home() {

   const router = useRouter();

   const [data, setData] = useState();
   const [newsRoom, setNewsRoom] = useState();
   const getNewsRoom = () => {
      axios
         .get(`https://s3.staging.halcyondigitalhost.com/node/api/newsroom`)
         .then((res) => {

            setNewsRoom(res.data)
         })
   }
   useEffect(() => {
      axios
         .get(`https://s3.staging.halcyondigitalhost.com/node/api/pages`)
         .then((res) => {
            console.log(res);
            setData(res.data);
         });
      getNewsRoom()
      console.log("res", newsRoom)
   }, [newsRoom]);


   const actionRequired = [
      {
         claim: 'Claim ID',
         codeClaim: 'CL90210',
         policy: 'Policy No.',
         policyCode: 'PA90210',
         insured: 'Insured Name',
         name: 'Gaal Dornick',
      },
      {
         claim: 'Claim ID',
         codeClaim: 'CL90211',
         policy: 'Policy No.',
         policyCode: 'PA90211',
         insured: 'Insured Name',
         name: 'Salvor Hardin',
      },
      {
         claim: 'Claim ID',
         codeClaim: 'CL90212',
         policy: 'Policy No.',
         policyCode: 'PA90212',
         insured: 'Insured Name',
         name: 'Eto Demerzel',
      },
   ]

   
   const alertList = [
		{
			id: 1,
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet consequat nec feugiat porttitor non fames vitae. Bibendum at purus mattisi psum aliquam et feugiat.',
		},
		{
			id: 3,
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet consequat nec feugiat porttitor non fames vitae. Bibendum at purus mattisi psum aliquam et feugiat.',
		},
		{
			id: 4,
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet consequat nec feugiat porttitor non fames vitae. Bibendum at purus mattisi psum aliquam et feugiat.',
		},
      {
			id: 5,
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet consequat nec feugiat porttitor non fames vitae. Bibendum at purus mattisi psum aliquam et feugiat.',
		},
	]

   return (
      <>
         <Header page="Welcome " />
         <div className="flex flex-col px-7 py-10 items">
            <div className="flex flex-wrap">
               <div className="w-full xl:pr-5 pr-0 xl:w-9/12 lg:w-full">
                  <div className="flex items-center">
                     <h3 className="text-sm text-contenta-greyish-brown font-montserratBold">Quick Links</h3>
                  </div>
                  <div className="block py-6 shadow-sm">
                     <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4">
                        <div 
                           className="flex flex-col cursor-pointer"
                           onClick={(e) => {
                              e.preventDefault();
                              Router.push(`#`)
                           }}
                        >
                           <div className="rounded-md bg-white content-shadow flex justify-center rounded-xl p-5 hover:bg-gray-200">
                              <BiShieldQuarter className="text-contenta-light-blue" size={56} />
                           </div>
                           <div className="flex justify-center text-xs pt-2 font-MontserratRegular text-contenta-navy-blue">
                              <a href="#">
                                 Policy Management
                              </a>
                           </div>
                        </div>
                        <div 
                           className="flex flex-col cursor-pointer"
                           onClick={(e) => {
                              e.preventDefault();
                              Router.push(`#`)
                           }}
                        >
                           <div className="rounded-md bg-white content-shadow flex justify-center rounded-xl p-5 hover:bg-gray-200">
                              <FaClipboardList className="text-contenta-light-blue" size={56} />
                           </div>
                           <div className="flex justify-center text-xs pt-2 font-MontserratRegular text-contenta-navy-blue">
                              <a href="#">
                                 Lodge new claim
                              </a>
                           </div>
                        </div>
                        <div 
                           className="flex flex-col cursor-pointer"
                           onClick={(e) => {
                              e.preventDefault();
                              Router.push(`#`)
                           }}
                        >
                           <div className="rounded-md bg-white content-shadow flex justify-center rounded-xl p-5 hover:bg-gray-200">
                              <AiFillDollarCircle className="text-contenta-light-blue" size={56} />
                           </div>
                           <div className="flex justify-center text-xs pt-2 font-MontserratRegular text-contenta-navy-blue">
                              <a href="#">
                                 Make payment
                              </a>
                           </div>
                        </div>
                        <div 
                           className="flex flex-col cursor-pointer"
                           onClick={(e) => {
                              e.preventDefault();
                              Router.push(`#`)
                           }}
                        >
                           <div className="rounded-md bg-white content-shadow flex justify-center rounded-xl p-5 hover:bg-gray-200">
                              <FaCoins className="text-contenta-light-blue" size={56} />
                           </div>
                           <div className="flex justify-center text-xs pt-2 font-MontserratRegular text-contenta-navy-blue">
                              <a href="#">
                                 Broker Rewards
                              </a>
                           </div>
                        </div>
                        <div 
                           className="flex flex-col cursor-pointer"
                           onClick={(e) => {
                              e.preventDefault();
                              Router.push(`#`)
                           }}
                        >
                           <div className="rounded-md bg-white content-shadow flex justify-center rounded-xl p-5 hover:bg-gray-200">
                              <AiFillFileWord className="text-contenta-light-blue" size={56} />
                           </div>
                           <div className="flex justify-center text-xs pt-2 font-MontserratRegular text-contenta-navy-blue">
                              <a href="#">
                                 View Documents
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-row justify-between py-5">
                     <div className="text-sm text-contenta-greyish-brown font-montserratBold">
                        Action Required (28)
                     </div>
                     <div className="text-xs font-montserratBold text-contenta-pinky-red">
                        <a href="#">View all</a>
                     </div>
                  </div>
                  {/* DESKTOP VIEW */}
                  <div className="flex flex-col gap-2 max-height-content rounded-lg">
                     {actionRequired.map((items, index) => {
                     if(index < 3) { 
                        return <div className="p-5 xl:block lg:block hidden xl:my-0 bg-white content-shadow rounded-lg">
                              <div className="grid xl:grid-cols-4 lg:grid-cols-4">
                                 <div className="flex items-center">
                                    <div className="h-20 w-14 rounded-lg p-1 flex items-center justify-center flex-col bg-contenta-light-blue">
                                       <div className="text-2xl text-white font-montserratBold">
                                          Oct
                                       </div>
                                       <div className="text-2xl text-white font-montserratBold">
                                          13
                                       </div>
                                    </div>
                                    <div className="flex flex-col mx-4">
                                       <div className="text-xs text-contenta-greyish-brown font-MontserratRegular">
                                          {items.claim}
                                       </div>
                                       <div className="text-gray-600 text-sm text-contenta-greyish-brown font-montserratBold">
                                          {items.codeClaim}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex items-center">
                                    <div className="flex flex-col mx-4">
                                       <div className="text-xs text-contenta-greyish-brown font-MontserratRegular">
                                          {items.policy}
                                       </div>
                                       <div className="text-gray-600 text-sm text-contenta-greyish-brown font-montserratBold">
                                          {items.policyCode}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex items-center">
                                    <div className="flex flex-col mx-4">
                                       <div className="text-xs text-contenta-greyish-brown font-MontserratRegular">
                                          {items.insured}
                                       </div>
                                       <div className="text-gray-600 text-sm text-contenta-greyish-brown font-montserratBold">
                                          {items.name}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex items-center justify-end">
                                    <div className="flex flex-col">
                                       <button
                                          name=""
                                          className="btn-width py-2 rounded-lg bg-transparent border-2 border-contenta-light-blue text-contenta-light-blue text-sm transition duration-300 ease-in-out focus:outline-none font-montserratBold hover:bg-contenta-light-blue hover:text-white"
                                          type="button"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             Router.push(`#`)
                                          }}
                                       >
                                          Review
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        }
                     })}
                     
                     {/* MOBILE VIEW */}
                     {actionRequired.map((items, index) => {
                        if(index < 3) { 
                           return <div key={index} className="content-shadow overflow-y-auto max-height-content rounded-lg py-5 px-5 xl:hidden lg:hidden block xl:my-0 my-5 bg-white">
                              <div className="flex flex-col">
                                 <div className="w-full flex items-center ">
                                    <div className="h-20 md:w-14 rounded-lg p-3 flex items-center justify-center flex-col bg-contenta-light-blue">
                                       <div className="text-2xl text-white font-montserratBold">
                                          Oct
                                       </div>
                                       <div className="text-2xl text-white font-montserratBold">
                                          13
                                       </div>
                                    </div>
                                    <div className="flex flex-col ml-3 w-full">
                                       <div className="text-xs text-contenta-greyish-brown font-MontserratRegular">
                                          {items.claim}
                                       </div>
                                       <div className="text-gray-600 text-sm text-contenta-greyish-brown font-montserratBold">
                                          {items.codeClaim}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex flex-col sm:flex-row w-full items-center">
                                    <div className="flex flex-col w-full md:py-0 py-2">
                                       <div className="text-xs text-contenta-greyish-brown font-MontserratRegular">
                                          {items.policy}
                                       </div>
                                       <div className="text-gray-600 text-sm text-contenta-greyish-brown font-montserratBold">
                                          {items.policyCode}
                                       </div>
                                    </div>
                                    <div className="flex flex-col w-full md:py-0 py-2">
                                       <div className="text-xs text-contenta-greyish-brown font-MontserratRegular">
                                          {items.insured}
                                       </div>
                                       <div className="text-gray-600 text-sm text-contenta-greyish-brown font-montserratBold">
                                          {items.name}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="flex items-center md:justify-end justify-center ">
                                       <button
                                          name=""
                                          className="btn-width py-2 rounded-lg bg-transparent border-2 border-contenta-light-blue text-contenta-light-blue text-sm transition duration-300 ease-in-out focus:outline-none font-montserratBold hover:bg-contenta-light-blue hover:text-white"
                                          type="button"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             Router.push(`#`)
                                          }}
                                       >
                                          Review
                                       </button>
                                 </div>
                              </div>
                           </div>
                        }
                     })}
                  </div>
               </div>
               <div className="w-full xl:w-3/12">
                  <div className="flex flex-row justify-between">
                     <div className="text-sm text-contenta-greyish-brown font-montserratBold">
                        Alerts
                     </div>
                     <div 
                        className="text-contenta-gray cursor-pointer"
                        onClick={(e) => {
                           e.preventDefault();
                           Router.push(`/alerts/alert-settings`)
                        }}
                     >
                        <AiFillSetting />
                     </div>
                  </div>
                  <div className="flex flex-col content-shadow rounded-xl my-5 bg-white ">
                     {alertList.map((items, i) =>{
                       if(i < 4)  return  <div className="flex flex-row items-center py-5 border-b-1 border-contenta-line-gray" key={i}>
                           <div className="p-5 text-contenta-blue">
                              <AiOutlineExclamationCircle size={32} />
                           </div>
                           <div className="text-contenta-greyish-brown text-sm font-MontserratRegular">
                              {items.body}
                           </div>
                        </div>
                     })}
                     <div className="p-5 flex justify-center text-xs font-montserratBold text-contenta-pinky-red">
                        <a href="/alerts/">Show More</a>
                     </div>
                  </div>
               </div>
            </div>
            <div className="text-sm py-5 text-contenta-greyish-brown font-montserratBold">
               Latest Article
            </div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
               {newsRoom?.map((items, i) => {
                  if(i < 4) return <div key={i} className=" rounded-xl overflow-hidden content-shadow p-5 bg-white">
                     <div className="flex justify-between items-center">
                        <span className="text-xxs flex items-center text-contenta-greyish-brown font-montserratBold mb-2">
                           <img src={items.category_image} alt=""/>{items.category_name}
                        </span>
                        <span className="text-xxs text-contenta-greyish-brown font-MontserratRegular">
                           {items.created}
                        </span>
                     </div>
                     <div className="font-montserratBold text-contenta-greyish-brown text-sm h-20">
                        <p>{items.title}</p>
                     </div>
                     <div className="flex items-center justify-end text-xs font-montserratBold text-contenta-pinky-red cursor-pointer">
                        <a href="#"
                           onClick={(e) => {
                              e.preventDefault();
                              router.push(`/newsroom/${items.category_id}`)
                           }}
                        >
                           Read Article
                        </a>
                        <FaChevronRight />
                     </div>
                  </div>
               })}
            </div>
         </div>
      </>
   );
}

