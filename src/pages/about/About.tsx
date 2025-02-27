import React from "react";
import { Outlet } from "react-router-dom";
import { PageMeta } from "../utils/head";

const About = () => {
	console.log("About");
	return (
		<div>
			<h1>About</h1>
			<p>This is the about page</p>
		</div>
	);
};

// Define the metadata for this page
// About.pageMeta = {
// 	title: "About Us | Vite + React + TS",
// 	description: "Learn about our company and our mission",
// 	keywords: "about us, company, mission, team"
// } as PageMeta;

export default About;
