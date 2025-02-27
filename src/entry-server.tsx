import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom";
import { generateHeadContent, getMetaForRoute } from "./utils/head";
import { buildInfo, generateBuildInfoHtml } from "./utils/hash";

// We need to ensure all page modules are loaded to register metadata

export function render(url: string) {
	console.log('Server rendering URL:', url);
	
	// Make sure we're processing the URL correctly
	const cleanUrl = url.startsWith('/') ? url : `/${url}`;
	
	// Get metadata for the current route
	const pageMeta = getMetaForRoute(cleanUrl) || { title: "Vite + React + TS + TailwindCSS" };
	
	// Add build information to metadata if needed
	const metaWithBuildInfo = {
		...pageMeta,
		additionalTags: (pageMeta.additionalTags || '') + 
			`<meta name="build-id" content="${buildInfo.buildId}" />`
	};
	
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
		head: generateHeadContent(metaWithBuildInfo) + generateBuildInfoHtml(),
		buildHash: buildInfo.buildId
	};
}
