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
                                            // onClick={(e) => {
                                            //     e.preventDefault();
                                            //     console.log("clicked", e);
                                            //     setActiveButton("Both");
                                            // }}
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