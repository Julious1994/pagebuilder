import React, { Component } from "react";
import EditableArea from "../../components/EditableDiv";
import Section from '../../components/Section';

function Contents02(props) {
	const { settings, onChange, editable, onEdit } = props;

	return (
		<Section
			className="fdb-block"
			center={settings.centerSection}
			backgroundColor={settings.sectionBackground}
			color={settings.color}
		>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col col-md-8 text-center">
						<div className="lead">
							<EditableArea
								html={settings.description}
								disabled={!editable}
								toolbarStyle={{ right: "unset", width: "unset", top: "-5em" }}
								onChange={(e) => onChange("description", e)}
							/>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}
Contents02.defaultSettings = {
	description: `<p style="text-align:center;">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in <a href="https://www.froala.com">Bookmarksgrove</a> right at the coast of the Semantics, a large language ocean.</p>`,
	image: "team1.jpeg",
	color: "#000",
	backgroundColor: "",
	centerSection: false,
	sectionBackground: "transparent",
};

Contents02.settings = {
	color: "color",
	centerSection: "boolean",
	sectionBackground: "color",
};
export default Contents02;
