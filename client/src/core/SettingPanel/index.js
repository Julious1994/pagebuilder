import React, { Component } from 'react';
import styled from 'styled-components';

import Field from './Field';
import Input from './../../components/PropertyInput';

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
	render() {
		const { title = "Settings" } = this.props;
		return (
			<PanelWrapper>
				<PanelTitle>{title}</PanelTitle>
				<PanelContent>
					<Field title="Background Image">
						<Input type="text" />
					</Field>
				</PanelContent>
			</PanelWrapper>
		);
	}
}

export default SettingPanel;
