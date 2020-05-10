import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { connect } from 'react-redux';

import Editor from "./editor";
import Toolbar from "./Toolbar";

import { getPageContent } from './../store/selector';
import { setComponent } from './../store/actions';

class Builder extends Component {

	handleDrop = (component) => {
		const { setComponent } = this.props;
		setComponent(component);
	}

	render() {
		// const { site } = this.state;
		const { siteHeader, siteFooter, pageContent } = this.props;
		return(
			<DndProvider backend={HTML5Backend}>
				<div style={{height: '100%', display: 'flex'}}>
					<div style={{ width: '75%', flex: '1' }}>
						<Editor onDrop={this.handleDrop} header={siteHeader} footer={siteFooter} content={pageContent} />
					</div>
					<div style={{ maxWidth: '20%', borderLeft: '1px solid black', height: '100%' }}>
						<Toolbar history={this.props.history} />
					</div>
				</div>
			</DndProvider>
		)
	}
}

const mapStateToProps = (state) => {
	const { sites } = state;
	const { site } = sites;
	return {
		siteHeader: site.header,
		siteFooter: site.footer,
		pageContent: getPageContent(site.pages, sites.currentPageIndex),
	}
};

const mapDispatchToProps = dispatch => ({
	setComponent: (component) => dispatch(setComponent(component)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Builder);
