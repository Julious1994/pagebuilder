import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tools from './Tools';
import Accordian, { AccordianItem } from './../../components/Accordian';
import InfoDialog from './InfoDialog';
import SettingPanel from '../SettingPanel';

import {
	openSetting,
	hideSetting,
	closeSaveDialog,
	saveSite,
	openPageSetting,
	createPage,
} from './../../store/actions';
import Pallate from '../Pallate';
import SaveDialog from './SaveDialog';
import NewDialog from './NewDialog';
import { level } from './../../constant';

class Toolbar extends Component {

	constructor(props) {
		super(props);
		this.state={
			infoPopup: false,
			newDialog: false,
			isArticle: false,
		};
	}

	toggleInfoDialogClose = () => {
		this.setState({ infoPopup: !this.state.infoPopup });
	}

	toggleNewDialog = (isArticle = false) => {
		this.setState({ newDialog: !this.state.newDialog, isArticle });
	}

	render() {
		const { openSetting, saveDialog, currentPageIndex, createPage } = this.props;
		return(
			<div style={{height: '100%', display: 'flex'}}>
				<div style={{ width: '75%', overflow: 'auto' }}>
					{
						openSetting ?
							<SettingPanel />
						:
							<Pallate />
					}
				</div>
				<div style={{ width: '25%', borderLeft: '1px solid black', height: '100%' }}>
					<Tools
						onClick={this.handleToolClick}
						infoToolClick={this.toggleInfoDialogClose}
						addComponent={this.props.hideSetting}
						onPageSettingClick={() => this.props.pageSettingClick(currentPageIndex)}
						onGlobalSetting={this.props.onGlobalSetting}
						savePage={this.props.saveSite}
						openNewDialog={this.toggleNewDialog}
						newPage={() => this.toggleNewDialog()}
						newArticle={() => this.toggleNewDialog(true)}
					/>
					<InfoDialog
						isOpen={this.state.infoPopup}
						onClose={this.toggleInfoDialogClose}
					/>
					<SaveDialog
						isOpen={saveDialog}
						onClose={this.props.closeSaveDialog}
					/>
					<NewDialog
						isOpen={this.state.newDialog}
						onClose={() => this.toggleNewDialog()}
						isArticle={this.state.isArticle}
						onCreate={(props) => {
							createPage(props);
							this.toggleNewDialog();
						}}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		openSetting: state.setting.open,
		saveDialog: state.sites.saveDialog,
		currentPageIndex: state.sites.currentPageIndex,
	}
}

const mapDispatchToProps = (dispatch) => ({
	pageSettingClick: (pageIndex) => dispatch(openPageSetting(level.PAGE, pageIndex)),
	onGlobalSetting: () => dispatch(openSetting(level.GLOBAL)),
	hideSetting: () => dispatch(hideSetting()),
	closeSaveDialog: () => dispatch(closeSaveDialog()),
	saveSite: () => dispatch(saveSite()),
	createPage: (props) => dispatch(createPage(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
