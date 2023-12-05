import React, { Fragment, useEffect, useState } from "react";
import Header from "components/Header/Header";
import Router, { useRouter } from 'next/router';
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";
import { useRequest } from "lib/custom-hook";

export default function Newsroom() {

   const router = useRouter();

   const status = router.query.status ? router.query.status : "";
   const type = router.query.type

   const taxonomy = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/taxonomy/api/newsroom`)

      setTabs([{
         name: "All-Articles",
         link: "newsroom?type=All",
      }, ...response.data])
      console.log('response', tabs)
   }

   const {data: newsRoomData, isValidating: newsRoomIsValidating, mutate: updateNewsRoom} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/node/api/newsroom`})
   const {data: tabsData, isValidating: tabsIsValidating, mutate: updateTabs} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/taxonomy/api/newsroom`})
   
   const tabs = tabsData ? [{
      name: "All",
      link: "newsroom?type=All",
   }, ...tabsData] : null

   let newsRoom = newsRoomData || null

   const [filterNewsroom, setFilterNewsroom] = useState(newsRoom || null)
   useEffect(() => {
      
      if (router.asPath.includes('type') && newsRoom) {
         if (type !== 'All') {

            const filtered = newsRoom?.filter(item => item.category_name === type)
            setFilterNewsroom(filtered)
            return
         }

         setFilterNewsroom(newsRoom)

         router.push("newsroom?type=All")
         return
      }

      router.push("newsroom?type=All")
      // setTabsLenth()
   }, [type, router.query.status, newsRoom])
   const tabLength = tabs?.map((itm, index) => newsRoom?.filter(item => item.category_name === itm.name).length)
   console.log('newsRoom', tabs)
   console.log('filterNewsroom', newsRoom)

   return (
      <>
         {tabs && 
            <Fragment>
               <Header page="Newsroom " />
               <div className="flex flex-col px-7 py-10 items">
                  <div className="pb-5 text-sm text-contenta-greyish-brown font-montserratBold">
                     Latest Article
                  </div>
                  <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 pb-5">
                     {newsRoom?.map((items, i) =>
                        <div className=" rounded-xl overflow-hidden content-shadow p-5 bg-white" key={i}>
                           <div className="flex justify-between items-center">
                              <span className="text-xxs flex items-center text-contenta-greyish-brown font-montserratBold mb-2">
                                 <img src={items.category_image} alt="" />{items.category_name}
                              </span>
                              <span className="text-xxs text-contenta-greyish-brown font-MontserratRegular">
                                 {items.created}
                              </span>
                           </div>
                           <div className="font-montserratBold text-contenta-greyish-brown text-sm h-20">
                              {items.title}
                           </div>
                           <div className="flex items-center justify-end text-xs font-montserratBold text-contenta-pinky-red cursor-pointer">
                              <a href="#"
                                 onClick={(e) => {
                                    e.preventDefault();
                                    router.push(`${items.view_node}`)
                                 }}
                              >
                                 Read Article
                              </a>
                              <FaChevronRight />
                           </div>
                        </div>
                     )}
                  </div>
                  <div className="flex items-center overflow-x-auto whitespace-nowrap gap-4">
                     {tabs.length &&
                        tabs.map((tab, index) =>
                           tab.title === status ? (
                              <div
                                 key={index}
                                 className="cursor-pointer w-full py-3 text-sm text-center whitespace-nowrap px-4 cursor-pointer"
                              >
                                 {tab.name}
                              </div>
                           ) : (
                              <div
                                 key={index}
                                 className={tab.name.includes(type) ? 'text-sm py-3 mx-5 font-montserratBold text-contenta-greyish-brown border-b-4 border-contenta-blue cursor-pointer' : 'text-contenta-gray py-3 mx-5 text-sm font-montserratBold cursor-pointer'}
                                 aria-label={tab.name}
                                 onClick={() => {
                                    router.push(`newsroom?type=${tab.name}`)
                                    console.log('tab', tab.name)
                                    setFilterNewsroom(newsRoom)
                                    if (tab.name !== 'All') {

                                       const filtered = newsRoom.filter(item => item.category_name === tab.name)
                                       setFilterNewsroom(filtered)

                                       return
                                    }

                                    setFilterNewsroom(newsRoom)
                                    // console.log('type', filterNewsroom);

                                 }}
                              >
                                 {`${tab.name} (${tabLength[0] === index ? newsRoom.length : tabLength[index]})`}
                              </div>
                           )
                        )}
                  </div>
                  <div className="flex flex-col mt-8 mb-4">
                     {filterNewsroom?.length > 0 ?
                        <>
                           <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                              {filterNewsroom?.map((items, i) =>
                                 <div className=" rounded-xl overflow-hidden content-shadow p-5 bg-white" key={i}>
                                    <div className="flex justify-between items-center">
                                       <span className="text-xxs flex items-center text-contenta-greyish-brown font-montserratBold mb-2">
                                          <img src={items.category_image} alt="" />{items.category_name}
                                       </span>
                                       <span className="text-xxs text-contenta-greyish-brown font-MontserratRegular">
                                          {items.created}
                                       </span>
                                    </div>
                                    <div className="font-montserratBold text-contenta-greyish-brown text-sm h-20">
                                       {items.title}
                                    </div>
                                    <div className="flex items-center justify-end text-xs font-montserratBold text-contenta-pinky-red cursor-pointer">
                                       <a href="#"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             router.push(`${items.view_node}`)
                                          }}
                                       >
                                          Read Article
                                       </a>
                                       <FaChevronRight />
                                    </div>
                                 </div>
                              )}
                           </div>
                        </> : <>
                           <div className="flex justify-center w-full text-sm p-10 font-montserratRegular text-contenta-greyish-brown">
                              No Results Found
                           </div>
                        </>
                     }
                  </div>
               </div>
            </Fragment>
         }
      </>
   )
}
