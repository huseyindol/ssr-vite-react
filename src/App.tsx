import { Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/about/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import We from "./pages/about/we";
import Team from "./pages/about/team";
import BuildInfo from "./components/BuildInfo";
import NotFound from "./pages/NotFound";

function App() {
	console.log("App");
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/about/we" element={<We />} />
				<Route path="/about/team" element={<Team />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/qwe" element={<Navigate to="/" replace />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<BuildInfo position="bottom-right" />
		</>
	);
}

export default App;
