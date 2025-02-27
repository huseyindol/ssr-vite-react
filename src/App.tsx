import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import We from "./components/about/we";
import Team from "./components/about/team";

function App() {
	console.log("App");
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} >
				<Route path="we" element={<We />} />
				<Route path="team" element={<Team />} />
			</Route>
			<Route path="/contact" element={<Contact />} />
		</Routes>
	);
}

export default App;
