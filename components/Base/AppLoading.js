import React, { useState, useEffect } from 'react';
import {
   AiOutlineLoading
} from "react-icons/ai"
const AppLoading = ({
   color,
   size
}) => {
   return (
      <>
         {
            size === 'small' &&
            <>
               <div
                  className={`flex items-center spinnerSmall ${color ? color : "text-contenta-blue"}`}
                  styles={{ color: color ? color : '#2a295c' }}
               >
                  <AiOutlineLoading size={20} />
               </div>
            </>
         }
         {
            size === 'extrasmall' &&
            <>
               <div
                  className={`flex items-center spinnerExtraSmall ${color ? color : "text-contenta-blue"}`}
                  styles={{ color: color ? color : '#2a295c' }}
               >
                  <AiOutlineLoading size={16} />
               </div>
            </>
         }

         {
            !size &&
            <>
               <div
                  className={`flex items-center spinner m-4 ${color ? color : "text-contenta-blue"}`}
                  styles={{ color: color ? color : '#2a295c' }}
               >
                  <AiOutlineLoading size={50} />
               </div>
            </>
         }


      </>

   )
}

export default AppLoading