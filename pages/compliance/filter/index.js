import Header from "components/Header/Header";
import React, { Fragment, useEffect, useState } from "react";
import Router, { useRouter } from 'next/router';
import { useRequest } from "lib/custom-hook";
import axios from "axios";

export default function Filter() {
   const router = useRouter();
   // const queryType = router.query.type ? router.query.type : "";
   const status = router.query.status ? router.query.status : "";
   const type = router.query.type

   const taxonomy = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/taxonomy/api/compliance`)

      setTabs([{
         name: "All",
         link: "filter?type=All",
      }, ...response.data])
      console.log('response', tabs)
   }

   const getCompliance = () => {
      axios
         .get(`${process.env.NEXT_PUBLIC_API_URL}/node/api/compliance`)
         .then((res) => {
            console.log("atay", res.data)
            setCompliance(res.data)
         })
   }

   const {data: allComplianceData, isValidating: compliancesValidating, mutate: updateCompliance} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/node/api/compliance`})
   const {data: tabsData, isValidating: tabsIsValidating, mutate: updateTabs} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/taxonomy/api/compliance`})

   const tabs = tabsData ? [{
      name: "All",
      link: "filter?type=All",
   }, ...tabsData] : null

   const allCompliance = allComplianceData || null

   const [filterCompliance, setFilterCompliance] = useState(allCompliance || null)

   useEffect(() => {
      // console.log("type", router.asPath)
      // console.log(router.query.status, "router.query.status")
      if (router.asPath.includes('type') && allCompliance) {
         if (type !== 'All') {

            const filtered = allCompliance.filter(item => item.category === type)
            setFilterCompliance(filtered)

            return
         }
         
         setFilterCompliance(allCompliance)
         router.push("/compliance/filter?type=All")
         
         return
      }

      router.push("/compliance/filter?type=All")
     
   }, [type, router.query.status, allCompliance])
   const tabLength = tabs?.map((itm, index) => allCompliance?.filter(item => item.category === itm.name).length)

   return (
      <>
         {tabs &&
            <Fragment>
               <Header page="Compliance " />
               <div className="flex flex-col px-7 py-10 items">
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
                                 className={tab.name.includes(type) ? 'text-sm py-3 font-montserratBold text-contenta-greyish-brown border-b-4 border-contenta-blue cursor-pointer' : 'text-contenta-gray py-3 my-2 text-sm font-montserratBold cursor-pointer'}
                                 aria-label={tab.name}
                                 onClick={() => {
                                    router.push(`filter?type=${tab.name}`)
                                    console.log('tab', tab.name)
                                    setFilterCompliance(allCompliance)
                                    if (tab.name !== 'All') {

                                       const filtered = allCompliance.filter(item => item.category === tab.name)
                                       setFilterCompliance(filtered)

                                       return
                                    }

                                    setFilterCompliance(allCompliance)
                                    // console.log('type', filterCompliance);

                                 }}
                              >
                                 {`${tab.name} (${tabLength[0] === index ? allCompliance.length : tabLength[index]})`}
                              </div>
                           )
                        )}
                  </div>
                  <div className="flex flex-col mt-8 mb-4 items-center">
                     {/* <div className="flex flex-col lg:flex-row xl:flex-row flex-wrap w-full gap-3"> */}
                     {filterCompliance?.length > 0 ?
                        <>
                           <div className="grid grid-flow-row lg:grid-cols-4 grid-cols-1 grid-rows-1 ">
                              {filterCompliance?.map((item, i) =>
                                 <div
                                    key={i}
                                    className="flex-col justify-center flex-wrap max-w-md min-w-md bg-white rounded-xl m-3 content-shadow cursor-pointer"
                                    onClick={(e) => {
                                       e.preventDefault();
                                       Router.push(`${item.view_node}`)
                                    }}
                                 >
                                    <div className="bg-auto bg-no-repeat bg-center">
                                       <img
                                          className="object-cover xxl:h-60 xxl:w-94 xl:h-52 xl:w-56 lg:h-60 lg:w-72 w-full rounded-tl-xl rounded-tr-xl"
                                          src={item.image_raw} height="150" width="239"
                                       />
                                    </div>
                                    <div className="text-sm break-normal flex flex-col m-3 justify-center items-center text-sm text-contenta-greyish-brown font-montserratBold">
                                       <span>{item.title} </span>
                                    </div>
                                    <div className="flex flex-row justify-center text-sm m-3 items-center">
                                       <div className="text-contenta-greyish-brown font-montserratRegular">
                                          Added {item.created}
                                       </div>
                                    </div>
                                    <div
                                       className="break-normal flex justify-center my-2 mx-4 cursor-pointer pb-4"
                                    >
                                       {
                                          item.category === 'Certification' && 
                                          (
                                             <div className="px-4 py-1 bg-opacity-50 rounded-lg text-sm font-montserratBold justify-center flex bg-contenta-seaweed-green text-contenta-jungle-green">
                                                Certification
                                             </div>
                                          )
                                       }
                                       {
                                          item.category === 'Regulation' && 
                                          (
                                             <div className="px-4 py-1 bg-opacity-50 rounded-lg text-sm font-montserratBold justify-center flex text-contenta-darkish-red bg-contenta-pinky-red">
                                                Regulation
                                             </div>
                                          )
                                       }
                                       {
                                          item.category === 'Documentation' && 
                                          (
                                             <div className="px-4 py-1 bg-opacity-50 rounded-lg text-sm font-montserratBold justify-center flex bg-contenta-blue text-contenta-light-blue">
                                                Documentation
                                             </div>
                                          )
                                       }
                                       {
                                          item.category === 'Policy' && 
                                          (
                                             <div className="px-4 py-1 bg-opacity-30 rounded-lg text-sm font-montserratBold justify-center flex bg-contenta-greyish-brown text-contenta-greyish-brown">
                                                Policy
                                             </div>
                                          )
                                       }
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
