import { Octokit } from "@octokit/rest";
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
  const { data } = await octokit.request(`GET /repos/{owner}/{repo}/contents/{path}`, {
    owner: 'smohadjer',
    repo: 'saeidmohadjer.com',
    path: 'app/content/de/pages/blog/index.html'
  });

  const buf = new Buffer.from(data.content, 'base64');
  const oldContent = buf.toString('ascii');
  const link = `{{> de/partials/${blogPostFileName.replace('.html', '')} }}`
  const newContent = oldContent.replace('<main>', '<main>\n' + link);
  await updateOrCreateFile('app/content/de/pages/blog/index.html', newContent, data.sha);
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

const getBlogPostContent = (req) => {
  const date = new Date(Date.now());
  return `<article class="post">
    <time datetime="${date}">${date.toDateString()}</time>
    <h1>${req.body.title}</h1>
    <div class="tags">
      <span>${req.body.tag}</span>
    </div>
    <div class="content">
      ${req.body.content}
    </div>
  </article>`;
};

export default async function handler(req, res) {
  const blogPostPath = `app/content/de/partials/${req.body.slug}`;
  const blogPostContent =  getBlogPostContent(req);
  const blogPostSHA = await getBlogPostSHA(blogPostPath);

  await updateOrCreateFile(blogPostPath, blogPostContent, blogPostSHA);

  // include new post in blog's index page
  if (!blogPostSHA) {
    await includePostInBlog(req.body.slug);
  }

  if (req.body) {
    res.setHeader('Content-Type', 'text/plain')
    res.write(`Your new post will be live at: \nhttps://saeidmohadjer.com/blog\n\n`)
    res.write('You posted: \n')
    res.end(JSON.stringify(req.body, null, 2))
  }
}
