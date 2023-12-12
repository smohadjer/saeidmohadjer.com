import { Octokit } from "@octokit/rest";
import { marked } from 'marked';

import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
  auth: process.env.Token
});

const getBlogPostSHA = async (pathToBlogPost) => {
  // If the blog post doesn't exist, request will return 404 error so we use a try/catch
  try {
    const { data } = await octokit.request(`GET /repos/{owner}/{repo}/contents/{path}`, {
      owner: 'smohadjer',
      repo: 'saeidmohadjer.com',
      path: pathToBlogPost
    });
    return data.sha;
  } catch(error) {
    console.log('This is a new post!');
    return undefined;
  }
};

const includePostInBlog = async (blogPostFileName) => {
  console.log('adding new post to blog');
  const { data } = await octokit.request(`GET /repos/{owner}/{repo}/contents/{path}`, {
    owner: 'smohadjer',
    repo: 'saeidmohadjer.com',
    path: 'app/content/en/pages/blog/index.html'
  });

  const buf = new Buffer.from(data.content, 'base64');
  const oldContent = buf.toString('ascii');
  const link = `{{> en/partials/blog/${blogPostFileName} }}`
  const newContent = oldContent.replace('<!--insert here-->', '<!--insert here-->\n' + link);
  await updateOrCreateFile('app/content/en/pages/blog/index.html', newContent, data.sha);
};

const updateOrCreateFile = async (filePath, content, sha) => {
  console.log(`Creating or updating file: ${filePath}`);
  await octokit.repos.createOrUpdateFileContents({
    owner: 'smohadjer',
    repo: 'saeidmohadjer.com',
    path: filePath,
    message: 'New blog post added via GitHub API',
    committer: {
      name: 'Saeid Mohadjer',
      email: 'saeid@fastmail.fm'
    },
    sha: sha,
    content: Buffer.from(content).toString('base64')
  });
};

const getBlogPostContent = (doc, id) => {
  const html = marked.parse(doc.content);

  return `<article id="${id}" data-filter-tag="${doc.tag}" class="post">
    <time datetime="${doc.date}">${doc.date}</time>
    <h1>${doc.title}</h1>
    <div class="tags">
      <span>${doc.tag}</span>
    </div>
    <div class="content">
      ${html}
    </div>
  </article>`;
};

export default async function (post, document_id) {
  const blogPostPath = `app/content/en/partials/blog/${post.slug}.html`;
  const blogPostContent =  getBlogPostContent(post, document_id);
  const blogPostSHA = await getBlogPostSHA(blogPostPath);

  await updateOrCreateFile(blogPostPath, blogPostContent, blogPostSHA);

  // include new post in blog's index page
  if (!blogPostSHA) {
    await includePostInBlog(post.slug);
  }
}
