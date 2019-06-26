import React, { Component } from 'react';

import Editor from "./editor";
import Toolbar from "./Toolbar";

class Builder extends Component {
	render() {
		return(
			<div style={{height: '100%', display: 'flex'}}>
				<div style={{ width: '75%' }}>
					<Editor />
				</div>
				<div style={{ width: '25%', borderLeft: '1px solid black', height: '100%' }}>
					<Toolbar />
				</div>
			</div>
		)
	}
}

export default Builder;
