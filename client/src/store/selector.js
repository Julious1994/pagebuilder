import { level as levels } from './../constant';
import templateMapper from './../core/templateMapper';

export const getBlock = (id, level, site, pageId, type) => {
	const page = site.pages[pageId];
	if(level === levels.GLOBAL) {
		return site;
	}
	if(page) {
		if(level === levels.COMPONENT) {
			if(type === 'content') {
				const content = page.content || [];
				return content[id];
			} else {
				if(site[type]) {
					return site[type];
				}
			}
		} else if(level === levels.PAGE) {
			return page;
		}
	}
	return {};
}

export const getPageContent = (pages, pageIndex) => {
	const page = pages[pageIndex];
	return page.content;
}
