import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import Field from './Field';
import Input from './../../components/PropertyInput';
import ColorPicker from './../../components/ColorPicker';
import { changeLogo, onSettingChange } from './../../store/actions';
import templateMapper from './../templateMapper';
import { level } from './../../constant';
import { getBlock } from './../../store/selector';

const PanelWrapper = styled.div`
	padding: 5px;
	background-color: #5A6678;
	height: calc(100% - 10px);
	overflow: hidden;
`;

const PanelTitle = styled.h3`
	color: white;
	border-bottom: 2px solid #949CA9;
	margin: 10px 0px;
`;

const PanelContent = styled.div`
	height: calc(100% - 45px);
	overflow: auto;
`;

class SettingPanel extends Component {

	getMappings(setting) {
		if(setting.level === level.COMPONENT) {
			const { type, id } = setting;
			const mapperList = templateMapper[`${type}s`];
			console.log(mapperList, templateMapper, setting);
			const mappedBlock = mapperList[id];
			if(!mappedBlock) {
				return {}
			}
			const Component = mapperList[id].component;
			console.log('ss', Component);
			return Component.settings;
		}
		return {}
	}

	handleChange = (key, value) => {
		console.log(key, value);
		const { onSettingChange, block, selectedSetting } = this.props;
		const { level, templateIndex, type} = selectedSetting;
		// settings[key] = value;
		const newBlock = {...block};
		newBlock.state[key] = value;
		onSettingChange(newBlock, level, templateIndex, type);
	}

	render() {
		const { title = "Settings", selectedSetting, block } = this.props;
		const mappings = this.getMappings(selectedSetting);
		const settingValues = block.state;
		console.log('values', settingValues)

		return (
			<PanelWrapper>
				<PanelTitle>{title}</PanelTitle>
				<PanelContent>
					{
						Object.keys(mappings).map((key, i) => (
							<Field
								key={i}
								name={key}
								type={mappings[key]}
								value={settingValues[key]}
								onChange={(value) => this.handleChange(key, value)}
							/>
						))
					}
				</PanelContent>
			</PanelWrapper>
		);
	}
}

const mapStateToProps = (state) => ({
	selectedSetting: state.setting,
	block: getBlock(
		state.setting.templateIndex,
		state.setting.level,
		state.sites.site,
		state.sites.currentPageIndex,
		state.setting.type,
	),
});

const mapDispatchToProps = (dispatch) => ({
	changeLogo: (logo) => dispatch(changeLogo(logo)),
	onSettingChange: (block, level, index, type, key, value) => dispatch(onSettingChange(block, level, index, type, key, value))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(SettingPanel);
