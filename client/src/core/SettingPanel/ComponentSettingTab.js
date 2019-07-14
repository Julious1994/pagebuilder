import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faSortUp, faCog, faSortDown } from '@fortawesome/free-solid-svg-icons';

import { closeComponentSetting } from './../../store/actions';

const TabWrapper = styled.div`
	position: absolute;
	right: 10px;
	border-radius: 40px;
	top: 10px;
	background-color: #1F1F1F;
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
		const { closeComponentSetting, openSetting, moveUp, moveDown } = this.props;
		return(
			<TabWrapper>
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

const mapStateToDispatch = dispatch => ({
	closeComponentSetting: () => dispatch(closeComponentSetting()),
});

export default connect(null, mapStateToDispatch)(ComponentSettingTab);
