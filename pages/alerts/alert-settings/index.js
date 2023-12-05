import React, { useEffect, useState } from "react";
import Header from "/components/Header/Header";
import { BsBoxArrowUpRight, BsFillCircleFill } from "react-icons/bs";
import { BiChevronLeft } from "react-icons/bi";
import Router from 'next/router';
import AppInput from "/components/Base/AppInput";
import AppButton from "/components/Base/AppButton";

export default function AlertSetting() {
	
	const toggleDatas = [
		{
			id: 1,
			name: "Workbench Alerts"
		},
		{
			id: 2,
			name: "Claimsbench Alerts"
		},
		{
			id: 3,
			name: "Customer Access",
		},
		{
			id: 4,
			name: "Compliance",
		},
		{
			id: 5,
			name: "Document Library",
		},
		{
			id: 6,
			name: "Newsroom",
		},
		{
			id: 7,
			name: "Contact Us",
		},
		{
			id: 8,
			name: "Broker Access",
		},
		{
			id: 9,
			name: "Broker Rewards",
		},
		{
			id: 10,
			name: "Tasks",
		}
	]
	console.log("toggleDatas", toggleDatas)
	return (
		<>
			<Header page="Alerts " />
			<div className="container mx-auto px-7 py-10">
				<div>
					<a href="#"
						className="flex text-sm items-center justify-reverse cursor-pointer text-xs font-montserratBold text-contenta-pinky-red hover:text-contenta-tractor-red"
						onClick={(e) => {
							e.preventDefault();
							Router.push(`/alerts`)
						}}
					>
						<div className="">
							<BiChevronLeft size={25} />
						</div>
						<div className="my-2">
							Back to Alerts
						</div>
					</a>
				</div>
				<div className="flex flex-col">
					<div className="text-sm text-contenta-greyish-brown font-montserratBold py-5">
						Alert Settings
					</div>
					<div className="flex flex-col">
						<form action="">
							<div className="bg-white content-shadow rounded-xl">
								<div className="flex flex-col px-5 py-10">
									<div className="flex flex-row">
										<div className="w-1/3 text-sm text-contenta-greyish-brown font-montserratBold">
											Enable Desktop Notifications
										</div>
										<div className="w-1/3">
											<label htmlFor="myToggle" className="toggle">
												<input className="toggle__input" type="checkbox" id="myToggle" />
												<div className="toggle__fill">

												</div>
											</label>
										</div>
										<div className="w-1/3 flex justify-end gap-2 text-sm text-contenta-greyish-brown font-montserratRegular">
											<span>Last updated</span>
											<span>25 days ago</span>
										</div>
									</div>
									<div className="flex flex-row items-center py-5 border-b-1 border-contenta-gray">
										<div className="flex flex-col w-1/3 gap-2">
											<span className="text-sm text-contenta-greyish-brown font-montserratBold">
												Mute Alerts
											</span>
											<span className="text-sm text-contenta-greyish-brown font-montserratRegular">
												Silence alerts for a specific amount of time.
											</span>
										</div>
										<div className="" style={{ width: '200px' }}>
											<AppInput
												name="select-time"
												type="select"
												required
												items={
													[
														{
															label: '30 seconds',
															value: '',
														},
														{
															label: '60 seconds',
															value: '',
														},
														{
															label: '5 minutes',
															value: '',
														},
														{
															label: '10 minutes',
															value: '',
														},
														{
															label: '15 minutes',
															value: '',
														},
														{
															label: '1 hr',
															value: '',
														}
													]
												}
												placeholder="Select Time"
												inputClass=""
												classNames=" rounded-md w-full px-2 text-contenta-light-blue focus:outline-none border-2 focus:border-contenta-navy-blue"
											/>
										</div>
									</div>

									<div className="flex flex-col">
										<div className="text-sm text-contenta-greyish-brown font-montserratBold pt-5">
											Receive Alerts From:
										</div>
										<div className="w-full">
											<div className="grid grid-cols-2">
											{toggleDatas.map((item, index) => {
													return (
														<div className="pb-3 pt-7 border-b-1 border-contenta-gray w-full px-5">
															<div key={index} className="flex flex-row justify-between w-full">
																<div className="text-sm text-contenta-greyish-brown font-montserratBold">
																	{item.name}
																</div>
																<div>
																	<label htmlFor={`${item.id}`} className="toggle">
																		<input className="toggle__input" type="checkbox" id={`${item.id}`} />
																		<div className="toggle__fill"/>
																	</label>
																</div>
															</div>
														</div>
													)
												})}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="py-5 gap-4">
								<AppButton
									label="Cancel"
									customTheme="py-2 mr-3 rounded-md btn-width rounded-sm bg-transparent border-2 border-contenta-light-blue text-contenta-light-blue text-sm transition duration-300 ease-in-out focus:outline-none font-montserratBold hover:bg-contenta-light-blue hover:text-white"
									labelClass=""
								/>
								<AppButton
									label="Save Changes"
									customTheme="py-2 btn-width rounded-md hover:bg-transparent border-2 hover:border-contenta-light-blue border-contenta-light-blue hover:text-contenta-light-blue text-sm transition duration-300 ease-in-out focus:outline-none font-montserratBold bg-contenta-light-blue text-white"
									labelClass=""
									classNames="rounded-md w-full"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
