import React from "react";
import { Outlet } from "react-router-dom";
import { PageMeta, registerMetaForRoute } from "../../utils/head";

// Register metadata for this route
registerMetaForRoute('/about', {
	title: "About Us | Vite + React + TS",
	description: "Learn about our company and our mission",
	keywords: "about us, company, mission, team",
});

const About = () => {
	console.log("About");
	return (
		<div>
			<h1>About</h1>
			<p>This is the about page</p>
      <Outlet />
		</div>
	);
};

export default About;
