import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faSortUp, faCog, faSortDown } from '@fortawesome/free-solid-svg-icons';


const TabWrapper = styled.div`
	position: absolute;
	right: 10px;
	border-radius: 40px;
	top: ${props => props.top};
	background-color: #1F1F1F;
	z-index: 2;
	opacity: 0.8;
`;

const MenuIcon = styled(FontAwesomeIcon)`
	padding: 15px 25px;
	width: 25px;
	height: 25px;
	cursor: pointer;
	color: ${props => props.color || '#fff'};
`;

class ComponentSettingTab extends React.Component {
	render() {
		const { type, closeComponentSetting, openSetting, moveUp, moveDown } = this.props;
		let top = type === 'header' ? '101%' :'10px';
		top = type === 'footer' ? '-60px' : top;
		return(
			<TabWrapper top={top}>
				<MenuIcon
					icon={faSortUp}
					onClick={(e) => {
						e.stopPropagation();
						moveUp();
					}}
				/>
				<MenuIcon
					icon={faSortDown}
					onClick={(e) => {
						e.stopPropagation();
						moveDown();
					}}
				/>
				<MenuIcon
					icon={faCog}
					onClick={(e) => {
						e.stopPropagation();
						openSetting();
					}}
				/>
				<MenuIcon
					icon={faTimesCircle}
					color="red"
					onClick={(e) => {
						e.stopPropagation();
						closeComponentSetting();
					}}
				/>
			</TabWrapper>
		)
	}
}

export default ComponentSettingTab;
