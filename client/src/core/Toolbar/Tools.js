import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faCircle, faCog, faQuestionCircle, faPaintBrush } from '@fortawesome/free-solid-svg-icons'

const ToolWrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #373F4D;
	text-align: center;
	height: calc(100% - 40px);
	justify-content: space-between;
	padding: 20px 0px;
`;

const ToolPart = styled.div`
	display: flex;
	flex-direction: column;
`;

const FAIcon = styled(FontAwesomeIcon)`
	color: white;
	align-self: center;
	height: 3em;
	width: 2em !important;
	cursor: pointer;
`;

class Tools extends Component {
	render() {
		const { infoToolClick, onGlobalSetting } = this.props;
		return(
			<ToolWrapper>
				<ToolPart>
					<FAIcon icon={faFile} />
					<FAIcon icon={faFile} onClick={() => this.props.addComponent()} />
				</ToolPart>
				<ToolPart>
					<FAIcon icon={faPaintBrush} onClick={() => onGlobalSetting && onGlobalSetting()}/>
					{/* <FAIcon icon={faFile} onClick={() => this.props.addComponent()} /> */}
				</ToolPart>
				<ToolPart>
					<FAIcon icon={faCog} onClick={() => this.props.onPageSettingClick()} />
					<FAIcon icon={faQuestionCircle} onClick={infoToolClick} />
				</ToolPart>
			</ToolWrapper>
		)
	}
}

export default Tools;
