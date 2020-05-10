import React, { Component } from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';
import Image from './../../components/Image';
import Section from '../components/Section';
import EditableArea from './../components/EditableDiv';
import {getImage} from './../../common.func';

const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${props => props.backgroundColor ? 'background-color:' + props.backgroundColor : ''}
  ${props => props.color ? 'color:' + props.color : ''}
`;

const TeamTitle = styled(EditableDiv)`
	text-align: center;
	outline: none;
`;

const TeamList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0px auto;
  justify-content: ${props => props.variant === 'avatar' ? 'flex-start' : 'center'};
`;
  // justify-content: flex-start;

const TeamImageWrapper = styled.div`
  width: ${props => props.variant === 'avatar' ? '75px' : '150px'};
  height: ${props => props.variant === 'avatar' ? '75px' : '150px'};
`;

const TeamItem = styled.div`
  width: ${props => props.variant === 'avatar' ? '300px' : '250px'};
  text-align: center;
  padding: 20px ${props => props.variant === 'avatar' ? '20px' : '50px'};
  ${props => props.variant === 'avatar' ? 'display: flex;' : ''}
`;

const TeamMemberTitle = styled(EditableArea)`
  font-weight: bolder;
  line-height: 2.5;
  outline: none;
`;

const TeamInfo = styled.div`
  ${props => props.variant  === 'avatar'
    ? `
        text-align: left;
        padding-left: 15px;
      `
    : ''
  }
`;

const TeamMemberDescription = styled(EditableArea)`
	outline: none;
`;

class Team extends Component {

	handleTeamChange = (team, i) => {
		const { onChange, settings } = this.props;
		const { teamList } = settings;
		teamList[i] = {...team};
		onChange('teamList', teamList);
	}

  render() {
    const { settings, onChange, editable, onEdit } = this.props;
		const { teamList = [], thumbnailRadius, variant } = settings;
    return(
			<Section
				center={settings.centerSection}
				backgroundColor={settings.sectionBackground}
			>
				<TeamWrapper
					backgroundColor={settings.backgroundColor}
					color={settings.color}
					onClick={() => onEdit && onEdit()}
					id="team"
				>
					<h1>
						<TeamTitle
							html={settings.teamTitle}
							disabled={!editable}
							onChange={(e) => {
								onChange && onChange('teamTitle', e.target.value)
							}}
						/>
					</h1>
					<TeamList variant={variant}>
						{
							teamList.map((team, i) => (
								<TeamItem key={i} variant={variant}>
									<TeamImageWrapper variant={variant}>
										<Image
											thumbnailRadius={thumbnailRadius}
											src={getImage(team.image)}
											alt="team1"
											variant={variant}
											editable={editable}
											onChange={(img) => {
												team.image = img;
												this.handleTeamChange(team, i);
											}}
										/>
									</TeamImageWrapper>
									{
										variant === 'avatar'
										?
											<TeamInfo variant={variant}>
												<TeamMemberTitle
													html={team.title}
													disabled={!editable}
													onChange={(e) => {
														team.title = e;
														this.handleTeamChange(team, i);
													}}
												/>
												<TeamMemberDescription
													html={team.description}
													disabled={!editable}
													onChange={(e) => {
														team.description = e;
														this.handleTeamChange(team, i);
													}}
												/>
											</TeamInfo>
										:
											<React.Fragment>
												<TeamMemberTitle
													html={team.title}
													disabled={!editable}
													onChange={(e) => {
														team.title = e;
														this.handleTeamChange(team, i);
													}}
												/>
												<TeamMemberDescription
													html={team.description}
													disabled={!editable}
													onChange={(e) => {
														console.log(e);
														team.description = e;
														this.handleTeamChange(team, i);
													}}
												/>
											</React.Fragment>
									}
								</TeamItem>
							))
						}
					</TeamList>
				</TeamWrapper>
			</Section>
    )
  }
}

Team.defaultProps = {
  settings: {
    teamList: [],
    style: 'team'
  },
}

Team.defaultSettings = {
	teamList: [
		{ title: '<p style="text-align:center;"><strong>Sara Doe</strong></p>', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: '<p style="text-align:center;"><strong>Sara Doe</strong></p>', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: '<p style="text-align:center;"><strong>Sara Doe</strong></p>', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: '<p style="text-align:center;"><strong>Sara Doe</strong></p>', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: '<p style="text-align:center;"><strong>Sara Doe</strong></p>', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: '<p style="text-align:center;"><strong>Sara Doe</strong></p>', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: '<p style="text-align:center;"><strong>Sara Doe</strong></p>', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: '<p style="text-align:center;"><strong>Sara Doe</strong></p>', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
	],
	color: '',
	backgroundColor: '',
	variant: 'team',
	thumbnailRadius: '50%',
	teamTitle: 'Meet Our Team',
	centerSection: false,
	sectionBackground: 'transparent',
}

Team.settings = {
  backgroundColor: 'color',
  teamList: 'increment',
	color: 'color',
	centerSection: 'boolean',
	sectionBackground: 'color',
}

export default Team;
