/* Demo for saving a base64 file to GitHub using GitHub's SDK and Node.js */

import { Octokit } from "@octokit/rest";
import { Base64 } from "js-base64";

import dotenv from 'dotenv';

dotenv.config();

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: process.env.Token
});

export default async function handler(req, res) {
  console.log(req.body);

  const date = new Date(Date.now());

  const content = `<main>
  <article class="post">
		<time datetime="${date}">${date.toDateString()}</time>
		<h1>${req.body.title}</h1>
		<div class="tags">
			<span>${req.body.tag}</span>
		</div>
    <div class="content">
      ${req.body.content}
    </div>
  </main>`

  await octokit.repos.createOrUpdateFileContents({
    owner: 'smohadjer',
    repo: 'saeidmohadjer.com',
    path: `app/content/de/pages/blog/${req.body.slug}`,
    message: 'New blog post added via GitHub API',
    committer: {
      name: 'Saeid Mohadjer',
      email: 'saeid@fastmail.fm'
    },
    content: Base64.encode(content)
  });

  if (req.body) {
    res.setHeader('Content-Type', 'text/plain')
    res.write(`Your new post will be live at: \nhttps://saeidmohadjer.com/blog/${req.body.slug}\n\n`)
    res.write('You posted: \n')
    res.end(JSON.stringify(req.body, null, 2))
  }
}
