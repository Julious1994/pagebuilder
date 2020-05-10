import React from "react";
import styled from "styled-components";
import EditableDiv from "react-contenteditable";

import Section from "../../components/Section";
import EditableArea from "../../components/EditableDiv";


function Content2(props) {
	const { settings, onChange, editable, onEdit } = props;
	return (
		<Section
			center={settings.centerSection}
			backgroundColor={settings.sectionBackground}
			className="fdb-block"
		>
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-12 col-md-8 col-lg-7 col-xl-5 text-center">
						<div class="fdb-box">
							<div class="row">
								<div class="col">
									<h1>
										<EditableArea
											html={settings.title}
											disabled={!editable}
											toolbarStyle={{
												right: "unset",
												width: "100%",
												top: "-6em",
											}}
											onChange={(e) => onChange("title", e)}
										/>
									</h1>
								</div>
							</div>
							<div class="row mt-4">
								<div class="col">
									<input type="text" class="form-control" placeholder="Email" />
								</div>
							</div>
							<div class="row mt-4">
								<div class="col">
									<input
										type="password"
										class="form-control mb-1"
										placeholder="Password"
									/>
									<p class="text-right">
										<a href="https://www.froala.com">Recover Password</a>
									</p>
								</div>
							</div>
							<div class="row mt-4">
								<div class="col">
									<button class="btn btn-outline-secondary" type="button">
										<EditableDiv
											html={settings.buttonTitle}
											disabled={!editable}
											onChange={(e) => onChange('buttonTitle', e.target.value)}
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}

Content2.defaultSettings = {
	title: '<p style="text-align:center;">Log In</p>',
	buttonTitle: 'Click',
	color: "",
	backgroundColor: "",
	centerSection: false,
	sectionBackground: "transparent",
};

Content2.settings = {
	backgroundColor: "color",
	color: "color",
	centerSection: "boolean",
	sectionBackground: "color",
};

export default Content2;
