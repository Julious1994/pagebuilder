import Header from './../templates/header/Header';
import Header2 from './../templates/header/Header2';
import Header3 from './../templates/header/Header3';

import Team from './../templates/content/Team';
import Subscribe from './../templates/content/forms/Subscribe';
import Pricing1 from './../templates/content/pricing/Pricing1';
import ContactForm from './../templates/content/forms/Contact';
import Content1 from './../templates/content/contents/content1';
import Content2 from './../templates/content/contents/content2';

import Footer1 from './../templates/footers/Footer';
import Footer2 from './../templates/footers/Footer2';
import Footer3 from './../templates/footers/Footer3';

export const headers = {
	1: { component: Header, thumbnail: 'header.png', title: 'Header 1', type: 'header'},
	2: { component: Header2, thumbnail: 'header2.png', title: 'Header 2', type: 'header'},
	3: { component: Header3, thumbnail: 'header3.png', title: 'Header 3', type: 'header'},
}

export const footers = {
	1: { component: Footer1, thumbnail: 'footer-center.png', title: 'Footer 1', type: 'footer'},
	2: { component: Footer2, thumbnail: 'footer-black.png', title: 'Footer 2', type: 'footer'},
	3: { component: Footer3, thumbnail: 'footer.jpg', title: 'Footer 3', type: 'footer'},
}

export const contents = {
	1: { component: Team, thumbnail: 'team.jpg', title: 'Team 1', type: 'content'},
	2: { component: Team, thumbnail: 'team.jpg', title: 'Team 1', type: 'content', defaultProps: { variant: 'avatar'}},
	3: { component: Team, thumbnail: 'team.jpg', title: 'Team 1', type: 'content', defaultProps: { variant: 'avatar', thumbnailRadius: '1%'}},
	4: { component: Subscribe, thumbnail: 'subscribe.jpg', title: 'Subscribe 1', type: 'content'},
	5: { component: Pricing1, thumbnail: 'pricing.jpg', title: 'Pricing 1', type: 'content'},
	6: { component: ContactForm, thumbnail: 'contact.jpg', title: 'Contact 1', type: 'content'},
	7: { component: Team, thumbnail: 'team-square.png', title: 'Team 4', type: 'content', defaultProps: { thumbnailRadius: '5%'}},
	8: { component: Content1, thumbnail: 'content1.png', title: 'Content 1', type: 'content'},
	9: { component: Content2, thumbnail: 'content2.png', title: 'Content 2', type: 'content'}
}

export default {
	headers,
	footers,
	contents,
};
