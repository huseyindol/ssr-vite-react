import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter, matchRoutes } from "react-router-dom";
import { generateHeadContent, PageMeta, PageWithMeta } from "./utils/head";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Define routes for matching
const routes = [
	{ path: "/", element: <Home />, component: Home },
	{ path: "/about", element: <About />, component: About },
	{ path: "/about/*", element: <About />, component: About },
	{ path: "/contact", element: <Contact />, component: Contact }
];

export function render(url: string) {
	console.log('Server rendering URL:', url);
	
	// Make sure we're processing the URL correctly
	const cleanUrl = url.startsWith('/') ? url : `/${url}`;
	console.log('cleanUrl :>> ', cleanUrl);
	
	// Find the matching route
	const matches = matchRoutes(routes, cleanUrl);
	
	// Extract metadata from the matched route
	let pageMeta: PageMeta = {
		title: "Vite + React + TS + TailwindCSS"
	};
	
	if (matches && matches.length > 0) {
		const match = matches[matches.length - 1];
		const component = match.route.component as unknown as PageWithMeta;
		
		if (component && component.pageMeta) {
			pageMeta = {...pageMeta, ...component.pageMeta};
		}
	}
	
	const html = renderToString(
		<StrictMode>
			<StaticRouter location={cleanUrl}>
				<App />
			</StaticRouter>
		</StrictMode>,
	);
	
	// Return both html and head content based on the route's metadata
	return { 
		html,
		head: generateHeadContent(pageMeta)
	};
}
