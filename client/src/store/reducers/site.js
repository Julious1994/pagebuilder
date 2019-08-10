import { produce } from 'immer';
import { headers, contents, footers } from '../../core/templateMapper';
import { level as levels } from './../../constant';
import { swapElement } from './../reducer.helper';
import { openComponentSetting } from './../actions';
import { articleProps } from './../properties';
import {
	CHANGE_TITLE,
	CHANGE_LOGO,
	SET_COMPONENT,
	CHANGE_SETTING,
	MOVE_DOWN,
	MOVE_UP,
	CLOSE_SAVE_DIALOG,
	SAVE_SITE,
	CREATE_PAGE,
	OPEN_PAGE
} from './../actionType';

const initialState = {
	site: {
		header: null,
		footer: null,
		isArticle: false,
		have_blog: 0,
		pages: [
			{
				title: 'About Us',
				name: 'About us',
				slug: 'about-us',
				path: '/about-us',
				meta: { key: '', description: '' },
				page_css: '',
				page_js: '',
				content: [],
				state: {},
			}
		],
		blog: {
			slug: '/blog',
			articles: [],
		}
	},
	currentPageIndex: 0,
	saveDialog: false,
	editable: true,
};

export default function(state = initialState, action) {
	const { payload } = action;
	switch(action.type) {
		case CHANGE_TITLE: {
			return produce(state, draft => {
				draft.title = payload.title;
			});
		}
		case CHANGE_LOGO: {
			return produce(state, draft => {
				draft.logo = payload.logo;
			});
		}
		case SET_COMPONENT: {
			const { component } = payload;
			const { type, defaultProps = {} } = component;
			if(type === 'content') {
				const { site, currentPageIndex } = state;
				const Component = contents[component.component] || {};
				const block = Component.component;
				return produce(state, draft => {
					const page = draft.site.pages[draft.currentPageIndex];
					const blockState = {...block.defaultSettings, ...defaultProps};
					page.content.push({ ...component, state: {...blockState}, style: {}});
					draft.site.pages[currentPageIndex] = page;
				});
			} else {
				const mapper = type === 'header' ? headers :footers;
				const Component = mapper[component.component] || {};
				const block = Component.component;
				return produce(state, draft => {
					const blockState = JSON.parse(JSON.stringify(block.defaultSettings));
					draft.site[type] = {
						...draft.site[type],
						...component,
						state: {
							...blockState,
						},
					};
				});
			}
		}
		case CHANGE_SETTING: {
			const { level, index, block, type } = payload;
			if(level === levels.COMPONENT) {
				const newState =
					produce(state, draft => {
						const page = draft.site.pages[draft.currentPageIndex];
						if(type === 'content') {
							page.content[index] = {...block};
						} else {
							draft.site[type] = {...block};
						}
						draft.site.pages[draft.currentPageIndex] = {...page};
					});
				return newState;
			} else if(level === levels.PAGE) {
				const newState = produce(state, draft => {
					const page = draft.site.pages[draft.currentPageIndex];
					page.state = block.state;
					draft.site.pages[draft.currentPageIndex] = {...page};
				});
				return newState;
			} else if (level === levels.GLOBAL) {
				const newState = produce(state, draft => {
					draft.site = {...block};
				});
				return newState;
			}
			return state;
		}
		case MOVE_UP: {
			const { index } = payload;
			if(index > 0) {
				const { site, currentPageIndex } = state;
				return produce(state, draft => {
					const page = draft.site.pages[draft.currentPageIndex];
					page.content = swapElement(page.content, index - 1, index);
					draft.site.pages[draft.currentPageIndex] = {...page};
				});
			}
			return state;
		}
		case MOVE_DOWN: {
			const { index } = payload;
			return produce(state, draft => {
				const page = draft.site.pages[draft.currentPageIndex];
				const contentLength = page.content.length;
				if(contentLength - 1 > index) {
					page.content = swapElement(page.content, index, index + 1);
					draft.site.pages[draft.currentPageIndex] = {...page};
				}
			});
			return state;
		}
		case SAVE_SITE: {
			return produce(state, draft => {
				draft.saveDialog = true;
			});
		}
		case CLOSE_SAVE_DIALOG: {
			return produce(state, draft => {
				draft.saveDialog = false;
			});
		}
		case CREATE_PAGE: {
			const { page } = payload;
			if(page.isArticle) {
				page.isArticle = undefined;
				return produce(state, draft => {
					draft.site.articles.push({
						...articleProps,
						...page,
					});
				});
			} else {
				return produce(state, draft => {
					page.isArticle = undefined;
					draft.site.pages.push({
						meta: { key: '', description: '' },
						page_css: '',
						page_js: '',
						content: [],
						state: {},
						title: '',
						...page,
					});
					const index = draft.site.pages.length - 1;
					draft.currentPageIndex = index;
				});
			}
			return state;
		}
		case OPEN_PAGE: {
			const { pageIndex } = payload;
			return produce(state, draft => {
				if(draft.currentPageIndex !== pageIndex) {
					draft.currentPageIndex = pageIndex;
				}
			});
		}
		default:
			return state;
	}
}
