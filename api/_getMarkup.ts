import getTemplate from './_getTemplate.js';
import { marked } from 'marked';
import path from 'path';
import fs from 'fs';

export default (posts, tags, req) => {
    const pagePath = path.join(process.cwd(), 'public', 'blog-template.html');
    const page = fs.readFileSync(pagePath, 'utf8');
    let markup = '';
    let blogPostTitle;

    // detail page
    if (req.query.slug && req.query.slug.length > 0) {
        posts.map((item) => {
            item.content = marked.parse(item.content);
        });
        const compiledTemplate = getTemplate('detail.hbs');
        markup = compiledTemplate(posts[0]);
        blogPostTitle = posts[0].title;
    // listing page
    } else {
        posts.map((item) => {
            const markdown = item.summary ? item.summary : item.content;
            item.content =  marked.parse(markdown);
        });
        const compiledTemplate = getTemplate('listing.hbs');
        markup = compiledTemplate({posts, tags});
    }

    const titleRegex = /<title>.*<\/title>/i;
    const mainRegex = /<div class="flex"><\/div>/i;
    const blogPageWithUpdatedTitle = blogPostTitle ? page.replace(titleRegex, `<title>${blogPostTitle}</title>`) : page;
    const blogPage = blogPageWithUpdatedTitle.replace(mainRegex, `<div class="flex">${markup}</div>`);
    return blogPage;
}
