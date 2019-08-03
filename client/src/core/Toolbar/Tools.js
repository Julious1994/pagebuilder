import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faCircle, faCog, faQuestionCircle, faPaintBrush, faSave } from '@fortawesome/free-solid-svg-icons'
import Popover from 'react-tiny-popover';

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

const PopupWrapper = styled.div`
	background-color: white;
	border: 1px solid #AFAFAF;
	padding: 2px 10px;
	border-radius: 3px;
	position: relative;
`;

const PopoverRow = styled.div`
	font-weight: 500;
	padding: 5px 0px;
	cursor: pointer;
	${props => props.bottom !== false ? `border-bottom: 1px solid #AFAFAF` : ''}
`;

class Tools extends Component {
	state = {
		newPopover: false,
	}

	handleToggleNewPopover = (bool) => {
		this.setState({ newPopover: bool });
	}

	render() {
		const { infoToolClick, onGlobalSetting } = this.props;
		return(
			<ToolWrapper>
				<ToolPart>
					<Popover
						isOpen={this.state.newPopover}
						position={['bottom', 'left']}
						onClickOutside={() => this.handleToggleNewPopover(false)}
						content={(
							<PopupWrapper>
								<PopoverRow
									onClick={() => {
										this.handleToggleNewPopover(false);
										this.props.newPage()
									}}
								>
									New page
								</PopoverRow>
								<PopoverRow
									bottom={false}
									onClick={() => {
										this.handleToggleNewPopover(false);
										this.props.newArticle()
									}}
								>
									New article
								</PopoverRow>
							</PopupWrapper>
						)}
					>
						<FAIcon icon={faFile} onClick={() => this.handleToggleNewPopover(true)}/>
					</Popover>
					<FAIcon icon={faFile} onClick={() => this.props.addComponent()} />
				</ToolPart>
				<ToolPart>
					<FAIcon icon={faPaintBrush} onClick={() => onGlobalSetting && onGlobalSetting()}/>
					<FAIcon icon={faSave} onClick={() => this.props.savePage()} />
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
