import Header from "components/Header/Header";
import React, { useEffect, useState } from "react";
import Router, { useRouter } from 'next/router';
import axios from "axios";
import { useRequest } from "lib/custom-hook";

export default function DocumentLibrary() {

   const router = useRouter();
   // const queryType = router.query.type ? router.query.type : "";
   const status = router.query.status ? router.query.status : "";
   const type = router.query.type

   const {data: allDocumentsLibrary, isValidating: documentsValidating, mutate: updateDocuments} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/node/api/document_library`})
   const {data: tabsData, isValidating: tabsIsValidating, mutate: updateTabs} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/taxonomy/api/document_library`})

   const tabs = tabsData ? [{
      name: "All",
      link: "document-library?type=All",
   }, ...tabsData] : null

   const allDocuments = allDocumentsLibrary || null
   const [filterDocuments, setFilterDocuments] = useState(allDocuments || null)

   useEffect(() => {
      if (router.asPath.includes('type') && allDocuments) {
         if (type !== 'All') {

            const filtered = allDocuments.filter(item => item.category_name === type)
            setFilterDocuments(filtered)

            return
         }
         
         setFilterDocuments(allDocuments)
         router.push("document-library?type=All")
         
         return
      }

      router.push("document-library?type=All")
     
   }, [type, router.query.status, allDocuments])

   const tabLength = tabs?.map((itm, index) => allDocuments?.filter(item => item.category_name === itm.name).length)

   console.log("tabs", tabs)

   return (
      <>
         <Header page="Document Library " />
         <div className="flex flex-col px-7 py-10 items">
            <div className="flex items-center overflow-x-auto whitespace-nowrap gap-4">
               {tabs?.length &&
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
                              router.push(`document-library?type=${tab.name}`)
                              console.log('tab', tab.name)
                              setFilterDocuments(allDocuments)
                              if (tab.name !== 'All') {

                                 const filtered = allDocuments.filter(item => item.category_name === tab.name)
                                 setFilterDocuments(filtered)

                                 return
                              }

                              setFilterDocuments(allDocuments)
                              // console.log('type', filterDocuments);

                           }}
                        >
                           {`${tab.name} (${tabLength[0] === index ? allDocuments.length : tabLength[index]})`}
                        </div>
                     )
                  )}
            </div>
            <div className="flex flex-col py-5">
               {filterDocuments?.length > 0 ? 
                  <>
                     <div className="grid grid-flow-row lg:grid-cols-4 grid-cols-1 grid-rows-1 ">
                        { filterDocuments?.map(item, i =>
                           <div
                           className="flex-col justify-center flex-wrap max-w-md min-w-md bg-white rounded-xl m-3 content-shadow cursor-pointer"
                           onClick={(e) => {
                              e.preventDefault();
                              Router.push(`${item.view_node}`)
                           }}
                        >
                           <div className="bg-auto bg-no-repeat bg-center">
                              <img
                                 className="object-cover xxl:h-60 xxl:w-94 xl:h-52 xl:w-56 lg:h-60 lg:w-72 w-full rounded-tl-xl rounded-tr-xl"
                                 src={item.image} height="150" width="239"
                              />
                           </div>
                           <div className="text-sm break-normal flex flex-col m-3 justify-center items-center text-sm text-contenta-greyish-brown font-montserratBold">
                              <span>
                                 {item.title}
                              </span>
                           </div>
                           <div className="flex flex-row justify-center text-sm m-3 items-center">
                              <div className="text-contenta-greyish-brown font-montserratRegular">
                                 Added {item.post_date}
                              </div>
                           </div>
                           <div
                              className="break-normal flex justify-center my-2 mx-4 cursor-pointer pb-4"
                           >
                              {
                                 item.category_name === 'Policy' && 
                                 (
                                    <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-seaweed-green text-contenta-jungle-green">
                                       Policy
                                    </div>
                                 )
                              }
                              {
                                 item.category_name === 'Brochure' && 
                                 (
                                    <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex text-contenta-darkish-red bg-contenta-pinky-red">
                                       Brochure
                                    </div>
                                 )
                              }
                              {
                                 item.category_name === 'Claim' && 
                                 (
                                    <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-blue text-contenta-light-blue">
                                       Claim
                                    </div>
                                 )
                              }
                              {
                                 item.category_name === 'Other' && 
                                 (
                                    <div className="px-4 py-1 rounded-xl text-sm font-montserratBold justify-center flex bg-opacity-50 bg-contenta-greyish-brown text-contenta-greyish-brown">
                                       Other
                                    </div>
                                 )
                              }
                           </div>
                        </div>
                        )}
                     </div>  
                  </> : <>
                           <div className="flex justify-center w-full text-sm p-10 text-contenta-greyish-brown">
                              No Results Found
                           </div>
                        </>
               }
            </div>
         </div>
      </>
   )
}
