Repository for https://saeidmohadjer.com/  
Blog https://saeidmohadjer.com/blog

# Request-response life-cycle for blog page (/blog) 

1. Browser sends a get request for /blog to server
1. A rewrite rule in /vercel.json redirects request to /api/blog before request reaches the server ([Rewrites on Vercel](https://vercel.com/docs/edge-network/rewrites))
1. The api endpoint connects to a MongoDB database and fetches all the blog posts
1. If request has a query `response=json` the endpoint returns all blog posts as json, otherwise it does following steps
1. reads file `/public/blog-template.html`, 


