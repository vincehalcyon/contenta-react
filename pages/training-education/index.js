import Header from "components/Header/Header";
import React, { useEffect, useState } from "react";
import Router, { useRouter } from 'next/router';
import { IoMdDownload } from "react-icons/io";
import AppButton from "components/Base/AppButton";
import { useRequest } from "lib/custom-hook";
import AppLoading from "components/Base/AppLoading";
import { AiOutlineDownload } from "react-icons/ai";

export default function TrainingEducation() {

   const router = useRouter();
   // const queryType = router.query.type ? router.query.type : "";
   const status = router.query.status ? router.query.status : "";
   const type = router.query.type

   const {data: allTrainingEducation, isValidating: trainingValidating, mutate: updateTraining} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/node/api/training-education`})
   const {data: tabsData, isValidating: tabsIsValidating, mutate: updateTabs} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/taxonomy/api/training-education`})

   const tabs = tabsData ? [{
      name: "All",
      link: "training-education?type=All",
   }, ...tabsData] : null

   
   const allTrainings = allTrainingEducation || null
   const [filterTraining, setFilterTraining] = useState(allTrainings)
   const [itemLimit, setItemLimit] = useState(4)
   const [loading, setLoading] = useState(false)

   useEffect(() => {

      if (router.asPath.includes('type') && allTrainings) {
         if (type !== 'All') {

            const filtered = allTrainings.filter(item => item.category_name === type)
            setFilterTraining(filtered)

            return
         }
         
         setFilterTraining(allTrainings)
         router.push("training-education?type=All")
         
         return
      }

      router.push("training-education?type=All")
     
   }, [type, router.query.status, allTrainings])

   console.log( "filterTraining", router.query.type )

   const tabLength = tabs?.map((itm, index) => allTrainings?.filter(item => item.category_name === itm.name).length)
   console.log("tabs", tabs)
   
   return (
      <>
         <Header page=" " />
         <div className="flex flex-col px-7 py-5 items">
            <div className="flex items-center overflow-x-auto whitespace-nowrap gap-4">
               {tabs &&
                  tabs.map((tab, index) =>
                     tab.title === status ? (
                        <div
                           key={index}
                           className="cursor-pointer w-full py-3  text-sm text-center whitespace-nowrap px-4 cursor-pointer"
                        >
                           {tab.name}
                        </div>
                     ) : (
                        <div
                           key={index}
                           className={tab.name.includes(type) ? 'text-sm py-3 mx-5 font-montserratBold text-contenta-greyish-brown border-b-4 border-contenta-blue cursor-pointer' : 'text-contenta-gray mx-5 py-3 my-2 text-sm font-montserratBold cursor-pointer'}
                           aria-label={tab.name}
                           onClick={() => {
                              router.push(`training-education?type=${tab.name}`)
                              console.log('tab', tab.name)
                              if (tab.name !== 'All Documents') {

                                 const filtered = allTrainings.filter(item => item.category_name === tab.name)
                                 setFilterTraining(filtered)

                                 return
                              }

                              setFilterTraining(allTrainings)
                              // console.log('type', filterTraining);

                           }}
                        >
                           {`${tab.name} (${tabLength[0] === index ? allTrainings.length : tabLength[index]})`}
                        </div>
                     )
                  )}
            </div>
            <div className="flex flex-col py-5">
               {filterTraining?.length ?
                  <>
                     <div className="grid grid-flow-row lg:grid-cols-4 grid-cols-1 grid-rows-1 ">
                        {filterTraining?.map((item, i) => {
                           if(i < itemLimit) {
                              const frame = item.video_url.split("/")
                              return <div
                                       className="flex flex-col flex-wrap max-w-md min-w-md bg-white rounded-xl m-3 content-shadow"
                                    >
                                    <div className="videoWrapper">
                                       {console.log(item.video_url.split("/")[frame.length - 1] , 'url')}
                                       <iframe
                                          src={`https://player.vimeo.com/video/${item.video_url.split("/")[frame.length - 1]}?embedparameter=value`}  
                                          width="100%" frameborder="0" allowfullscreen
                                          className="rounded-tr-xl rounded-tl-xl"
                                       />
                                    </div>
                                    <div className="text-sm break-normal flex flex-col m-3 justify-center items-center text-sm text-contenta-greyish-brown font-montserratBold">
                                       <span>{item.title}</span>
                                    </div>
                                    <div className="flex flex-row justify-center text-sm p-5 items-center gap-3">
                                       <div className="m-1 bg-contenta-blue bg-opacity-50 text-contenta-light-blue px-3 rounded-lg">
                                          {item.duration_hours !== '' ? `${item.duration_hours} hr ${item.duration_minutes !== '' ? `and ${item.duration_minutes} min/s` : ''}` : item.duration_minutes !== '' ? `${item.duration_minutes} min/s` : '00'}
                                       </div>
                                       <div className="text-contenta-greyish-brown font-montserratRegular">
                                          Added {item.created}
                                       </div>
                                    </div>
                                    <div className="flex items-center gap=2">
                                       {item.file !== "" && (<button
                                             className="flex w-full justify-center bg-contenta-blue p-3 rounded-bl-xl rounded-br-xl text-white font-montserratBold text-sm cursor-pointer hover:bg-contenta-blue-hover"
                                          >
                                             <AiOutlineDownload size={24}/> Training Notes (PDF)
                                          </button>)
                                       }
                                    </div>
                                 </div>
                              }
                           }
                        )}
                     </div>
                  </> : <>
                           <div className="flex justify-center w-full text-sm p-10 text-contenta-greyish-brown">
                              No Results Found
                           </div>        
                        </>
               }
            </div>
            <div className="flex justify-center py-5">
               <button
                  className="py-2 px-5 rounded-lg bg-transparent border-2 border-contenta-light-blue text-contenta-light-blue text-sm transition duration-300 ease-in-out focus:outline-none font-montserratBold hover:bg-contenta-light-blue hover:text-white"
                  // labelClass=""
                  onClick={(e) => {
                     e.preventDefault();
                     setLoading(true)
                     setTimeout(() => {
                        setItemLimit(itemLimit + 4)
                        setLoading(false)
                     }, 500)
                  }}
               >
                  {loading ? 'loading...' : 'Load more training videos' }
               </button>
            </div>
         </div>
      </>
   )
}
