import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";

interface Props {}

const Wrapper = (props: Props) => {
	return (
		<Router>
			<Route path='/' exact component={App} {...props} />;
			<Route path='/:code' component={App} {...props} />;
		</Router>
	);
};

export default Wrapper;
