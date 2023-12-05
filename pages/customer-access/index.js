
import ChartPie from "components/Chart/pie-chart";
import Header from "components/Header/Header";
import React, { useEffect, useState } from "react";
import { useSortableData } from "hooks/common/sortingTable";
import { HiUserAdd, HiUserGroup, HiUserRemove } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import AppButton from "components/Base/AppButton";
import AppInput from "components/Base/AppInput";
import { AiOutlineSearch } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import Router, { useRouter } from 'next/router';
import Link from 'next/link'


const CustomerAccess = () => {

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
			customerID: "1Z-00936B",
			customerName: "Sarah",
			dateCreated: "10/05/21",
			email: "abc@gmail.com",
			phone: "0988888888",
			lastLogin: "10-10-21",
			address: "dgg",
			customerStatus: "pending",
		},
		{
			customerID: "1Z-00936C",
			customerName: "Doe",
			dateCreated: "10/06/21",
			email: "123@gmail.com",
			phone: "0977777777",
			lastLogin: "10-10-21",
			address: "sdg",
			customerStatus: "pending",
		},
		{
			customerID: "1Z-00936D",
			customerName: "Rose",
			dateCreated: "10/07/21",
			email: "jajajj@gmai.com",
			lastLogin: "10-10-21",
			phone: "09666666666",
			address: "asd",
			customerStatus: "pending",
		},
		{
			customerID: "1Z-00936E",
			customerName: "BP",
			dateCreated: "10/08/21",
			email: "kakakak@gmail.com",
			lastLogin: "10-10-21",
			phone: "45",
			address: "gds",
			customerStatus: "pending",
		},
		{
			customerID: "1Z-00936F",
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

	return (
		<>
			<Header page="Customer Access " label="this is for Customer Access" />
			<div className="flex flex-col px-7 py-10 items ">
				<div className="flex lg:flex-row flex-col w gap-5 w-full pb-5">
					<div className="lg:w-1/2 w-full">
						<div className="pb-5 text-sm text-contenta-greyish-brown font-montserratBold">
							Customer Access Summary
						</div>
						<div className="content-shadow p-5 rounded-lg bg-white">
							<ChartPie />
						</div>
					</div>
					<div className="lg:w-1/2 w-full border-red-900">
						<div className="pb-5 text-sm text-contenta-greyish-brown font-montserratBold">
							Customer Population
						</div>
						<div className="flex items-center justify-between content-shadow p-5 mb-5 rounded-lg bg-white">
							<div className="flex flex-row text-contenta-greyish-brown">
								<div className="text-3xl font-montserratBold">
									10,258
								</div>
								<div className="flex flex-col px-5">
									<span className="font-montserratBold">Total Number of Customer</span>
									<small className="font-montserratRegular">as of today</small>
								</div>
							</div>
							<div>
								<HiUserGroup className="text-contenta-light-blue" size={40} />
							</div>
						</div>
						<div className="flex items-center justify-between content-shadow p-5 mb-5 rounded-lg bg-white">
							<div className="flex flex-row text-contenta-greyish-brown">
								<div className="text-3xl font-montserratBold">
									7,130
								</div>
								<div className="flex flex-col px-5">
									<span className="font-montserratBold">Number of Active Customer</span>
									<small className="font-montserratRegular">as of today</small>
								</div>
							</div>
							<div>
								<HiUserAdd className="text-contenta-light-blue" size={40} />
							</div>
						</div>
						<div className="flex items-center justify-between content-shadow p-5 rounded-lg bg-white">
							<div className="flex flex-row text-contenta-greyish-brown">
								<div className="text-3xl font-montserratBold">
									10,258
								</div>
								<div className="flex flex-col px-5">
									<span className="font-montserratBold">Number of Inactive Customer</span>
									<small className="font-montserratRegular">as of today</small>
								</div>
							</div>
							<div>
								<HiUserRemove className="text-contenta-light-blue" size={40} />
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col py-5">
					<div class="align-middle inline-block min-w-full">
						<div class="content-shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
							<div className="flex items-center px-5 py-2 shadow-sm rounded-t-md shadow-lg bg-white justify-between  border-b-1 border-gray-200">
								<div className="items-center flex text-contenta-gray text-sm font-montserratBold">
									<div className="">
										<AiOutlineSearch size={24} />
									</div>
									<AppInput
										name="title"
										type="text"
										size="150"
										placeholder="Seartch or Add Filter"
										inputClass="my-1 w-full text-sm text-contenta-gray"
										classNames=" rounded w-1/2 py-2 text-contenta-gray px-4 text-gray-700 focus:outline-none"
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
												<tr key={i} className="border-b-1 border-gray-200 hover:bg-gray-200">
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
							<div className="flex justify-end gap-1 bg-white">
								<Link href="customer-access/customer-overview/">
									<a className="flex items-center text-xxs font-montserratBold text-contenta-pinky-red p-5">
										View More
										<FaChevronRight />
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default CustomerAccess;