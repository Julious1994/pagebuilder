import React, { Component } from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';
import { number } from 'prop-types';

const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${props => props.backgroundColor ? 'background-color:' + props.backgroundColor : ''}
  ${props => props.color ? 'color:' + props.color : ''}
`;

const TeamTitle = styled.h1`
  text-align: center;
`;

const TeamList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0px auto;
  justify-content: ${props => props.variant === 'avatar' ? 'flex-start' : 'center'};
`;
  // justify-content: flex-start;

const TeamItemImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${props => props.thumbnailRadius || '50%'};
`;

const TeamImageWrapper = styled.div`
  width: ${props => props.variant === 'avatar' ? '75px' : '150px'};
  height: ${props => props.variant === 'avatar' ? '75px' : '150px'};
`;

const TeamItem = styled.div`
  width: ${props => props.variant === 'avatar' ? '300px' : '150px'};
  text-align: center;
  padding: 20px ${props => props.variant === 'avatar' ? '20px' : '50px'};
  ${props => props.variant === 'avatar' ? 'display: flex;' : ''}
`;

const TeamMemberTitle = styled(EditableDiv)`
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

const TeamMemberDescription = styled.div``;

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
			<TeamWrapper
				backgroundColor={settings.backgroundColor}
				color={settings.color}
				onClick={() => onEdit && onEdit()}
			>
        <TeamTitle>Meet Our Team</TeamTitle>
        <TeamList variant={variant}>
          {
            teamList.map((team, i) => (
              <TeamItem key={i} variant={variant}>
                <TeamImageWrapper variant={variant}>
                  <TeamItemImage
                    thumbnailRadius={thumbnailRadius}
                    src={`./images/${team.image}`}
                    alt="team1"
                    variant={variant}
                  />
                </TeamImageWrapper>
                {
                  variant === 'avatar'
                  ?
                    <TeamInfo variant={variant}>
                      <TeamMemberTitle
                        html={team.title}
                        disabled={false}
                        onChange={(e) => {
                          team.title = e.target.value;
                          onChange(team, i);
                        }}
                      />
                      <TeamMemberDescription>{team.description}</TeamMemberDescription>
                    </TeamInfo>
                  :
                    <React.Fragment>
                      <TeamMemberTitle
                        html={team.title}
                        disabled={false}
                        onChange={(e) => {
                          team.title = e.target.value;
                          onChange && onChange(team, i);
                        }}
                      />
                      <TeamMemberDescription>{team.description}</TeamMemberDescription>
                    </React.Fragment>
                }
              </TeamItem>
            ))
          }
        </TeamList>
      </TeamWrapper>
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
		{ title: 'Sara Doe', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: 'Sara Doe', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: 'Sara Doe', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: 'Sara Doe', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: 'Sara Doe', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: 'Sara Doe', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: 'Sara Doe', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
		{ title: 'Sara Doe', description: 'Wild question marks but little blind', image: 'team1.jpeg'},
	],
	color: '',
	backgroundColor: '',
	variant: 'team',
	thumbnailRadius: '50%',
}

Team.settings = {
  backgroundColor: 'color',
  teamList: 'increment',
  color: 'color',
}

export default Team;
