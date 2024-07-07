Repository for https://saeidmohadjer.com/  
Blog https://saeidmohadjer.com/blog

# Request-response life-cycle for blog homepage (/blog)

1. Browser sends a get request for `/blog` to the server
1. A rewrite rule in `/vercel.json` redirects request to `/api/blog` before request reaches the server ([Rewrites on Vercel](https://vercel.com/docs/edge-network/rewrites))
1. The api endpoint connects to a MongoDB database and fetches all the blog posts
1. If request has a query `response=json` the endpoint returns all blog posts as json, otherwise it continues with following steps
1. The script on server reads file `/public/blog-template.html` from disc, 


