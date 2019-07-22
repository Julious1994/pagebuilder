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

class Footer2 extends React.Component {
	render() {
		return (
			<Section>
				<FooterContainer>
					<Copyright
						html={"© 2019 GitHub, Inc. All rights reserved."}
					/>
				</FooterContainer>
			</Section>
		)
	}
}

Footer2.defaultSettings = {

}

export default Footer2;
