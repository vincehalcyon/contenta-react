/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import Head from "next/head";
import Sidebar from "components/Sidebar/Sidebar";

const DefaultLayout = (props) => {
	return (
		<>
			<Head>
				<title>Foundation</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex h-screen">
				<div className={() => `${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => `${setSidebarOpen(true)}`} className="z-20 inset-0 transition-opacity lg:hidden"/>
				<Sidebar/>
				<div className="">
					<main className="bg-contenta-pale-grey">
						{React.cloneElement(props.children)}
					</main>
					<footer></footer>
				</div>
			</div>
		</>
	);
};

export default DefaultLayout;
