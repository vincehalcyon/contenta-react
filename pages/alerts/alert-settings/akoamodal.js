import Link from "next/link";
import RightSideScreen from "@/components/Quotes/RightSideScreen";
import LocationRiskComponent from "@/components/Quotes/ScreenThree/LocationRiskComponent";
import ButtonComponent from "@/components/Button/Button";
import Select from "react-select"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Input from "@/components/Input/input";
import Modal from "@/components/Modal/Index";
import Selection from "@/components/Selection/SelectionComponent";

// For building Lists (Displaying Only)😸
const buildingDisplay = [
    {
        column: "Address:",
        col1key: "address",
        secondCol: "Building Name:",
        col2key: "buildingName",
    },
    {
        column: "Location Description:",
        col1key: "locationDescription",
        secondCol: "Location Type: ",
        col2key: "locationDescriptionType",
    },
    {
        column: "GNAF Code",
        col1key: "gnafPid",
        secondCol: "Business Type:",
        col2key: "",
    },

    //Add relevant fields here...
]



const BuildingComponent = (props) => {
    const router = useRouter()
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [editAdd, setEditAdd] = useState()
    const [locationDatas, setLocationDatas] = useState([])
    const [locationOptions, setLocationOptions] = useState([])
    const [selectedLocation, setSelectedLocation] = useState([])
    const [buildingDetails, setBuildingDetails] = useState([])
    const [newBuilding, setNewBuilding] = useState([])
    const [tab, setTab] = useState([
        { id: 0, label: 'Building Details' }
    ]);
    const [activeButton, setActiveButton] = useState()
    const {
        locationBuildingDetails,
        setLocationBuildingDetails,
     } = props
    const tabsLabel = [
        {
            label: "Building Details"
        },
        {
            label: "Building Security Details"
        },
        {
            label: "Lease Information"
        },
        {
            label: "Building Cover"
        },
    ]
    const buildingDetailsDisplay = [
        {
            label: "Fire:",
            value: selectedLocation ? selectedLocation.perils?.fire : 0.00,
        },
        {
            label: "Storm:",
            value: selectedLocation ? selectedLocation.perils?.storm : 0.00,
        },
        {
            label: "Cyclone:",
            value: selectedLocation ? selectedLocation.perils?.cyclone : 0.00,
        },
        {
            label: "Bushfire:",
            value: 0.00,
        },
        {
            label: "Flood:",
            value: 0.00,
        },
        {
            label: "Earthquake:",
            value: 0.00,
        },
        {
            label: "Other Perils:",
            value: 0.00,
        },
        {
            label: "Nearest Fire Station:",
            value: 0.00,
        },
    ]

    const muiltipleBuildingsLocationDropdown = [
        {
            value: "Building Location 1",
            label: "Building Location 1"
        },
        {
            value: "Building Location 2",
            label: "Building Location 2"
        },
        {
            value: "Building Location 3",
            label: "Building Location 3"
        },
        {
            value: "Building Location 4",
            label: "Building Location 4"
        },
    ]

    const numberStoreysDropdown = [
        {
            value: '1',
            label: '1'
        },
        {
            value: '2',
            label: '2'
        },
        {
            value: '3',
            label: '3'
        },
        {
            value: '4',
            label: '4'
        },
    ]

    const floorConstructionTypeDropdown = [
        {
            value: "Mixed",
            label: "Mixed"
        },
        {
            value: "Stone",
            label: "Stone"
        },
        {
            value: "Tile",
            label: "Tile"
        },
        {
            value: "Concrete",
            label: "Concrete"
        },
        {
            value: "Wood",
            label: "Wood"
        },
    ]

    const wallConstructionTypeDropdown = [
        {
            value: "Brick",
            label: "Brick"
        },
        {
            value: "Concrete",
            label: "Concrete"
        },
        {
            value: "FibroNoEps",
            label: "Fibro No Eps"
        },
        {
            value: "Epso-15%",
            label: "Epso-15%"
        },
        {
            value: "EPS15-30%",
            label: "EPS15-30%"
        },
        {
            value: "Metal",
            label: "Metal"
        },
        {
            value: "Timber",
            label: "Timber"
        },
        {
            value: "Other",
            label: "Other"
        },
    ]

    const roofConstructionTypeDropdown = [
        {
            value: "Alluminium",
            label: "Alluminium"
        },
        {
            value: "Colourbond",
            label: "Colourbond"
        },
        {
            value: "Concrete",
            label: "Concrete"
        },
        {
            value: "Fibro",
            label: "Fibro"
        },
        {
            value: "Iron",
            label: "Iron"
        },
        {
            value: "Wood",
            label: "Wood"
        },
        {
            value: "Glass",
            label: "Glass"
        },
        {
            value: "Slate",
            label: "Slate"
        },
        {
            value: "Other",
            label: "Other"
        },
    ]

    const lowestFloorOccupyDropdown = [
        {
            value: "GroundFloor",
            label: "Ground Floor"
        },
        {
            value: "SecondFloor",
            label: "Second Floor"
        },
        {
            value: "SecondFloorOrAbove",
            label: "Second Floor or Above"
        },
    ]

    const epsBuildingPercentDropdown = [
        {
            value: "10%",
            label: "10%"
        },
        {
            value: "20%",
            label: "20%"
        },
        {
            value: "50%",
            label: "50%"
        },
        {
            value: "70%",
            label: "70%"
        },
        {
            value: "100%",
            label: "100%"
        },
    ]

    const fireProtectionLocationDropdown = [
        {
            value: "None",
            label: "None"
        },
        {
            value: "Sprinkles",
            label: "Sprinkles"
        },
        {
            value: "HeatDetector",
            label: "Heat Detector"
        },
        {
            value: "FireExtinguisher",
            label: "Fire Extinguisher"
        },
        {
            value: "SmokeDetector-Monitored",
            label: "Smoke Detector - Monitored"
        },
        {
            value: "FireAlarm",
            label: "Fire Alarm"
        },
        {
            value: "HoseReel",
            label: "Hose Reel"
        },
        {
            value: "SmokeDetector-NonMonitored",
            label: "Smoke Detector - Non Monitored"
        },
        {
            value: "MonitoredBacktoBaseAlarm",
            label: "Monitored Back to Base Alarm"
        },
        {
            value: "FireBlanket",
            label: "Fire Blanket"
        },
    ]

    const fireSprinklerLocationDropdown = [
        {
            value: '100%Coverage',
            label: '100% Coverage',
        },
    ]

    const waterSupplyDropdown = [
        {
            value: 'Single',
            label: 'Single',
        },
        {
            value: 'Dual Water Supply',
            label: 'Dual Water Supply',
        },
    ]

    const securityProtectionDropdown = [
        {
            value: 'Deadlocks',
            label: 'Deadlocks',
        },
        {
            value: 'Electronic Key/Pad/Swipe Access',
            label: 'Electronic Key/Pad/Swipe Access',
        },
        {
            value: 'Lockon External Window',
            label: 'Lock on External Window',
        },
        {
            value: 'Bollards',
            label: 'Bollards',
        },
        {
            value: 'Local Alarm',
            label: 'Local Alarm',
        },
        {
            value: 'Security Patrol',
            label: 'Security Patrol',
        },
        {
            value: 'Barson Windows',
            label: 'Bars on Windows',
        },
        {
            value: 'CCTV installed',
            label: 'CCTV installed',
        },
        {
            value: 'Monitored Back to Base Alarm',
            label: 'Monitored Back to Base Alarm',
        },
        {
            value: 'Shutters',
            label: 'Shutters',
        },
        {
            value: 'Window Display Protection',
            label: 'Window Display Protection',
        },
        {
            value: 'External Lighting System',
            label: 'External Lighting System',
        },
        {
            value: 'Monitored Alarm',
            label: 'Monitored Alarm',
        },
        {
            value: 'None',
            label: 'None',
        },
    ]

    const fireStationDropdown = [
        {
            value: '0-5',
            label: '0-5',
        },
        {
            value: '5-10',
            label: '5-10',
        },
        {
            value: '+10 km',
            label: '+10 km',
        },
    ]

    const typeFireBrigadeDropdown = [
        {
            value: 'Professional Manned 24hrs',
            label: 'Professional Manned 24hrs',
        },
        {
            value: 'Professional Manned PartTime',
            label: 'Professional Manned Part Time',
        },
        {
            value: 'Ownon Site Staff Fire Brigade 24hr',
            label: 'Own onsite staff fire brigade 24hr',
        },
        {
            value: 'Own Onsite Staff Fire Brigade Part Time',
            label: 'Own onsite staff fire brigade part time',
        },
        {
            value: 'Rural/volunteer Brigade',
            label: 'Rural/volunteer Brigade',
        },
        {
            value: 'none',
            label: 'none',
        },
    ]

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

    /* Check storage */
    useEffect(() => {
        const buildingDatas = JSON.parse(localStorage.getItem("buildingDatas") || "[]");
        if (buildingDatas) {
            setNewBuilding(buildingDatas)
        }
    }, [])

    /* Listen to newLocation Changes */
    useEffect(() => {
        //used clear for now.. looking for a better way 🤔
        localStorage.removeItem("buildingDatas")
        localStorage.setItem("buildingDatas", JSON.stringify(newBuilding))
    }, [newBuilding])

    const onLocationSelect = (selectedIndex) => {
        const objIndex = locationDatas.findIndex((obj, index) => index === selectedIndex);
        setSelectedLocation(locationDatas[objIndex])
    }

    // Cleanup Inputs and States...
    const clearStates = () => {
        setBuildingDetails([])
        setSelectedLocation([])
        setActiveButton("")
    }

    //Add Building
    const addNewBuilding = async () => {
        setOpenCreateModal(!openCreateModal);
        let building = []
        if (newBuilding) {
            building = [...newBuilding]
        }
        building.push({
            ...buildingDetails,
            buildingName: buildingDetails.buildingName,
            constructionYear: buildingDetails.constructionYear,
            address: selectedLocation.address,
            gnafPid: selectedLocation.gnafPid,
            // locationType: locationType,
            // description: description,
            // occupationDescription: occupationDescription,
        })
        setNewBuilding(building)
        clearStates()
    }

    const onDeleteBuilding = (selected, locindex) => {
        const updated = newBuilding.filter((item, idx) => idx !== locindex)
        setNewBuilding(updated)
    }

    return (
        <>
            <Modal
                isOpen={openCreateModal}
                onClose={() => {
                    clearStates()
                    setOpenCreateModal(false)
                }}
                closable
                title={`${editAdd} Location`}
                titleClass="text-xl text-left w-full montserrat-bold text-[#162F3E]"
                headerClass="w-full"
                contentClass="max-w-4xl w-full rounded-lg "
                modalClass="p-0"
                width="1200px"
            >
                {/* {JSON.stringify(locationDatas)} */}
                <div
                    style={{
                        borderBottom: "solid 1px",
                        borderColor: "#949494",
                        marginTop: "15px",
                    }}
                >
                    <nav className="flex flex-col sm:flex-row justify-between overflow-x-auto">
                        {tabsLabel.map((item, index) => (
                            <span key={index}>
                                <a
                                    className={`pt-4 px-3 block focus:outline-none text-[18px] whitespace-nowrap 
                                ${index === tab[0].id
                                            ?
                                            "text-[#de4523] font-extrabold border-b-[3px] border-[#de4523] montserrat-bold"
                                            : "hover:text-blue-500 text-[#676767] montserrat-regular"
                                        }`}
                                    onClick={() => setTab([{ id: index, label: item.label }])}
                                >
                                    {item.label}
                                </a>
                            </span>
                        ))}


                    </nav>

                </div>
                {tab[0].label === tabsLabel[0].label && (
                    <>
                        <div className="flex flex-row w-full mt-10">
                            <div className="flex w-full">
                                <p className="text-[#162F3E] montserrat-regular">Location Description:</p>
                            </div>
                            <div className="flex w-full">
                                <p className="text-[#5B5B5B] montserrat-bold">{locationDatas?.description || ''}</p>
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex w-full items-center">
                                <p className="text-[#162F3E] montserrat-regular">Building Cover Type:</p>
                            </div>
                            <div className="flex w-full">
                                <ul
                                    className="flex mb-0 list-none flex-wrap flex-row  w-[400px]"
                                    role="tablist"
                                >
                                    <li className="-mb-px last:mr-0 flex-auto text-center">
                                        <a
                                            className={`w-auto text-xs px-5 shadow-lg rounded-l-md block montserrat-bold text-[14px] ${activeButton === "Building" ? "text-white border-[1px] border-[#DE4523] bg-[#DE4523]" : "text-black border-[1px] border-[#c4c4c4]"} py-[6px]`}
                                            // onClick={(e) => {
                                            //     e.preventDefault();
                                            //     setActiveButton("Building");
                                            //     // setMarketingConsent(1)
                                            //     // setFormData({
                                            //     //   ...formData,
                                            //     //   type: marketingConsent,
                                            //     // })
                                            // }}

                                            onClick={(e) => {
                                                e.preventDefault();
                                                setActiveButton("Building");
                                                console.log("clicked", e);
                                                setLocationBuildingDetails({
                                                    ...locationBuildingDetails,
                                                    buildingCoverTyp: "Building"
                                                });
                                                // setSetter(false);
                                            }}
                                            data-toggle="tab"
                                            href=""
                                            role="tablist"
                                        >
                                            <i className="fas fa-space-shuttle text-base mr-1"></i>{" "}
                                            {"Building"}
                                        </a>
                                    </li>
                                    <li className="-mb-px last:mr-0 flex-auto text-center">
                                        <a
                                            className={`w-auto text-xs px-5 shadow-lg block montserrat-bold text-[14px]  ${activeButton === "Content" ? "text-white border-[1px] border-[#DE4523] bg-[#DE4523]" : "text-black border-[1px] border-[#c4c4c4]"} py-[6px]`}
                                            // onClick={(e) => {
                                            //     e.preventDefault();
                                            //     console.log("clicked", e);
                                            //     setActiveButton("Content");
                                            // }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setActiveButton("Content");
                                                console.log("clicked", e);
                                                setLocationBuildingDetails({
                                                    ...locationBuildingDetails,
                                                    buidingType: "Content"
                                                });
                                                // setSetter(false);
                                            }}
                                            data-toggle="tab"
                                            href=""
                                            role="tablist"
                                        >
                                            <i className="fas fa-cog text-base mr-1"></i> {"Content"}
                                        </a>
                                    </li>
                                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                        <a
                                            className={`w-auto text-xs px-5 shadow-lg rounded-r-md block montserrat-bold text-[14px]  ${activeButton === "Both" ? "text-white border-[1px] border-[#DE4523] bg-[#DE4523]" : "text-black border-[1px] border-[#c4c4c4]"} py-[6px]`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setActiveButton("Both");
                                                console.log("clicked", e);
                                                setLocationBuildingDetails({
                                                    ...locationBuildingDetails,
                                                    buidingType: "Both"
                                                });
                                                // setSetter(false);
                                            }}
                                            data-toggle="tab"
                                            href=""
                                            role="tablist"
                                        >
                                            <i className="fas fa-cog text-base mr-1"></i> {"Both"}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    GNAF Code*
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Input
                                    inputClass="border-gray-500 rounded w-[400px]"
                                    type="text"
                                    value={locationDatas?.gnafPid || ''}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 grid-rows-1 xl:grid-cols-4 gap-4 w-full  rounded-lg border-2 mt-5 p-5">
                            {buildingDetailsDisplay.map((item, index) => (
                                <div key={index} className="flex flex-col w-full">
                                    <p className="text-[#5B5B5B] montserrat-regular">
                                        {item.label}
                                    </p>
                                    <p className="text-[#5B5B5B] montserrat-bold pl-1">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Muiltiple Buildings at Location
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={muiltipleBuildingsLocationDropdown}
                                    value={locationBuildingDetails.multipleBuildingLocation ? locationBuildingDetails.multipleBuildingLocation : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    placeholder={"Select Option"}
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, multipleBuildingLocation: { value: e.value, label: e.label } })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Building Name
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Input
                                    inputClass="border-gray-500 rounded w-[400px]"
                                    type="text"
                                    onChange={(e) => setLocationBuildingDetails(prev => {
                                        return { ...prev, buildingName: e.target.value }
                                    })}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Construction Year
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Input
                                    inputClass="border-gray-500 rounded w-[400px]"
                                    type="date"
                                    onChange={(e) => setLocationBuildingDetails(prev => {
                                        return { ...prev, constructionYear: e.target.value }
                                    })}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5">

                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Number of Storeys
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={numberStoreysDropdown}
                                    value={locationBuildingDetails.numberOfStoreys ? locationBuildingDetails.numberOfStoreys : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    placeholder={"Select Option"}
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, numberOfStoreys: { value: e.value, label: e.label } })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Floor Construction Type
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={floorConstructionTypeDropdown}
                                    value={locationBuildingDetails.floorConstructionType ? locationBuildingDetails.floorConstructionType : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    placeholder={"Select Option"}
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, floorConstructionType: { value: e.value, label: e.label } })
                                    }}
                                // onChange={(e) => {
                                //     console.log("onChange", e);
                                // }} 
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Wall Construction Type
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={wallConstructionTypeDropdown}
                                    value={locationBuildingDetails.wallConstructionType ? locationBuildingDetails.wallConstructionType : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    placeholder={"Select Option"}
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, wallConstructionType: { value: e.value, label: e.label } })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Roof Construction Type
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={roofConstructionTypeDropdown}
                                    value={locationBuildingDetails.roofConstructinType ? locationBuildingDetails.roofConstructinType : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    placeholder={"Select Option"}
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, roofConstructinType: { value: e.value, label: e.label } })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Lowest floor you occupy
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={lowestFloorOccupyDropdown}
                                    value={locationBuildingDetails.lowestFloorOccupied ? locationBuildingDetails.lowestFloorOccupied : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    placeholder={"Select Option"}
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, lowestFloorOccupied: { value: e.value, label: e.label } })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Risk Class (for Fire)
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Input
                                    inputClass="border-gray-500 rounded w-[400px]"
                                    type="text"
                                    placeholder={"< 0 >"}
                                    onChange={(e) => setLocationBuildingDetails(prev => {
                                        return { ...prev, fireRiskClass: e.target.value }
                                    })}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full my-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Year Last Rewired
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Input
                                    inputClass="border-gray-500 rounded w-[400px]"
                                    type="text"
                                    placeholder={"< Year Last Rewired >"}
                                    onChange={(e) => setLocationBuildingDetails(prev => {
                                        return { ...prev, lastYearRewired: e.target.value }
                                    })}
                                />
                            </div>
                        </div>
                        <Selection
                            label={"Is the Building heritage protected or national trust listed?"}
                            className={"pl-14 justify-center"}
                            setSetter={(value) => {
                                setLocationBuildingDetails({
                                    ...locationBuildingDetails,
                                    isHeritage: value === 1 ? 'Yes' : 'No'
                                })
                            }}
                        />
                        <div className="flex flex-row w-full py-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    EPS % at Building
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={epsBuildingPercentDropdown}
                                    value={locationBuildingDetails.epsPercentage ? locationBuildingDetails.epsPercentage : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, epsPercentage: { value: e.value, label: e.label } })
                                    }}
                                />
                            </div>
                        </div>
                        <Selection
                            label={"Is the premises more than 50% vacant?"}
                            className={"pl-14 justify-center"}
                            setSetter={(value) => {
                                setLocationBuildingDetails({
                                    ...locationBuildingDetails,
                                    is50PercentVacant: value === 1 ? 'Yes' : 'No'
                                })
                            }}
                        />
                        <div className="flex w-full gap-2 mt-5">
                            <ButtonComponent
                                name="Cancel"
                                className="text-[#0070B0] border-[1px] border-[#0070B0] montserrat-regular rounded-md my-1 w-[200px]"
                                onClick={() => setOpenCreateModal(false)}
                            />
                            <ButtonComponent
                                name="Continue"
                                className="text-white border-[1px] bg-[#0070b0] montserrat-regular my-1  w-[200px]"
                                onClick={() => {
                                    
                                    setTab([{ id: 1, label: 'Building Security Details' }])
                                    // setOpenCreateModal(!openCreateModal);
                                    
                                    // setSetter("Building Security Details")
                                }}
                            />
                        </div>
                    </>
                )}
                {tab[0].label === tabsLabel[1].label && (
                    <>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Fire Protection at Location
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={fireProtectionLocationDropdown}
                                    value={locationBuildingDetails?.buildingSecurityDetail?.fireProtection ? locationBuildingDetails?.buildingSecurityDetail?.fireProtection : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    placeholder={"Select Option"}
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, buildingSecurityDetail: { ...locationBuildingDetails.buildingSecurityDetail, fireProtection: { value: e.value, label: e.label } } })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Fire Sprinkler at Location
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={fireSprinklerLocationDropdown}
                                    value={locationBuildingDetails?.buildingSecurityDetail?.fireSprinkler ? locationBuildingDetails?.buildingSecurityDetail?.fireSprinkler : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    placeholder={"Select Option"}
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, buildingSecurityDetail: { ...locationBuildingDetails.buildingSecurityDetail, fireSprinkler: { value: e.value, label: e.label } } })
                                    }}
                                // onChange={(e) => {
                                //     console.log("onChange", e);
                                // }} 
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Water Supply
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={waterSupplyDropdown}
                                    value={locationBuildingDetails?.buildingSecurityDetail?.waterSupply ? locationBuildingDetails?.buildingSecurityDetail?.waterSupply : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    placeholder={"Select Option"}
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, buildingSecurityDetail: { ...locationBuildingDetails.buildingSecurityDetail, waterSupply: { value: e.value, label: e.label } } })

                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full my-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Security Protection at Property
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={securityProtectionDropdown}
                                    value={locationBuildingDetails?.buildingSecurityDetail?.securityProtection ? locationBuildingDetails?.buildingSecurityDetail?.securityProtection : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    placeholder={"Select Option"}
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, buildingSecurityDetail: { ...locationBuildingDetails.buildingSecurityDetail, securityProtection: { value: e.value, label: e.label } } })

                                    }}
                                />
                            </div>
                        </div>
                        <Selection
                            label="Is the location connected to the town's water mains?"
                            className={"pl-14 justify-center"}
                            setSetter={(value) => {
                                setLocationBuildingDetails({
                                    ...locationBuildingDetails,
                                    buildingSecurityDetail: { ...locationBuildingDetails.buildingSecurityDetail, isConnectedWaterMains: value === 1 ? 'Yes' : 'No' }
                                })
                            }}
                        />
                        <div className="flex flex-row w-full my-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Nearest Fire Station
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={fireStationDropdown}
                                    value={locationBuildingDetails?.buildingSecurityDetail?.nearestFireStation ? locationBuildingDetails?.buildingSecurityDetail?.nearestFireStation : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    placeholder={"Select Option"}
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, buildingSecurityDetail: { ...locationBuildingDetails.buildingSecurityDetail, nearestFireStation: { value: e.value, label: e.label } } })
                                    }}
                                />
                            </div>
                        </div>
                        <Selection
                            label="Does the business store flammable goods?"
                            className={"pl-14 justify-center"}
                            setSetter={(value) => {
                                setLocationBuildingDetails({
                                    ...locationBuildingDetails,
                                    buildingSecurityDetail: { ...locationBuildingDetails.buildingSecurityDetail, hasFlammableGoods: value === 1 ? 'Yes' : 'No' }
                                })
                            }}
                        />
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Type of fire brigade
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Select
                                    id="quotes"
                                    instanceId="quotes"
                                    options={typeFireBrigadeDropdown}
                                    value={locationBuildingDetails?.buildingSecurityDetail?.typeFireBrigadeValue ? locationBuildingDetails?.buildingSecurityDetail?.typeFireBrigadeValue : null}
                                    // isMulti
                                    styles={{
                                        control: (controlStyles) => ({
                                            ...controlStyles,
                                            ":hover": { borderColor: "#de4523" },
                                            borderRadius: 4,
                                            borderWidth: 1,
                                            // borderColor: "#de4523",
                                            minWidth: 400,
                                            // maxWidth: 700,
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
                                    placeholder={"Select Option"}
                                    onChange={(e) => {
                                        console.log("onChange", e);
                                        setLocationBuildingDetails({ ...locationBuildingDetails, buildingSecurityDetail: { ...locationBuildingDetails.buildingSecurityDetail, typeFireBrigadeValue: { value: e.value, label: e.label } } })
                                    }}
                                />
                            </div>
                        </div>
                        <Selection
                            label="Does Sprinkler meets Australian Standards?"
                            className={"pt-5 pl-14 justify-center"}
                            setSetter={(value) => {
                                setLocationBuildingDetails({
                                    ...locationBuildingDetails,
                                    buildingSecurityDetail: { ...locationBuildingDetails.buildingSecurityDetail, sprinklerMeetsAusStandards: value === 1 ? 'Yes' : 'No' }
                                })
                            }}
                        />
                        <Selection
                            label="Please confirm monitored alarm system?"
                            className={"pt-5 pl-14 justify-center"}
                            setSetter={(value) => {
                                setLocationBuildingDetails({
                                    ...locationBuildingDetails,
                                    buildingSecurityDetail: { ...locationBuildingDetails.buildingSecurityDetail, hasMonitoredAlarmSystem: value === 1 ? 'Yes' : 'No' }
                                })
                            }}
                        />
                        <Selection
                            label="Is there an ATM on the premises?"
                            className={"pt-5 pl-14 justify-center"}
                            setSetter={(value) => {
                                setLocationBuildingDetails({
                                    ...locationBuildingDetails,
                                    buildingSecurityDetail: { ...locationBuildingDetails.buildingSecurityDetail, hasAtmOnPremise: value === 1 ? 'Yes' : 'No' }
                                })
                            }}
                        />
                        <div className="flex w-full gap-2 mt-5">
                            <ButtonComponent
                                name="Back"
                                className="text-[#0070B0] border-[1px] border-[#0070B0] montserrat-regular rounded-md my-1 w-[200px]"
                                // onClick={() => setOpenCreateModal(false)}
                                onClick={() => {
                                    setTab([{ id: 0, label: 'Building Details' }])
                                }}
                            />
                            <ButtonComponent
                                name="Continue"
                                className="text-white border-[1px] bg-[#0070b0] montserrat-regular my-1  w-[200px]"
                                onClick={() => {
                                    setTab([{ id: 2, label: 'Lease Information' }])
                                }}
                            />
                        </div>
                    </>
                )}
                {tab[0].label === tabsLabel[2].label && (
                    <>
                        <div className="flex flex-row w-full mt-5">
                            <div className="flex items-center w-full">
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Annual Rental Income
                                </label>
                            </div>
                            <div className="flex w-full">
                                <Input
                                    inputClass="border-gray-500 rounded w-[400px]"
                                    type="text"
                                    onChange={(e) => setLocationBuildingDetails(prev => {
                                        return { ...prev, buildingLeaseInformation: { ...locationBuildingDetails.buildingLeaseInformation, annualRentalIncome: e.target.value } }
                                    })}
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-2 mt-5">
                            <ButtonComponent
                                name="Back"
                                className="text-[#0070B0] border-[1px] border-[#0070B0] montserrat-regular rounded-md my-1 w-[200px]"
                                // onClick={() => setOpenCreateModal(false)} 
                                onClick={() => {
                                    setTab([{ id: 1, label: 'Building Security Details' }])
                                }}
                            />
                            <ButtonComponent
                                name="Continue"
                                className="text-white border-[1px] bg-[#0070b0] montserrat-regular my-1  w-[200px]"
                                onClick={() => {
                                    setTab([{ id: 3, label: 'Building Cover' }])
                                }} />
                        </div>
                    </>
                )}
                {tab[0].label === tabsLabel[3].label && (
                    <>
                        <div className="grid grid-cols-1 grid-rows-1 xl:grid-cols-4 gap-4 w-full p-5 rounded-lg">
                            <div>
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Building - Sum Insured<span className="text-[#de4523]">*</span>
                                </label>
                            </div>
                            <div>
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Contents - Sum Insured<span className="text-[#de4523]">*</span>
                                </label>
                            </div>
                            <div>
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Stock - Sum Insured<span className="text-[#de4523]">*</span>
                                </label>
                            </div>
                            <div>
                                <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                    Contents & Stock - Sum Insured<span className="text-[#de4523]">*</span>
                                </label>
                            </div>
                            {/* half */}
                            <div className="w-[200px]">
                                <Input
                                    inputClass="border-gray-500 rounded"
                                    type="text"
                                    placeholder={"00000"}
                                    onChange={(e) => setLocationBuildingDetails(prev => {
                                        return { ...prev, buildingCover: { ...locationBuildingDetails.buildingCover, buildingSumInsured: e.target.value } }
                                    })}
                                />
                            </div>
                            <div className="flex w-[200px]">
                                <Input
                                    inputClass="border-gray-500 rounded"
                                    type="text"
                                    placeholder={"00000"}
                                    onChange={(e) => setLocationBuildingDetails(prev => {
                                        return { ...prev, buildingCover: { ...locationBuildingDetails.buildingCover, contentsSumInsured: e.target.value } }
                                    })}
                                />
                            </div>
                            <div className="w-[200px]">
                                <Input
                                    inputClass="border-gray-500 rounded"
                                    type="text"
                                    placeholder={"00000"}
                                    onChange={(e) => setLocationBuildingDetails(prev => {
                                        return { ...prev, buildingCover: { ...locationBuildingDetails.buildingCover, stockSumInsured: e.target.value } }
                                    })}
                                />
                            </div>
                            <div className="flex w-[200px] items-center">
                                <p className="text-[#5B5B5B] montserrat-regular text-[14px]">
                                    Total:
                                </p>
                            </div>

                        </div>
                        <div className="flex w-full gap-2 mt-5">
                            <ButtonComponent
                                name="Back"
                                className="text-[#0070B0] border-[1px] border-[#0070B0] montserrat-regular rounded-md my-1 w-[200px]"
                                onClick={() => {
                                    setTab([{ id: 2, label: 'Lease Information' }])
                                }}
                            />
                            <ButtonComponent
                                name="Save"
                                className="text-white border-[1px] bg-[#0070b0] montserrat-regular my-1  w-[200px]"
                                onClick={() => {
                                    localStorage.setItem('locationBuildingDetails', JSON.stringify(locationBuildingDetails))
                                    setOpenCreateModal(!openCreateModal);
                                }}
                            />
                        </div>
                    </>
                )}
            </Modal>

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
                                        borderWidth: 1,
                                        // borderColor: "#de4523",
                                        minWidth: 300,
                                        maxWidth: 400,
                                        width: "100%",
                                        outlineColor: "#de4523",
                                        boxShadow: "none",
                                    };
                                }

                            }}
                            menuColor="#de4523"
                            onMenuScrollToBottom={() => {
                                console.log("onMenuScrollToBottom")
                            }}
                            placeholder={"Select Location"}
                            onChange={(e) => {
                                console.log("SELECTED LOCATION", e.value)
                                onLocationSelect(e.value)
                            }}
                        />
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
                {
                    newBuilding &&
                    <div>
                        {
                            newBuilding.map((building, i) => {
                                return (
                                    <div key={i + building} className="border-2 border-gray-200 rounded-lg p-4 mt-5">
                                        <div className="grid grid-cols-1 grid-rows-1 xl:grid-cols-4 gap-4 w-full px-5 rounded-lg">
                                            <div>
                                                <p className="text-[#162F3E] montserrat-regular">Description:</p>
                                            </div>
                                            <div>
                                                {/* <p className="text-[#5B5B5B] montserrat-bold">{building.description}</p> */}
                                            </div>

                                            <div className="col-span-2 flex flex-row justify-end gap-5 mb-5">
                                                <div className="flex"
                                                    onClick={() => {
                                                        // onEditLocation(building, i)
                                                        // setEditAdd("Edit");
                                                        // setOpenCreateModal(!openCreateModal);
                                                    }}
                                                >
                                                    <p className="border-b-2 border-[#1FD1B2] text-[#1FD1B2] cursor-pointer"> Edit</p>
                                                </div>
                                                <div className="flex"
                                                    onClick={() => {
                                                        onDeleteBuilding(building, i)
                                                    }}
                                                >
                                                    <p className="border-b-2 border-[#E51F36] text-[#E51F36] cursor-pointer"> Delete</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div key={i + 1}>
                                            {
                                                buildingDisplay.map((col, index) => {
                                                    return (
                                                        <div key={index + col} className="grid grid-cols-1 grid-rows-1 xl:grid-cols-4 gap-4 w-full px-5 ">
                                                            <div >
                                                                <p className="montserrat-regular">
                                                                    {col.column}
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <p className="montserrat-bold text-[#5B5B5B]">
                                                                    {building[`${col.col1key}`]}
                                                                </p>
                                                            </div>
                                                            <div className="montserrat-regular">
                                                                <p>
                                                                    {col.secondCol}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className="montserrat-bold text-[#5B5B5B]">
                                                                    {building[`${col.col2key}`]}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
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