import React, { useEffect, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import Header from "/components/Header/Header";
import { BsBoxArrowUpRight, BsFillCircleFill } from "react-icons/bs";
import AppButton from "/components/Base/AppButton";
// import axios from "axios";
import Router from 'next/router';
import axios from '/lib/axios'

export default function ShowMore() {

	// const onSubmitHandler = async (e) => {
	// 	e.preventDefault()
	// 	try {

	// 		const s = await axios.post('https://s3.staging.halcyondigitalhost.com/api/node/test_content_type', {
	// 			data: {
	// 				type: "node--test_content_type",
	// 				attributes: {
	// 					title: "Custom Axios",
	// 					body: {
	// 						value: "This is a third test"
	// 					}
	// 				}
	// 			}
	// 		})

	// 		console.log('post', s);
	// 	} catch (error) {
	// 		console.log(error.response)
	// 	}
	// }

	const alertList = [
		{
			id: 1,
			status: "read",
			date: '10/12/21',
			time: 3,
			body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quaerat rerum laudantium veniam nobis, natus excepturi soluta aliquid dolore praesentium facilis nostrum consequatur? Sit repellat fugiat sint odit ut consequuntur.',
		},
		{
			id: 2,
			status: "read",
			date: '10/12/21',
			time: 3,
			body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quaerat rerum laudantium veniam nobis, natus excepturi soluta aliquid dolore praesentium facilis nostrum consequatur? Sit repellat fugiat sint odit ut consequuntur.',
		},
		{
			id: 3,
			status: "read",
			date: '10/12/21',
			time: 3,
			body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quaerat rerum laudantium veniam nobis, natus excepturi soluta aliquid dolore praesentium facilis nostrum consequatur? Sit repellat fugiat sint odit ut consequuntur.',
		},
		{
			id: 4,
			status: "read",
			date: '10/12/21',
			time: 3,
			body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quaerat rerum laudantium veniam nobis, natus excepturi soluta aliquid dolore praesentium facilis nostrum consequatur? Sit repellat fugiat sint odit ut consequuntur.',
		},
		{
			id: 5,
			status: "unread",
			date: '10/12/21',
			time: 3,
			body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quaerat rerum laudantium veniam nobis, natus excepturi soluta aliquid dolore praesentium facilis nostrum consequatur? Sit repellat fugiat sint odit ut consequuntur.',
		},
		{
			id: 6,
			status: "unread",
			date: '10/12/21',
			time: 3,
			body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quaerat rerum laudantium veniam nobis, natus excepturi soluta aliquid dolore praesentium facilis nostrum consequatur? Sit repellat fugiat sint odit ut consequuntur.',
		},
		{
			id: 7,
			status: "unread",
			date: '10/12/21',
			time: 3,
			body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quaerat rerum laudantium veniam nobis, natus excepturi soluta aliquid dolore praesentium facilis nostrum consequatur? Sit repellat fugiat sint odit ut consequuntur.',
		},
	]

	return (
		<>
			<Header page="Alerts " />
			<div className="container mx-auto px-7 py-10">
				<div className="flex flex-row justify-between">
					<div className="text-sm text-contenta-greyish-brown font-montserratBold">
						Alerts
					</div>
					<div
						className="text-contenta-gray cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							Router.push(`/alerts/alert-settings`)
						}}
					>
						<AiFillSetting />
					</div>
				</div>
				{/* <div className="flex flex-col">
					<form onSubmit={onSubmitHandler}>
						<input type="text" className="border" />
						<button>submit</button>
					</form>
				</div> */}
				<div className="w-full flex flex-col gap-4 items-center py-5">
					{alertList.map((item, i) =>
						<div className={`flex flex-row content-shadow rounded-xl p-5 ${item.status === "read" ? "bg-white" : "bg-gray-200"}`} key={i}>
							<div className="flex flex-row items-center ">
								<div className={`p-5 ${item.status === "read" ? "text-contenta-pinky-red" : "text-contenta-blue"}`}>
									<BsFillCircleFill size={20} />
								</div>
								<div className="flex flex-col w-64 text-contenta-greyish-brown font-MontserratRegular">
									<div className="flex justify-center text-sm">
										{item.date}
									</div>
									<div className="flex justify-center text-xs">
										{item.time} mins ago
									</div>
								</div>
								<div className="px-5 text-sm text-contenta-greyish-brown font-MontserratRegular">
									{item.body}
								</div>
							</div>
							<div className="flex flex-row items-center justify-end gap-2">
								<button 
									className="py-2 btn-width rounded-lg bg-transparent border-2 border-contenta-light-blue text-contenta-light-blue text-sm transition duration-300 ease-in-out focus:outline-none font-montserratBold hover:bg-contenta-light-blue hover:text-white"
									onClick={(e) => {
										e.preventDefault();
										Router.push(`#`)
									}}
								>
									<div className="flex items-center justify-center">
										<div className="font-MontserratBold">
											<BsBoxArrowUpRight size={16} />
										</div>
										<span className="pl-2">Go</span>
									</div>
								</button>
								<button 
									className="py-2 btn-width rounded-lg bg-transparent border-2 border-contenta-light-blue text-contenta-light-blue text-sm transition duration-300 ease-in-out focus:outline-none font-montserratBold hover:bg-contenta-light-blue hover:text-white"
									onClick={(e) => {
										e.preventDefault();
										Router.push(`#`)
									}}
								>
									<div className="flex items-center justify-center">
										<span className="pl-2">{item.status}</span>
									</div>
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
