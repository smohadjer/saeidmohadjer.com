import { marked } from 'marked';
import getTags from './_getTags.js';
import getTemplate from './_getTemplate.js';
import setQuery from './_setQuery.js';
import path from 'path';
import fs from 'fs';

export default async (req, collection) => {
    const slug = req.query.slug;
    const tag = req.query.tag;
    const permission = req.query.permission;
    const query = setQuery(slug, tag, permission);
    const data = await collection.find(query).sort({'date': -1}).toArray();

    if (req.query.response === 'json') {
        return data;
    }

    const pagePath = path.join(process.cwd(), 'public', 'blog-template.html');
    const page = fs.readFileSync(pagePath, 'utf8');
    let markup = '';
    let blogPostTitle;


    // detail page
    if (slug && slug.length > 0) {
        data.map((item) => {
            item.content = marked.parse(item.content);
        });

        const compiledTemplate = getTemplate('detail.hbs');
        markup = compiledTemplate(data[0]);
        blogPostTitle = data[0].title;
    // listing page
    } else {
        data.map((item) => {
            const markdown = item.summary ? item.summary : item.content;
            item.content =  marked.parse(markdown);
        });

        const compiledTemplate = getTemplate('listing.hbs');
        markup = compiledTemplate({
            posts: data,
            tags: await getTags(collection)
        });
    }

    const titleRegex = /<title>.*<\/title>/i;
    const mainRegex = /<div class="flex"><\/div>/i;
    const blogPageWithUpdatedTitle = blogPostTitle ? page.replace(titleRegex, `<title>${blogPostTitle}</title>`) : page;
    const blogPage = blogPageWithUpdatedTitle.replace(mainRegex, `<div class="flex">${markup}</div>`);

    return blogPage;
}
