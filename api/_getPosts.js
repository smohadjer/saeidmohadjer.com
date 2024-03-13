import { marked } from 'marked';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';

function getTemplate(filename) {
    const pathHbs = path.join(process.cwd(), 'templates', filename);
    const template = fs.readFileSync(pathHbs, 'utf8');
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate;
}

export default async (req, collection) => {
    const slug = req.query.slug;
    const tag = req.query.tag;
    const permission = req.query.permission;
    const query = {};

    if (slug) {
        query.slug = slug;
    } else if (tag) {
        query.tags = tag;
        if (!permission) {
            query.permission = { $ne: 'private' }
        }
    } else if (!permission) {
        /* if no permission parameter is sent with request we only show
        posts that are not marked as private */
        query.permission = { $ne: 'private' }
    }

    const data = await collection.find(query).sort({'date': -1}).toArray();

    const getAllTags = async() => {
        const docs = await collection.find({ permission: { $ne: 'private' }}).toArray();
        console.log(docs.length);
        const allTags = [];
        docs.forEach(item => {
            if (item.tags) {
                item.tags.forEach(tag => {
                    if (!allTags.includes(tag)) {
                        allTags.push(tag);
                    }
                })
            }
        });
        return allTags;
    }

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
            tags: await getAllTags()
        });
    }

    const titleRegex = /<title>.*<\/title>/i;
    const mainRegex = /<div class="flex"><\/div>/i;
    const blogPageWithUpdatedTitle = blogPostTitle ? page.replace(titleRegex, `<title>${blogPostTitle}</title>`) : page;
    const blogPage = blogPageWithUpdatedTitle.replace(mainRegex, `<div class="flex">${markup}</div>`);

    return blogPage;
}
