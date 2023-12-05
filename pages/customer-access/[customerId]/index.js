import Header from 'components/Header/Header';
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router'
import AppInput from 'components/Base/AppInput';
import AppPagination from 'components/Base/AppPagination'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoInformationCircleSharp } from 'react-icons/io5';
import { MdArrowDropDown } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';

const PaginatedItems = ({ itemsPerPage }) => {

   const router = useRouter();

   const policyTableHeader = [
      {
         name: "Effective Date",
         dataIndex: "effectiveDate",
         icon: "MdArrowDropDown",
      },
      {
         name: "Policy No.",
         dataIndex: "policyNo",
         icon: "MdArrowDropDown",
      },
      {
         name: "Expiry Date",
         dataIndex: "date",
         icon: "MdArrowDropDown",
      },
      {
         name: "Line of Business",
         dataIndex: "business",
         icon: "MdArrowDropDown",
      },
      {
         name: "Status",
         dataIndex: "status",
         icon: "MdArrowDropDown",
      }
   ];

   let policyData = [
      {
         effectiveDate: "03-10-2021",
         policyNo: "TN2083",
         dateExpiry: "03/10/2029",
         policyBusiness: "Professional",
         policyStatus: "Completed",
      },
      {
         effectiveDate: "03-10-2021",
         policyNo: "TN2083",
         dateExpiry: "03/10/2029",
         policyBusiness: "Professional",
         policyStatus: "Failed",
      },
      {
         effectiveDate: "03-10-2021",
         policyNo: "TN2084",
         dateExpiry: "03/10/2029",
         policyBusiness: "Retail",
         policyStatus: "Active",
      },
      {
         effectiveDate: "03-10-2021",
         policyNo: "TN2084",
         dateExpiry: "03/10/2029",
         policyBusiness: "Retail",
         policyStatus: "Active",
      },
      {
         effectiveDate: "03-10-2021",
         policyNo: "TN2085",
         dateExpiry: "03/10/2029",
         policyBusiness: "Professional",
         policyStatus: "Failed",
      },
      {
         effectiveDate: "03-10-2021",
         policyNo: "TN2085",
         dateExpiry: "03/10/2029",
         policyBusiness: "Professional",
         policyStatus: "Completed",
      },
   ]

   const [filterSearch, setFilteredSearch] = useState(policyData)

   const [q, setQ] = useState("");
   
   useEffect(() => {
      // q?.filter((item) => policyData.policyData.includes(item))
      policyData = policyData.filter((item) => item.policyNo.toLocaleLowerCase().includes(q.toLowerCase()))
      console.log("results", policyData)

      setFilteredSearch(policyData)
   }, [q])

   const [currentItems, setCurrentItems] = useState(null);
   const [filteredItems, setFilteredItems] = useState(null);
   const [pageCount, setPageCount] = useState(0);
   const [itemOffset, setItemOffset] = useState(0);
 
   useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
 
      setCurrentItems(policyData);
      setFilteredItems(policyData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(policyData.length / itemsPerPage));
   }, [itemOffset, itemsPerPage]);
 
   const handlePageClick = (event) => {
     const newOffset = (event.selected * itemsPerPage) % policyData.length;
     setItemOffset(newOffset);
   };

   // const [paramsPagination, setParamsPagination] = useState({
   //    currentPage: 1,
   //    perPage: 3,
   //    total: policyData && policyData.length ? policyData.length : 0,
   // })

   const claimTableHeader = [
      {
         name: "Claim ID",
         dataIndex: "claimID",
         icon: "MdArrowDropDown",
      },
      {
         name: "Date Created",
         dataIndex: "claimCreated",
         icon: "MdArrowDropDown",
      },
      {
         name: "Policy No.",
         dataIndex: "date",
         icon: "MdArrowDropDown",
      },
      {
         name: "Insured Name",
         dataIndex: "insured",
         icon: "MdArrowDropDown",
      },
      {
         name: "Status",
         dataIndex: "status",
         icon: "MdArrowDropDown",
      }
   ];

   let claimData = [
      {
         claimID: "PLO19479",
         claimCreated: "03/10/2029 ",
         claimNo: "TN2083",
         claimName: "Angela Kinsey",
         claimStatus: "Lodged",
      },
      {
         claimID: "PLO19479",
         claimCreated: "03/10/2029 ",
         claimNo: "TN2083",
         claimName: "Sarah Angga",
         claimStatus: "Broker",
      },
      {
         claimID: "PLO19479",
         claimCreated: "03/10/2029 ",
         claimNo: "TN2083",
         claimName: "Clara Mae Tacatani",
         claimStatus: "Customer",
      },
      {
         claimID: "PLO19479",
         claimCreated: "03/10/2029 ",
         claimNo: "TN2083",
         claimName: "Angelo Palma",
         claimStatus: "Lodged",
      },
      {
         claimID: "PLO19479",
         claimCreated: "03/10/2029 ",
         claimNo: "TN2083",
         claimName: "Angelo Palma",
         claimStatus: "Lodged",
      },
      {
         claimID: "PLO19479",
         claimCreated: "03/10/2029 ",
         claimNo: "TN2083",
         claimName: "Angelo Palma",
         claimStatus: "Lodged",
      },
      {
         claimID: "PLO19479",
         claimCreated: "03/10/2029 ",
         claimNo: "TN2083",
         claimName: "Angelo Palma",
         claimStatus: "Lodged",
      },
   ]

   const [filterClaim, setFilteredClaim] = useState(claimData)

   const [claim, setClaim] = useState("");
   useEffect(() => {
      console.log("search", claim)
      // claim?.filter((item) => claimData.claimData.includes(item))
      claimData = claimData.filter((item) => item.claimName.toLocaleLowerCase().includes(claim.toLowerCase()))
      setFilteredClaim(claimData)
   }, [claim])

   

   return (
      <>
         <Header page="Customer Access " label="this is for Customer Access" />
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
                     Back to Customer Access
                  </div>
               </a>
            </div>
            <div className="py-5 text-xl text-contenta-greyish-brown font-montserratBold">
               Customer Details
            </div>
            <div className="flex flex-col pb-5">
               <div className="content-shadow bg-white p-5 rounded-lg">
                  <div className="flex lg:flex-row flex-col w-full">
                     <div className="flex flex-col xl:w-1/2 lg:w-1/2 md:w-1/2 w-full">
                        <div className="flex py-3 text-sm font-montserratBold">
                           <div className="text-contenta-gray w-full">
                              Effective Date
                           </div>
                           <div className="text-contenta-greyish-brown w-full">
                              Property
                           </div>
                        </div>
                        <div className="flex py-3 text-sm font-montserratBold">
                           <div className="text-contenta-gray w-full">
                              Name
                           </div>
                           <div className="text-contenta-greyish-brown w-full">
                              Dwight Schrute
                           </div>
                        </div>
                        <div className="flex py-3 text-sm font-montserratBold">
                           <div className="text-contenta-gray w-full">
                              Email
                           </div>
                           <div className="text-contenta-greyish-brown w-full">
                              test@gmail.com
                           </div>
                        </div>
                        <div className="flex py-3 text-sm font-montserratBold">
                           <div className="text-contenta-gray w-full">
                              Phone
                           </div>
                           <div className="text-contenta-greyish-brown w-full">
                              +15701883348
                           </div>
                        </div>
                        <div className="flex py-3 text-sm font-montserratBold">
                           <div className="text-contenta-gray w-full">
                              Address
                           </div>
                           <div className="text-contenta-greyish-brown w-full">
                              Scranton, Pennsylvania
                           </div>
                        </div>
                        <div className="flex py-3 text-sm font-montserratBold">
                           <div className="text-contenta-gray w-full">
                              Suburb
                           </div>
                           <div className="text-contenta-greyish-brown w-full">
                              Schrute Farm
                           </div>
                        </div>
                        <div className="flex py-3 text-sm font-montserratBold">
                           <div className="text-contenta-gray w-full">
                              Post Code
                           </div>
                           <div className="text-contenta-greyish-brown w-full">
                              1570
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col xl:w-1/2 lg:w-1/2 md:w-1/2 w-full">
                        <div className="flex py-3 text-sm font-montserratBold">
                           <div className="text-contenta-gray w-full">
                              Customer Portal
                           </div>
                           <div className="text-contenta-greyish-brown w-full">
                              1570
                           </div>
                        </div>
                        <div className="flex py-3 text-sm font-montserratBold">
                           <div className="text-contenta-gray w-full">
                              Rewards Exchange
                           </div>
                           <div className="text-contenta-greyish-brown w-full">
                              1570
                           </div>
                        </div>
                        <div className="flex py-3 text-sm font-montserratBold">
                           <div className="text-contenta-gray w-full">
                              Last Online
                           </div>
                           <div className="text-contenta-greyish-brown w-full">
                              2h ago
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 py-3">
                     <div className="text-contenta-greyish-brown">
                        <IoInformationCircleSharp size={24} />
                     </div>
                     <p className="font-montserratRegular text-contenta-greyish-brown text-sm">To edit customer details, please visit insurance platform</p>
                  </div>
               </div>
            </div>
            <div className="py-5 text-sm text-contenta-greyish-brown font-montserratBold">
               Policy Details
            </div>
            <div className="flex flex-col pb-5 ">
               <div className=" overflow-x-auto content-shadow">
                  <div className="py-2 align-middle inline-block min-w-full content-shadow bg-white rounded-md">
                     <div className="overflow-auto border-b border-gray-200">
                        <div className="flex items-center px-5 py-2 shadow-sm rounded-t-md shadow-lg bg-white justify-between  border-b-1 border-gray-200">
                           <div className="items-center flex  text-contenta-gray text-sm font-montserratBold">
                              <AiOutlineSearch size={24} />
                              <AppInput
                                 // label="Name"
                                 name="title"
                                 type="text"
                                 size="150"
                                 // required
                                 // value={form.name}
                                 placeholder="Seartch or Add Filter"
                                 inputClass="my-1 w-full"
                                 classNames=" rounded w-1/2 py-2 px-4 text-gray-700 focus:outline-none"
                                 value={q}
                                 onChange={(e) => setQ(e.target.value)}
                              />
                           </div>
                           <div className="flex items-center">
                              <div className="relative lg:mx-0">
                                 <button className="btn-width py-2 rounded-lg bg-transparent border-2 border-contenta-light-blue text-contenta-light-blue text-sm transition duration-300 ease-in-out focus:outline-none font-montserratBold hover:bg-contenta-light-blue hover:text-white">
                                    Export CSV
                                 </button>
                              </div>
                           </div>
                        </div>
                        {filterSearch?.length > 0 ?
                           <>
                              <table className="min-w-full divide-y divide-gray-200">
                                 <thead className="bg-white">
                                    <tr>
                                       {policyTableHeader.map((items, i) =>
                                          <th
                                             key={i}
                                             scope="col"
                                             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-1 border-gray-200 "
                                          >
                                             <div className="flex items-center">
                                                <div>
                                                   {items.name}
                                                </div>
                                                <button>
                                                   <MdArrowDropDown size={18} />
                                                </button>
                                             </div>
                                          </th>
                                       )}
                                    </tr>
                                 </thead>
                                 <tbody className="bg-white divide-y divide-gray-200">
                                    {filterSearch?.map((items, i) =>
                                       <tr key={i} className="border-b-1 border-gray-200">
                                          <td className="px-6 py-4 whitespace-nowrap ">
                                             <div className="text-sm text-gray-500">
                                                {items.effectiveDate}
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <div className="text-sm text-gray-500">
                                                {items.policyNo}
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <div className="text-sm text-gray-500">
                                                {items.dateExpiry}
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <div className="text-sm text-gray-500">
                                                {items.policyBusiness}
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap w-48">
                                             {
                                                items.policyStatus === 'Active' && (
                                                   <div className="px-4 py-1 bg-opacity-50 rounded text-sm font-montserratBold justify-center flex bg-contenta-seaweed-green text-contenta-jungle-green">
                                                      Active
                                                   </div>
                                                )
                                             }

                                             {
                                                items.policyStatus === 'Completed' && (
                                                   <div className="px-4 py-1 bg-opacity-50 rounded text-sm font-montserratBold justify-center flex bg-contenta-seaweed-green text-contenta-jungle-green">
                                                      Completed
                                                   </div>
                                                )
                                             }

                                             {
                                                items.policyStatus === 'Failed' && (
                                                   <div className="px-4 py-1 bg-opacity-50 rounded text-sm font-montserratBold justify-center flex text-contenta-darkish-red bg-contenta-pinky-red">
                                                      Failed
                                                   </div>
                                                )
                                             }
                                          </td>
                                       </tr>
                                    )}
                                 </tbody>
                              </table>
                           </> : <>
                              <div className="flex justify-center w-full text-sm p-10 text-contenta-greyish-brown w-full bg-white">
                                 No results found
                              </div>
                           </>
                        }
                     </div>
                     <div className="flex items-center gap-2 px-5 py-3">
                        <div className="text-contenta-greyish-brown">
                           <IoInformationCircleSharp size={24} />
                        </div>
                        <p className="font-montserratRegular text-contenta-greyish-brown text-sm">To edit customer details, please visit insurance platform</p>
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-2 py-5">
                  <div className="flex justify-end">
                     {/* <AppPagination
                        pagination={paramsPagination}
                        onPaginate={() => test()}
                        activeClass="text-white bg-contenta-blue rounded-md font-montserratBold"
                        hideTotal
                     /> */}
                     <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                     />
                  </div>
                  <div className="flex items-center justify-end gap-2">
                     <div className="text-contenta-greyish-brown">
                        Records per page
                     </div>
                     <AppInput
                        name="select"
                        type="select"
                        required
                        items={
                           [
                              {
                                 label: '5',
                                 value: '',
                              },
                              {
                                 label: '10',
                                 value: '',
                              },
                              {
                                 label: '15',
                                 value: '',
                              },
                              {
                                 label: '20',
                                 value: '',
                              },
                              {
                                 label: '25',
                                 value: '',
                              },
                              {
                                 label: '30',
                                 value: '',
                              }
                           ]
                        }
                        placeholder="Select"
                        inputClass="w-15"
                        classNames="rounded-md px-2 text-contenta-light-blue focus:outline-none border-2 focus:border-contenta-navy-blue"
                     />
                  </div>
               </div>
            </div>
            <div className="py-5 text-sm text-contenta-greyish-brown font-montserratBold">
               Claim Details
            </div>
            <div className="flex flex-col pb-5 ">
               <div className=" overflow-x-auto content-shadow">
                  <div className="py-2 align-middle inline-block min-w-full content-shadow bg-white rounded-md">
                     <div className="overflow-auto border-b border-gray-200">
                        <div className="flex items-center px-5 py-2 shadow-sm rounded-t-md shadow-lg bg-white justify-between  border-b-1 border-gray-200">
                           <div className="items-center flex text-contenta-gray text-sm font-montserratBold">
                              <AiOutlineSearch size={24} />
                              <AppInput
                                 // label="Name"
                                 name="title"
                                 type="text"
                                 size="150"
                                 // required
                                 // value={form.name}
                                 placeholder="Seartch or Add Filter"
                                 inputClass="my-1 w-full"
                                 classNames=" rounded w-1/2 py-2 px-4 text-gray-700 focus:outline-none"
                                 value={claim}
                                 onChange={(e) => setClaim(e.target.value)}
                              />
                           </div>
                           <div className="flex items-center">
                              <div className="relative lg:mx-0">
                                 <button className="btn-width py-2 rounded-lg bg-transparent border-2 border-contenta-light-blue text-contenta-light-blue text-sm transition duration-300 ease-in-out focus:outline-none font-montserratBold hover:bg-contenta-light-blue hover:text-white">
                                    Export CSV
                                 </button>
                              </div>
                           </div>
                        </div>
                        {filterClaim.length > 0 ?
                           <>
                              <table className="min-w-full divide-y divide-gray-200">
                                 <thead className="bg-white">
                                    <tr>
                                       {claimTableHeader.map((items, i) =>
                                          <th
                                             key={i}
                                             scope="col"
                                             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-1 border-gray-200 "
                                          >
                                             <div className="flex items-center">
                                                <div>
                                                   {items.name}
                                                </div>
                                                <button>
                                                   <MdArrowDropDown size={18} />
                                                </button>
                                             </div>
                                          </th>
                                       )}
                                    </tr>
                                 </thead>
                                 <tbody className="bg-white divide-y divide-gray-200">
                                    {filterClaim.map((items, i) =>
                                       <tr key={i} className="border-b-1 border-gray-200">
                                          <td className="px-6 py-4 whitespace-nowrap ">
                                             <div className="text-sm text-gray-500">
                                                {items.claimID}
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <div className="text-sm text-gray-500">
                                                {items.claimCreated}
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <div className="text-sm text-gray-500">
                                                {items.claimNo}
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                             <div className="text-sm text-gray-500">
                                                {items.claimName}
                                             </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap w-48">
                                             {
                                                items.claimStatus === 'Lodged' && (
                                                   <div className="px-4 py-1 bg-opacity-50 rounded text-sm font-montserratBold justify-center flex bg-contenta-seaweed-green text-contenta-jungle-green">
                                                      Lodged
                                                   </div>
                                                )
                                             }

                                             {
                                                items.claimStatus === 'Broker' && (
                                                   <div className="px-4 py-1 bg-opacity-50 rounded text-sm font-montserratBold justify-center flex bg-contenta-puke-yellow text-contenta-muddy-brown">
                                                      Broker Draft
                                                   </div>
                                                )
                                             }

                                             {
                                                items.claimStatus === 'Customer' && (
                                                   <div className="px-4 py-1 bg-opacity-50 rounded text-sm font-montserratBold justify-center flex text-contenta-darkish-red bg-contenta-pinky-red">
                                                      Customer Lodge
                                                   </div>
                                                )
                                             }
                                          </td>
                                       </tr>
                                    )}
                                 </tbody>
                              </table>
                           </> : <>
                              <div className="flex justify-center w-full text-sm p-10 text-contenta-greyish-brown w-full bg-white">
                                 No results found
                              </div>
                           </>
                        }
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-2 py-5">
                  <div className="flex justify-end">
                     {/* <AppPagination
                        pagination={paramsPagination}
                        onPaginate={() => test()}
                        activeClass="text-white bg-contenta-blue rounded-md font-montserratBold"
                        hideTotal
                     /> */}
                     <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                     />
                  </div>
                  <div className="flex items-center justify-end gap-2">
                     <div className="text-contenta-greyish-brown">
                        Records per page
                     </div>
                     <AppInput
                        name="select"
                        type="select"
                        required
                        items={
                           [
                              {
                                 label: '5',
                                 value: '',
                              },
                              {
                                 label: '10',
                                 value: '',
                              },
                              {
                                 label: '15',
                                 value: '',
                              },
                              {
                                 label: '20',
                                 value: '',
                              },
                              {
                                 label: '25',
                                 value: '',
                              },
                              {
                                 label: '30',
                                 value: '',
                              }
                           ]
                        }
                        placeholder="Select"
                        inputClass="w-15"
                        classNames="rounded-md px-2 text-contenta-light-blue focus:outline-none border-2 focus:border-contenta-navy-blue"
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

// export default CustomerDetails;
export default function CustomerDetails() {
   return <PaginatedItems itemsPerPage={5} />;
}