import React, { Component } from "react";
import styled from "styled-components";
import EditableDiv from "react-contenteditable";
import EditableArea from "../../components/EditableDiv";
import Section from "../../components/Section";

function Contents04(props) {
	const { settings, onChange, editable, onEdit } = props;

	return (
		<section className="fdb-block">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col col-md-8 text-center">
						<h1>
							<EditableArea
								html={settings.title}
								disabled={!editable}
								toolbarStyle={{ right: "unset", width: "unset", top: "-8em" }}
								onChange={(e) => onChange("title", e)}
							/>
						</h1>
						<div className="lead">
							<EditableArea
								html={settings.description}
								disabled={!editable}
								toolbarStyle={{ right: "unset", width: "unset", top: "-8em" }}
								onChange={(e) => onChange("description", e)}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

Contents04.defaultSettings = {
	title: '<p style="text-align:center;">Html design blocks</p>',
	description:
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum The first line of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. <a href="https://www.google.com">Lorem Ipsum The first line</a> of Lorem Ipsum.',
	image: "team1.jpeg",
	color: "#000",
	backgroundColor: "",
	centerSection: false,
	sectionBackground: "transparent",
};

Contents04.settings = {
	backgroundColor: "color",
	color: "color",
	centerSection: "boolean",
	sectionBackground: "color",
};

export default Contents04;
