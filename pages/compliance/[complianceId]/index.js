import AppLoading from 'components/Base/AppLoading';
import Header from 'components/Header/Header';
import { useRequest } from 'lib/custom-hook';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { IoMdDownload } from "react-icons/io";
import { Document, Page, pdfjs } from 'react-pdf';

const CompliancePage = () => {

   const router = useRouter();
   const { complianceId } = router.query;
   
   const {data: compliance, isValidating: compIsValidating, mutate: updateData} = useRequest({url: `${process.env.NEXT_PUBLIC_API_URL}/node/api/compliance`})
   const data = compliance && compliance.find((item) => item.view_node === `/compliance/${complianceId}`)
   // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

   const [numPages, setNumPages] = useState(null);
   const [pageNumber, setPageNumber] = useState(1);

   function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
   }

   return (
      <>
         <Header page="Compliance " />
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
                     Back to Compliance
                  </div>
               </a>
            </div>
            <div className="flex flex-col flex-wrap py-5">
               <div className="flex flex-row gap-5">
                  <div className="w-full pr-5 xl:w-9/12 lg:w-full content-shadow rounded-lg p-5">
                     <div className="break-normal flex pb-4">

                        {
                           data?.category === 'Certification' && 
                           (
                              <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-seaweed-green text-contenta-jungle-green">
                                 Certification
                              </div>
                           )
                        }
                        {
                           data?.category === 'Regulation' && 
                           (
                              <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex text-contenta-darkish-red bg-contenta-pinky-red">
                                 Regulation
                              </div>
                           )
                        }
                        {
                           data?.category === 'Documentation' && 
                           (
                              <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-blue text-contenta-light-blue">
                                 Documentation
                              </div>
                           )
                        }
                        {
                           data?.category === 'Policy' && 
                           (
                              <div className="px-4 py-1 bg-opacity-30 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-greyish-brown text-contenta-greyish-brown">
                                 Policy
                              </div>
                           )
                        }
                     </div>
                     <div>
                        {compIsValidating && <AppLoading />}
                        {!compIsValidating && 
                           <iframe width="100%" height="900" src={data.file} title="description"></iframe>
                           // <iframe width="100%" height="900" src={`https://docs.google.com/gview?url=${data.file}&embedded=true`} title="description"></iframe>
                           // <>
                           //    <div className="border-2">
                           //       <iframe className="w-full h-full" src="https://docx.google.com/gview?url=http://writing.engr.psu.edu/workbooks/formal_report_template.docx&embedded=true"></iframe>
                           //    </div>
                           // </>
                        }
                     </div>
                  </div>
                  <div className="flex flex-col  w-full xl:w-3/12">
                     <div className="flex flex-col lg:flex-row xl:flex-row flex-wrap w-full gap-3 justify-center">
                        {data &&
                           <div key={data?.id} className="flex-col justify-center flex-wrap max-w-md min-w-md bg-white rounded-xl content-shadow">
                              <img 
                                 className="object-cover xxl:h-60 xxl:w-94 xl:h-52 xl:w-56 lg:h-60 lg:w-72 rounded-tl-xl rounded-tr-xl" 
                                 src={data?.image_raw} height="150" width="239" 
                              />
                              <div className="text-sm break-normal flex m-3 justify-center items-center text-sm text-contenta-greyish-brown font-montserratBold">
                                 {data?.title}
                              </div>
                              <div className="flex flex-row justify-center text-sm m-3 items-center">
                                 <div className="text-contenta-greyish-brown font-montserratRegular">
                                    Added {data?.created}
                                 </div>
                              </div>
                              <div className="flex flex-row justify-center gap-2 text-sm">
                                 <div className="text-contenta-greyish-brown font-montserratRegular">
                                    Added by
                                 </div>
                                 <div className="font-montserratBold text-contenta-greyish-brown">
                                    {data?.added_by}
                                 </div>
                              </div>
                              <div
                                 className="break-normal flex justify-center my-2 p-5"
                              >
                                 {
                                    data?.category === 'Certification' && 
                                    (
                                       <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-seaweed-green text-contenta-jungle-green">
                                          Certification
                                       </div>
                                    )
                                 }
                                 {
                                    data?.category === 'Regulation' && 
                                    (
                                       <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex text-contenta-darkish-red bg-contenta-pinky-red">
                                          Regulation
                                       </div>
                                    )
                                 }
                                 {
                                    data?.category === 'Documentation' && 
                                    (
                                       <div className="px-4 py-1 bg-opacity-50 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-blue text-contenta-light-blue">
                                          Documentation
                                       </div>
                                    )
                                 }
                                 {
                                    data?.category === 'Policy' && 
                                    (
                                       <div className="px-4 py-1 bg-opacity-30 rounded-xl text-sm font-montserratBold justify-center flex bg-contenta-greyish-brown text-contenta-greyish-brown">
                                          Policy
                                       </div>
                                    )
                                 }
                              </div>
                              <a
                                 // download
                                 // href={data?.file}
                                 className="flex justify-center bg-contenta-blue p-3 rounded-bl-xl rounded-br-xl text-white font-montserratBold text-sm cursor-pointer hover:bg-contenta-blue-hover"
                              >
                                 <IoMdDownload size={24} /> Download Copy
                              </a>
                           </div>
                        }
                     </div>
                     <div className="py-5 px-1">
                        <button
                           name=""
                           className="py-2 w-full rounded-md bg-white border-2 border-contenta-light-blue text-contenta-light-blue text-sm transition duration-300 ease-in-out focus:outline-none font-montserratBold hover:bg-contenta-light-blue hover:text-white"
                           type="button"
                           onClick={(e) => {
                              e.preventDefault();
                              Router.push(`#`)
                           }}
                        >
                           Mark as Read
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
export default CompliancePage;