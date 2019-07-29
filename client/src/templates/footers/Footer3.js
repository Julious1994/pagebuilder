import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';

import Section from './../components/Section';

const FooterContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 25px 0px;
`;

const Copyright = styled(EditableDiv)`
	padding-top: 10px;
	color: #A2A5B5;
  outline: none;
`;

class Footer3 extends React.Component {
	render() {
		const { settings, onChange, editable } = this.props;
		return (
			<Section>
				<FooterContainer>
					<Copyright
						html={settings.copyright}
						disabled={!editable}
						onChange={(e) => onChange('copyright', e.target.value)}
					/>
				</FooterContainer>
			</Section>
		)
	}
}

Footer3.defaultSettings = {
	backgroundColor: undefined,
	color: 'initial',
	copyright: '© 2019 GitHub, Inc. All rights reserved.',
}

Footer3.settings = {
  backgroundColor: 'color',
  color: 'color',
}

export default Footer3;
