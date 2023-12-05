import Header from 'components/Header/Header';
import React, { useEffect, useState } from 'react';
import AppInput from "components/Base/AppInput";
import { AiOutlineSearch } from 'react-icons/ai';
import { MdArrowDropDown } from 'react-icons/md';
import Router, { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

const CustomerOverview = ({itemsPerPage}) => {

   const router = useRouter();

   const customersTableHeader = [
		{
			name: "Customer ID",
			dataIndex: "customerID",
			icon: "MdArrowDropDown",
		},
		{
			name: "Full Name",
			dataIndex: "customerName",
			icon: "MdArrowDropDown",
		},
		{
			name: "Email",
			dataIndex: "email",
			icon: "MdArrowDropDown",
		},
		{
			name: "Phone",
			dataIndex: "phone",
			icon: "MdArrowDropDown",
		},
		{
			name: "Last Login",
			dataIndex: "address",
			icon: "MdArrowDropDown",
		},
		{
			name: "Customer Portal",
			dataIndex: "customerStatus",
			icon: "MdArrowDropDown",
		},
		{
			name: "Rewards Exchange",
			dataIndex: "customerStatus",
			icon: "MdArrowDropDown",
		},
	];

	let customersData = [
		{
			customerID: "1Z-00936A",
			customerName: "John",
			dateCreated: "10/04/21",
			email: "saas@gmail.com",
			phone: "099999999",
			lastLogin: "10-10-21",
			address: "ghf",
			customerStatus: "pending",
		},
		{
			customerID: "1Z-00936A",
			customerName: "Sarah",
			dateCreated: "10/05/21",
			email: "abc@gmail.com",
			phone: "0988888888",
			lastLogin: "10-10-21",
			address: "dgg",
			customerStatus: "pending",
		},
		{
			customerID: "1Z-00936A",
			customerName: "Doe",
			dateCreated: "10/06/21",
			email: "123@gmail.com",
			phone: "0977777777",
			lastLogin: "10-10-21",
			address: "sdg",
			customerStatus: "pending",
		},
		{
			customerID: "1Z-00936A",
			customerName: "Rose",
			dateCreated: "10/07/21",
			email: "jajajj@gmai.com",
			lastLogin: "10-10-21",
			phone: "09666666666",
			address: "asd",
			customerStatus: "pending",
		},
		{
			customerID: "1Z-00936A",
			customerName: "BP",
			dateCreated: "10/08/21",
			email: "kakakak@gmail.com",
			lastLogin: "10-10-21",
			phone: "45",
			address: "gds",
			customerStatus: "pending",
		},
		{
			customerID: "1Z-00936A",
			customerName: "JS",
			dateCreated: "10/08/21",
			email: "kakakak@gmail.com",
			lastLogin: "10-10-21",
			phone: "45",
			address: "gds",
			customerStatus: "pending",
		},
	]
	const [filter, setFiltered] = useState(customersData)

	const [q, setQ] = useState("");
	useEffect(() => {
		console.log("search", q)
		// q?.filter((item) => customersData.customersData.includes(item))
		customersData = customersData.filter((item) => item.customerName.toLocaleLowerCase().includes(q.toLowerCase()))
		setFiltered(customersData)
	}, [q])
	console.log("filtered", filter)

   const [currentItems, setCurrentItems] = useState(null);
   const [filteredItems, setFilteredItems] = useState(null);
   const [pageCount, setPageCount] = useState(0);
   const [itemOffset, setItemOffset] = useState(0);
 
   useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
 
      setCurrentItems(customersData);
      setFilteredItems(customersData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(customersData.length / itemsPerPage));
   }, [itemOffset, itemsPerPage]);
 
   const handlePageClick = (event) => {
     const newOffset = (event.selected * itemsPerPage) % customersData.length;
     setItemOffset(newOffset);
   };

   return (
      <>
         <Header page="Customer Access " label="this is for Customer Access" />
         <div className="flex flex-col px-7 py-10 items ">
            <div className="pb-5 text-sm text-contenta-greyish-brown font-montserratBold">
               Customer Overview
            </div>
            <div className="flex flex-col">
               <div class="py-2 align-middle inline-block min-w-full">
                  <div class="content-shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
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
                     {filter.length > 0 ?
                        <>
                           <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-white">
                                 <tr>
                                    {customersTableHeader.map((items, i) =>
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
                              <tbody className="bg-white">
                                 {filter.map((items, i) =>
                                    <tr key={i} className="border-b-1 border-gray-200 hover:bg-gray-200 cursor-pointer">
                                       <div
                                          className="cursor-pointer"
                                          onClick={(e) => {
                                             e.preventDefault();
                                             Router.push(`/customer-access/${items.customerID}`)
                                          }}
                                       >
                                          <td className="px-6 py-4 whitespace-nowrap ">
                                             <div className="text-sm text-gray-500">
                                                {items.customerID}
                                             </div>
                                          </td>
                                       </div>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm text-gray-500">
                                             {items.customerName}
                                          </div>
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm text-gray-500">
                                             {items.email}
                                          </div>
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm text-gray-500">
                                             {items.phone}
                                          </div>
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm text-gray-500">
                                             11-10-2021
                                          </div>
                                       </td>
                                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div>
															<label htmlFor={`${items.customerID}`} className="toggle">
																<input className="toggle__input" type="checkbox" id={`${items.customerID}`} />
																<div className="toggle__fill"/>
															</label>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<div>
															<label htmlFor={`${items.customerID}`} className="toggle">
																<input className="toggle__input" type="checkbox" id={`${items.customerID}`} />
																<div className="toggle__fill"/>
															</label>
														</div>
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

// export default CustomerPverview;
export default function CustomerPverview() {
   return <CustomerOverview itemsPerPage={5} />;
}