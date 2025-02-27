import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom";

export function render(url: string) {
	console.log('Server rendering URL:', url);
	
	// Make sure we're processing the URL correctly
	const cleanUrl = url.startsWith('/') ? url : `/${url}`;
	console.log('cleanUrl :>> ', cleanUrl);
	const html = renderToString(
		<StrictMode>
			<StaticRouter location={cleanUrl}>
				<App />
			</StaticRouter>
		</StrictMode>,
	);
	// Return both html and head (even though head might be empty in this example)
	return { 
		html,
		head: '<title>Vite + React + TS + TailwindCSS</title>' // You can extend this if you need to include meta tags or other head content
	};
}
