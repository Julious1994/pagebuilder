import React, { Component } from 'react';
import EditableArea from '../../components/EditableDiv';
import Section from '../../components/Section';
import styled from 'styled-components';

const H1 = styled.h1`
	display: flex;
	justify-content: center;
`;

function Contents08(props) {
	const { settings, onChange, editable, onEdit } = props;

    return <section className="fdb-block">
  <div className="container">
    <div className="row">
      <div className="col text-center">
        <H1>
				<EditableArea
								html={settings.title}
								disabled={!editable}
								toolbarStyle={{right: 'unset', width: 'unset', top: '-8em'}}
								onChange={(e) => onChange('title', e)}
							/>
				</H1>
        <div className="lead">
							<EditableArea
								html={settings.description}
								disabled={!editable}
								toolbarStyle={{right: 'unset', width: 'unset', top: '-8em'}}
								onChange={(e) => {
									console.log(e);
									onChange('description', e)
								}}
							/>
				</div>
        <p className="lead">
          <a href="https://www.froala.com" className="mx-2">Learn More <i className="fas fa-angle-right"></i></a>
          <a href="https://www.froala.com" className="mx-2">Buy <i className="fas fa-angle-right"></i></a>
        </p>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-6">
        <img alt="image" className="img-fluid mt-5" src="./images/draws/hosting.svg" />
      </div>
    </div>
  </div>
</section>

}

Contents08.defaultSettings = {
	title: 'Contacts with Form',
	description: '<p style="text-align:center;">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>',
	image: 'team1.jpeg',
	color: '',
	backgroundColor: '',
	centerSection: false,
	sectionBackground: 'transparent',
}

Contents08.settings = {
	backgroundColor: 'color',
	color: 'color',
	centerSection: 'boolean',
	sectionBackground: 'color',
}

export default Contents08
