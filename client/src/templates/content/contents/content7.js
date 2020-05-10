import React, { Component } from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';
import EditableArea from '../../components/EditableDiv';
import Section from '../../components/Section';

const Title = styled(EditableDiv)`
	outline: none;
`;

function Contents07(props) {
	const { settings, onChange, editable, onEdit } = props;
		return <Section
		className="fdb-block"
		center={settings.centerSection}
		backgroundColor={settings.sectionBackground}
		color={settings.color}
	>
  <div className="container">
    <div className="row">
      <div className="col text-center">
        <h1>
					<Title
						html={settings.title}
						disabled={!editable}
						onChange={(e) => onChange('title', e.target.value)}
					/>
				</h1>

        <div className="row text-left pt-4">
          <div className="col-12 col-md-6">
            <p className="lead">
							<EditableArea
								html={settings.description1}
								disabled={!editable}
								toolbarStyle={{right: 'unset', width: 'unset', top: '-8em'}}
								onChange={(e) => onChange('description1', e)}
							/>
						</p>
          </div>
          <div className="col-12 col-md-6">
            <p className="lead">
							<EditableArea
								html={settings.description2}
								disabled={!editable}
								toolbarStyle={{right: 'unset', width: 'unset', top: '-8em'}}
								onChange={(e) => onChange('description2', e)}
							/>
						</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</Section>

}

Contents07.defaultSettings = {
	title: 'Contacts with Form',
	description1: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum The first line of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum The first line of Lorem Ipsum.',
	description2: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum The first line of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum The first line of Lorem Ipsum.',
	image: 'team1.jpeg',
	color: '#000',
	backgroundColor: '',
	centerSection: false,
	sectionBackground: 'transparent',
}

Contents07.settings = {
	backgroundColor: 'color',
	color: 'color',
	centerSection: 'boolean',
	sectionBackground: 'color',
}

export default Contents07
