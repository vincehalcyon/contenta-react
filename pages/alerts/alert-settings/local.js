import Link from "next/link";
import RightSideScreen from "@/components/Quotes/RightSideScreen";
import LocationRiskComponent from "@/components/Quotes/ScreenThree/LocationRiskComponent";
import ButtonComponent from "@/components/Button/Button";
import Select from "react-select"
import { useState, useEffect } from "react";
import LocationsModal from "../Modals/LocationsModal";
import { useRouter } from "next/router";

const BuildingComponent = () => {
   const router = useRouter()
   const [openCreateModal, setOpenCreateModal] = useState(false)
   const [editAdd, setEditAdd] = useState()
   const [locationDatas, setLocationDatas] = useState([])
   const [locationOptions, setLocationOptions] = useState([])
   const [selectedLocation, setSelectedLocation] = useState([])

   useEffect(() => {
      const storedDatas = JSON.parse(localStorage.getItem("locationDatas") || "[]");
      let options = []
      storedDatas.map((item, index) => {
         options.push({
            label: item.address,
            value: index, // used index since its for selection only 😼
         })
      })
      setLocationOptions(options)
      setLocationDatas(storedDatas)
   }, [])

   const onLocationSelect = (selectedIndex) => {
      const objIndex = locationDatas.findIndex((obj, index) => index === selectedIndex);
      setSelectedLocation(locationDatas[objIndex])
   }

   const [locationBuildingDetails, setLocationBuildingDetails] = useState(
      {
         buildingCoverTyp: '',
         gnafCode: '',
         multipleBuildingLocation: {
            value: '',
            label: '',
         },
         buildingName: '',
         constructionYear: '',
         numberOfStoreys: {
            value: 0,
            label: 0,
         },
         floorConstructionType: {
            value: '',
            label: '',
         },
         wallConstructionType: {
            value: '',
            label: '',
         },
         roofConstructinType: {
            value: '',
            label: '',
         },

         lowestFloorOccupied: {
            value: '',
            label: '',
         },

         fireRiskClass: '',
         lastYearRewired: '',
         isHeritage: '',

         epsPercentage: {
            value: '',
            label: '',
         },

         is50PercentVacant: '',

         buildingSecurityDetail: {

            fireProtection: {
               value: '',
               label: '',
            },
            fireSprinkler: {
               value: '',
               label: '',
            },
            waterSupply: {
               value: '',
               label: '',
            },
            securityProtection: {
               value: '',
               label: '',
            },
            isConnectedWaterMains: '',
            nearestFireStation: {
               value: '',
               label: '',
            },
            hasFlammableGoods: '',
            typeFireBrigadeValue: {
               value: '',
               label: '',
            },
            sprinklerMeetsAusStandards: '',
            hasMonitoredAlarmSystem: '',
            hasAtmOnPremise: '',
         },

         buildingLeaseInformation: {
            annualRentalIncome: '',
         },

         buildingCover: {
            buildingSumInsured: '',
            contentsSumInsured: '',
            stockSumInsured: '',
         }


         // risk_assessments: [
         //     {
         //         risk_questionnaire_uuid: '',
         //         risk_assessment_responses: []
         //     }
         // ]
      }
   )
   console.log('locationData', locationBuildingDetails)

   return (
      <>
         <LocationsModal
            locationBuildingDetails={locationBuildingDetails}
            setLocationBuildingDetails={setLocationBuildingDetails}

            locationDatas={selectedLocation}
            openCreateModal={openCreateModal}
            setOpenCreateModal={setOpenCreateModal}
            editAdd={editAdd}
         />
         <div className="flex flex-col mb-2 w-full">
            <div className="flex w-full border-[#162f3e] border-b-2">
               <span className="text-[#de4523] text-[20px] montserrat-bold mb-2 ">Building</span>
            </div>
            <div className="flex flex-row items-center mt-[20px]">
               <div className="border-l-4 border-[#de4523] ">
                  <span className="flex justify-center text-[20px] montserrat-bold mb-2 ml-[10px]">Locations</span>
               </div>
            </div>
            <div className="grid grid-cols-1 grid-rows-1 xl:grid-cols-4 gap-4 w-full p-5 rounded-lg">
               <div className="col-span-2">
                  <p className="text-[#162F3E] montserrat-regular">All Locations</p>
               </div>
               <div className="flex w-full ">
                  <Select
                     id="quotes"
                     instanceId="quotes"
                     options={locationOptions}
                     // isMulti
                     styles={{
                        control: (controlStyles) => ({
                           ...controlStyles,
                           ":hover": { borderColor: "#de4523" },
                           borderRadius: 4,
                           borderWidth: 1,
                           // borderColor: "#de4523",
                           minWidth: 300,
                           maxWidth: 400,
                           width: "100%",
                           outlineColor: "#de4523",
                           boxShadow: "none",
                        }),
                        multiValueRemove: (styles, { data }) => ({
                           ...styles,
                           color: "#de4523",
                        }),
                        multiValue: (styles, { data }) => {
                           return {
                              ...styles,
                              backgroundColor: "transparent",
                              border: "1px solid #ccc",
                              borderRadius: 4,
                           };
                        },
                     }}
                     menuColor="#de4523"
                     onMenuScrollToBottom={() => {
                        console.log("onMenuScrollToBottom");
                     }}
                     placeholder={"Select Location"}
                     onChange={(e) => {
                        console.log("SELECTED LOCATION", e.value)
                        onLocationSelect(e.value)
                     }} />
               </div>
               <div className="flex justify-end">
                  <ButtonComponent
                     name="Add Building"
                     className="text-white bg-[#DE4523] montserrat-regular rounded-md my-1 w-[200px]"
                     onClick={() => {
                        setEditAdd("Add");
                        setOpenCreateModal(!openCreateModal)
                     }}
                  />
               </div>
            </div>
            <div className="grid grid-cols-1 grid-rows-1 xl:grid-cols-4 gap-4 w-full px-5 rounded-lg">
               <div>
                  <p className="text-[#162F3E] montserrat-regular">Description:</p>
               </div>
               <div>
                  <p className="text-[#5B5B5B] montserrat-bold">{"< Primary Location >"}</p>
               </div>

               <div className="col-span-2 flex flex-row justify-end gap-5 mb-2">
                  <div className="flex"
                     onClick={() => {
                        setEditAdd("Edit");
                        setOpenCreateModal(!openCreateModal);
                     }}
                  >
                     <p className="border-b-2 border-[#1FD1B2] text-[#1FD1B2]"> Modify</p>
                  </div>
                  <div className="flex">
                     <p className="border-b-2 border-[#E51F36] text-[#E51F36]"> Delete</p>
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-1 grid-rows-1 xl:grid-cols-4 gap-4 w-full px-5 rounded-lg">
               <div>
                  <p className="text-[#162F3E] montserrat-regular">Address 1:</p>
               </div>
               <div className="col-span-3">
                  <p className="text-[#5B5B5B] montserrat-bold">{"< Address 1 > "}</p>
               </div>

            </div>
            <div className="border-2 border-[#c9d9de] mt-[19px]" />
            <div className="flex w-full gap-2 mt-5">
               <ButtonComponent
                  name="Go Back"
                  className="text-[#0070B0] border-[1px] border-[#0070B0] montserrat-regular rounded-md my-1 w-[200px]"
                  onClick={() => {
                     router.push("/quotes/journey/location-risk")
                  }}
               />
               <ButtonComponent
                  name="Continue"
                  className="text-white border-[1px] bg-[#0070b0] montserrat-regular my-1  w-[200px]"
                  onClick={() => {
                     router.push("/quotes/journey/situational-coverage")
                  }}
               />
            </div>
         </div>
      </>
   )
}
export default BuildingComponent