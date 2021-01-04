import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";

interface Props {}

const Wrapper = (props: Props) => {
	return (
		<div className='root'>
			<Router>
				<Switch>
					<Route path='/' exact component={App} {...props} />
					<Route path='/:code' component={App} {...props} />
				</Switch>
			</Router>
		</div>
	);
};

export default Wrapper;
