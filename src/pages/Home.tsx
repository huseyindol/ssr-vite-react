import React, { useState } from "react";
import reactLogo from "../assets/react.svg";
import { PageMeta } from "../utils/head";

const Home = () => {
	const [count, setCount] = useState(0);
	console.log("Home");
	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src="/vite.svg" className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
};

// Define the metadata for this page
Home.pageMeta = {
	title: "Home Page | Vite + React + TS",
	description: "Welcome to our Home page built with Vite, React, and TypeScript",
	keywords: "vite, react, typescript, homepage"
} as PageMeta;

export default Home;
