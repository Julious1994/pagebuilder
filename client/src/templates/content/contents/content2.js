import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';

import Section from '../../components/Section';
import EditableArea from '../../components/EditableDiv';

const ContentWrapper = styled.div`
	margin: 50px 0px;
`;
const Description = styled.div`
	margin: 0px 10%;
	text-align: center;
	color: #545454;
	font-size: 18px;
`;
const Header = styled.h1`
	text-align: center;
`;
const Title = styled(EditableArea)`
	outline: none;
`;

function Content2(props) {
	const { settings, onChange, editable, onEdit } = props;
	return(
		<section class="fdb-block">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-7 col-xl-5 text-center">
        <div class="fdb-box">
          <div class="row">
            <div class="col">
              <h1>Log In</h1>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <input type="text" class="form-control" placeholder="Email" />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <input type="password" class="form-control mb-1" placeholder="Password" />
              <p class="text-right"><a href="https://www.froala.com">Recover Password</a></p>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <button class="btn btn-outline-secondary" type="button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
		// <Section
		// 	center={settings.centerSection}
		// 	backgroundColor={settings.sectionBackground}
		// >
		// 	<ContentWrapper>
		// 			<Header>
		// 					<Title
		// 						toolbarStyle={{
		// 							right: 'unset',
		// 							width: '100%',
		// 							top: '-6em',
		// 						}}
		// 						html={settings.title}
		// 						disabled={!editable}
		// 						onChange={(e) => {
		// 							console.log('e', e);
		// 							onChange('title', e)}}
		// 					/>
		// 			</Header>
		// 			<Description>
		// 				<EditableArea
		// 					html={settings.description}
		// 					disabled={!editable}
		// 					toolbarStyle={{
		// 						right: 'unset',
		// 						width: '100%',
		// 						top: '-6em',
		// 					}}
		// 					onChange={(e) => onChange('description', e)}
		// 				/>
		// 			</Description>
		// 	</ContentWrapper>
		// </Section>
	);
}

Content2.defaultSettings = {
	title: '<p style="text-align:center;">Contacts with Form</p>',
	description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum The first line of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum The first line of Lorem Ipsum.',
	color: '',
	backgroundColor: '',
	centerSection: false,
	sectionBackground: 'transparent',
}

Content2.settings = {
	backgroundColor: 'color',
	color: 'color',
	centerSection: 'boolean',
	sectionBackground: 'color',
}

export default Content2;
