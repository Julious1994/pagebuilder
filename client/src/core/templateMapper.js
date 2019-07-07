import Header from './../templates/header/Header';
import Team from './../templates/content/Team';

export const headers = {
	1: { component: Header, thumbnail: '', title: 'Header 1', type: 'header'},
}

export const footers = {
	1: { component: Header, thumbnail: '', title: 'Footer 1', type: 'footer'},
}

export const contents = {
	1: { component: Team, thumbnail: '', title: 'Team 1', type: 'content'},
}

export default {
	headers,
	footers,
	contents,
};
