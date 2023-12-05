import Header from 'components/Header/Header';
import React from 'react';
import { Router, useRouter } from 'next/router';
import AppInput from "components/Base/AppInput";
import { BiChevronLeft } from 'react-icons/bi';
import { MdFileUpload } from "react-icons/md";

export default function AddCompliance() {

   const router = useRouter();

   return(
      <>
         <Header page="Compliance " />
         <div className="flex flex-col px-7 py-10 items">
            <div className="flex flex-row">
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
                  <div className="w-full xl:w-9/12 lg:w-full content-shadow bg-white rounded-lg p-5">
                     <div className="w-full">
                        <AppInput
                           // label="Name"
                           name="title"
                           type="text"
                           size="150"
                           // required
                           // value={form.name}
                           placeholder="Title"
                           inputClass="my-1 w-full"
                           classNames="border-2 border-default rounded w-1/2 py-2 px-4 text-gray-700 focus:outline-none "
                        />
                     </div>
                     <div className="flex mt-5">
                        <label className="w-full flex flex-col items-center px-4 py-6 border-2 border-dashed border-contenta-blue text-blue rounded-lg shadow-lg tracking-wide cursor-pointer">
                           <MdFileUpload className="text-contenta-blue" size={52} />
                           <span className="mt-2 text-sm text-contenta-greyish-brown font-montserratBold pb-5">Upload New Document</span>
                           <span className="text-sm text-contenta-greyish-brown">Drop files here or <b className="text-contenta-blue">Browse</b></span>
                           <input type='file' className="hidden" />
                        </label>
                     </div>
                  </div>
                  <div className="w-full xl:w-3/12">
                     <div className="flex flex-col">
                        <div className="flex">
                           <label class="w-full flex flex-col items-center px-4 py-6 bg-contenta-blue text-white rounded-lg shadow-lg tracking-wide  cursor-pointer hover:bg-contenta-light-blue">
                              <MdFileUpload size={32} />
                              <span className="mt-2 text-sm leading-normal font-montserratBold">Upload Thumbnail</span>
                              <span className="text-sm font-montserratRegular">Click to insert file</span>
                              <input type='file' class="hidden" />
                           </label>
                        </div>
                        <div className="py-5">
                           <button
                              name=""
                              className="w-full py-2 rounded-md bg-white border-2 border-contenta-light-blue text-contenta-light-blue text-sm transition duration-300 ease-in-out focus:outline-none font-montserratBold hover:bg-contenta-light-blue hover:text-white"
                              type="button"
                              onClick={(e) => {
                                 e.preventDefault();
                                 router.push(`#`)
                              }}
                           >
                              Publish
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </>     
   )
}