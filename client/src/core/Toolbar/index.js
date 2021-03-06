import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tools from './Tools';
import InfoDialog from './InfoDialog';
import SettingPanel from '../SettingPanel';
import { getPageList } from './../../store/selector';

import {
	openSetting,
	hideSetting,
	closeSaveDialog,
	saveSite,
	openPageSetting,
	createPage,
	openPage,
	viewPage,
	togglePallete,
} from './../../store/actions';
import Pallate from '../Pallate';
import SaveDialog from './SaveDialog';
import NewDialog from './NewDialog';
import OpenDialog from './OpenDialog';
import { level } from './../../constant';

class Toolbar extends Component {

	constructor(props) {
		super(props);
		this.state={
			infoPopup: false,
			newDialog: false,
			isArticle: false,
			openDialog: false,
		};
	}

	toggleInfoDialogClose = () => {
		this.setState({ infoPopup: !this.state.infoPopup });
	}

	toggleNewDialog = (isArticle = false) => {
		this.setState({ newDialog: !this.state.newDialog, isArticle });
	}

	toggleOpenDialog = () => {
		this.setState({ openDialog: !this.state.openDialog });
	}

	handleView = () => {
		const { history } = this.props;
		this.props.viewPage();
		history.push('/view');
	}

	togglePallete= () => {
		this.props.togglePallete();
	}

	render() {
		const { openSetting, saveDialog, currentPageIndex, createPage, showPallete } = this.props;
		return(
			<div style={{height: '100%', display: 'flex'}}>
				{
					showPallete &&
					<div style={{ width: '75%', overflow: 'auto', minWidth: 225 }}>
						{
							openSetting ?
								<SettingPanel />
							:
								<Pallate />
						}
					</div>
				}
				<div style={{ width: 75, borderLeft: '1px solid black', height: '100%' }}>
					<Tools
						onClick={this.handleToolClick}
						infoToolClick={this.toggleInfoDialogClose}
						addComponent={this.props.hideSetting}
						onPageSettingClick={() => this.props.pageSettingClick(currentPageIndex)}
						onGlobalSetting={this.props.onGlobalSetting}
						savePage={() => this.props.saveSite(this.props.site)}
						openNewDialog={this.toggleNewDialog}
						newPage={() => this.toggleNewDialog()}
						newArticle={() => this.toggleNewDialog(true)}
						openPage={this.toggleOpenDialog}
						togglePallete={this.togglePallete}
					/>
					<InfoDialog
						isOpen={this.state.infoPopup}
						onClose={this.toggleInfoDialogClose}
					/>
					<SaveDialog
						isOpen={saveDialog}
						onClose={this.props.closeSaveDialog}
						onView={this.handleView}
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
					<OpenDialog
						isOpen={this.state.openDialog}
						pageList={this.props.pageList}
						openPage={(pageIndex) => {
							this.props.openPage(pageIndex);
							this.toggleOpenDialog();
						}}
						onClose={() => this.toggleOpenDialog()}
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
		site: state.sites.site,
		pageList: getPageList(state.sites.site),
		showPallete: state.setting.showPallete,
	}
}

const mapDispatchToProps = (dispatch) => ({
	pageSettingClick: (pageIndex) => dispatch(openPageSetting(level.PAGE, pageIndex)),
	onGlobalSetting: () => dispatch(openSetting(level.GLOBAL)),
	hideSetting: () => dispatch(hideSetting()),
	closeSaveDialog: () => dispatch(closeSaveDialog()),
	saveSite: (site) => dispatch(saveSite(site)),
	createPage: (props) => dispatch(createPage(props)),
	openPage: (pageIndex) => dispatch(openPage(pageIndex)),
	viewPage: () => dispatch(viewPage()),
	togglePallete: () => dispatch(togglePallete())
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
