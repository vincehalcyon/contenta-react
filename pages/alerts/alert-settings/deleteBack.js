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

const BuildingComponent = () => {
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
            value: selectedLocation ? selectedLocation.risksScores?.fire : "0.00",
        },
        {
            label: "Storm:",
            value: selectedLocation ? selectedLocation.risksScores?.storm : "0.00",
        },
        {
            label: "Cyclone:",
            value: selectedLocation ? selectedLocation.risksScores?.cyclone: "0.00",
        },
        {
            label: "Bushfire:",
            value: "0.00",
        },
        {
            label: "Flood:",
            value: "0.00",
        },
        {
            label: "Earthquake:",
            value: "0.00",
        },
        {
            label: "Other Perils:",
            value: "0.00",
        },
        {
            label: "Nearest Fire Station:",
            value: "0.00",
        },
    ]

    useEffect(() => {
        const storedDatas = JSON.parse(localStorage.getItem("locationDatas") || "[]");
        let options = []
        storedDatas.map((item,index) => {
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
        if(buildingDatas) {
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
        if(newBuilding) {
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
                                    <p className="text-[#5B5B5B] montserrat-bold">{selectedLocation?.description || ''}</p>
                                </div>
                            </div>
                            <div className="flex flex-row w-full mt-5">
                                <div className="flex w-full items-center">
                                    <p className="text-[#162F3E] montserrat-regular">Location Description:</p>
                                </div>
                                <div className="flex w-full">
                                    <ul
                                        className="flex mb-0 list-none flex-wrap flex-row  w-[400px]"
                                        role="tablist"
                                    >
                                        <li className="-mb-px last:mr-0 flex-auto text-center">
                                            <a
                                                className={`w-auto text-xs px-5 shadow-lg rounded-l-md block montserrat-bold text-[14px] ${activeButton === "Building" ? "text-white border-[1px] border-[#DE4523] bg-[#DE4523]" : "text-black border-[1px] border-[#c4c4c4]"} py-[6px]`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setActiveButton("Building");
                                                    // setMarketingConsent(1)
                                                    // setFormData({
                                                    //   ...formData,
                                                    //   type: marketingConsent,
                                                    // })
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
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    console.log("clicked", e);
                                                    setActiveButton("Content");
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
                                                    console.log("clicked", e);
                                                    setActiveButton("Both");
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
                                        value={selectedLocation?.gnafPid || ''}
                                        disabled
                                    // placeholder={"< Business Description >"}
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
                                        Building Name
                                    </label>
                                </div>
                                <div className="flex w-full">
                                    <Input
                                        inputClass="border-gray-500 rounded w-[400px]"
                                        type="text"
                                        value={buildingDetails.buildingName || ''}
                                        onChange={(e) => {
                                            setBuildingDetails({
                                                ...buildingDetails,
                                                buildingName: e.currentTarget.value
                                            })
                                        }}
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
                                        value={buildingDetails.constructionYear || ''}
                                        onChange={(e) => {
                                            console.log(e.currentTarget.value)
                                            setBuildingDetails({
                                                ...buildingDetails,
                                                constructionYear: e.currentTarget.value
                                            })
                                        }}
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
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
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
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
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
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
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
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
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
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
                                </div>
                            </div>
                            <div className="flex flex-row w-full mt-5">
                                <div className="flex items-center w-full">
                                    <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                        Risk Class (for Fire)
                                    </label>
                                </div>
                                <div className="flex w-full">
                                    <Select
                                        id="quotes"
                                        instanceId="quotes"
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
                                </div>
                            </div>
                            <div className="flex flex-row w-full my-5">
                                <div className="flex items-center w-full">
                                    <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                        Year Last Rewired
                                    </label>
                                </div>
                                <div className="flex w-full">
                                    <Select
                                        id="quotes"
                                        instanceId="quotes"
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
                                </div>
                            </div>
                            <Selection label={"Is the Building heritage protected or national trust listed?"} className={"pl-14 justify-center"} />
                            <div className="flex flex-row w-full mb-5">
                                <div className="flex items-center w-full">
                                    <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                        EPS % at Building
                                    </label>
                                </div>
                                <div className="flex w-full">
                                    <Select
                                        id="quotes"
                                        instanceId="quotes"
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
                                </div>
                            </div>
                            <Selection label={"Is the premises more than 50% vacant?"} className={"pl-14 justify-center"} />
                            <div className="flex w-full gap-2 mt-5">
                                <ButtonComponent
                                    name="Cancel"
                                    className="text-[#0070B0] border-[1px] border-[#0070B0] montserrat-regular rounded-md my-1 w-[200px]"
                                    onClick={() => {
                                        clearStates()
                                        setOpenCreateModal(false)
                                    }}
                                />
                                <ButtonComponent
                                    name="Continue"
                                    className="text-white border-[1px] bg-[#0070b0] montserrat-regular my-1  w-[200px]"
                                    onClick={() => {
                                        addNewBuilding()
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
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
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
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
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
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
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
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
                                </div>
                            </div>
                            <Selection label="Is the location connected to the town's water mains?" className={"pl-14 justify-center"} />
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
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
                                </div>
                            </div>
                            <Selection label="Does the business store flammable goods?" className={"pl-14 justify-center"} />
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
                                        // options={activeSurvey && activeSurvey.status === 'Draft' ? accounts : filteredAccounts}
                                        // value={recipientsForm ? recipientsForm.respondents : []}
                                        isMulti
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
                                        }} />
                                </div>
                            </div>
                            <Selection label="Does Sprinkler meets Australian Standards?" className={"pt-5 pl-14 justify-center"} />
                            <Selection label="Please confirm monitored alarm system?" className={"pt-5 pl-14 justify-center"} />
                            <Selection label="Is there an ATM on the premises?" className={"pt-5 pl-14 justify-center"} />
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
                                        setOpenCreateModal(!openCreateModal);
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
                                        type="text" />
                                </div>
                            </div>
                            <div className="flex w-full gap-2 mt-5">
                                <ButtonComponent
                                    name="Cancel"
                                    className="text-[#0070B0] border-[1px] border-[#0070B0] montserrat-regular rounded-md my-1 w-[200px]"
                                    onClick={() => setOpenCreateModal(false)} />
                                <ButtonComponent
                                    name="Continue"
                                    className="text-white border-[1px] bg-[#0070b0] montserrat-regular my-1  w-[200px]"
                                    onClick={() => {
                                        setOpenCreateModal(!openCreateModal);
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
                                        Building - Sum Insured<span className="text-[#de4523]">*</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                        Building - Sum Insured<span className="text-[#de4523]">*</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="text-[#162F3E] montserrat-regular text-[14px]">
                                        Building - Sum Insured<span className="text-[#de4523]">*</span>
                                    </label>
                                </div>
                                {/* half */}
                                <div className="w-[200px]">
                                    <Input
                                        inputClass="border-gray-500 rounded"
                                        type="text"
                                    // placeholder={"< Annual Turnover >"}
                                    />
                                </div>
                                <div className="flex w-[200px]">
                                    <Input
                                        inputClass="border-gray-500 rounded"
                                        type="text"
                                    // placeholder={"< Annual Turnover >"}
                                    />
                                </div>
                                <div className="w-[200px]">
                                    <Input
                                        inputClass="border-gray-500 rounded"
                                        type="text"
                                    // placeholder={"< Annual Turnover >"}
                                    />
                                </div>
                                <div className="flex w-[200px] items-center">
                                    <p className="text-[#5B5B5B] montserrat-regular text-[14px]">
                                        Location Description
                                    </p>
                                </div>

                            </div>
                            <div className="flex w-full gap-2 mt-5">
                                <ButtonComponent
                                    name="Cancel"
                                    className="text-[#0070B0] border-[1px] border-[#0070B0] montserrat-regular rounded-md my-1 w-[200px]"
                                    onClick={() => setOpenCreateModal(false)} />
                                <ButtonComponent
                                    name="Continue"
                                    className="text-white border-[1px] bg-[#0070b0] montserrat-regular my-1  w-[200px]"
                                    onClick={() => {
                                        setOpenCreateModal(!openCreateModal);
                                    }} />
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
                {
                    newBuilding && 
                    <div>
                        {
                        newBuilding.map((building, i) => {
                        return (
                        <div key={i+building} className="border-2 border-gray-200 rounded-lg p-4 mt-5">
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
                                        return(
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
                        )})
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