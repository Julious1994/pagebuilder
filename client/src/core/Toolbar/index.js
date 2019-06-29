import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tools from './Tools';
import Accordian, { AccordianItem } from './../../components/Accordian';
import InfoDialog from './InfoDialog';
import SettingPanel from '../SettingPanel';

import { openSetting, hideSetting } from './../../store/actions';

class Toolbar extends Component {

	constructor(props) {
		super(props);
		this.state={
			infoPopup: false,
		};
	}

	toggleInfoDialogClose = () => {
		this.setState({ infoPopup: !this.state.infoPopup });
	}

	render() {
		const { openSetting } = this.props;
		return(
			<div style={{height: '100%', display: 'flex'}}>
				<div style={{ width: '75%', overflow: 'auto' }}>
					{
						openSetting ?
							<SettingPanel />
						:
							<Accordian defaultActive={2}>
								<AccordianItem label="Header"></AccordianItem>
								<AccordianItem label="Footer"></AccordianItem>
								<AccordianItem label="Content">
									<div style={{ height: 100}}>Content1</div>
									<div style={{ height: 150}}>Content2</div>
									<div style={{ height: 150}}>Content3</div>
									<div style={{ height: 100}}>Content4</div>
									<div style={{ height: 150}}>Content5</div>
									<div style={{ height: 150}}>Content6</div>
									<div style={{ height: 100}}>Content7</div>
									<div style={{ height: 150}}>Content8</div>
									<div style={{ height: 150}}>Content9</div>
								</AccordianItem>
							</Accordian>
					}
				</div>
				<div style={{ width: '25%', borderLeft: '1px solid black', height: '100%' }}>
					<Tools
						onClick={this.handleToolClick}
						infoToolClick={this.toggleInfoDialogClose}
						addComponent={this.props.hideSetting}
						onPageSettingClick={this.props.pageSettingClick}
					/>
					<InfoDialog
						isOpen={this.state.infoPopup}
						onClose={this.toggleInfoDialogClose}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		openSetting: state.setting.open,
	}
}

const mapDispatchToProps = (dispatch) => ({
	pageSettingClick: () => dispatch(openSetting('page')),
	hideSetting: () => dispatch(hideSetting()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
