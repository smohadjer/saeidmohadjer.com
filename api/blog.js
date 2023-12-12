import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { sanitize } from './_sanitize.js';
import github from './_github.js';

dotenv.config();

const uri =  process.env.development === 'true' ? process.env.db_uri_local : process.env.db_uri_remote;
const client = new MongoClient(uri);

const insertPost = async (collection, req) => {
  const query = {_id: req.body.post_id};
  console.log(req.body.content);
  const document = {
    date: req.body.date,
    title: sanitize(req.body.title),
    slug: sanitize(req.body.slug),
    tag: sanitize(req.body.tag),
    content: req.body.content
  };

  if (req.body.post_id) {
    await collection.replaceOne(query, document);
    return {
      id: req.body.post_id,
      doc: document
    }
  } else {

    const insertResponse = await collection.insertOne(document);
    return {
      id: insertResponse.insertedId,
      doc: document
    }
  }
};

export default async (req, res) => {
    try {
      await client.connect();
      const database = client.db('blog');
      const posts = database.collection('posts');

      if (req.method === 'GET') {
        const data = await posts.find().toArray();
        return res.json(data);
      }

      if (req.method === 'POST') {
        const obj = await insertPost(posts, req);
        if (obj.id) {
          // create or update blog files on github using github API
          await github(obj.doc, obj.id);

          res.status(200).send({
            message: 'Post inserted!',
            post_id: obj.id
          });
        } else {
          res.status(500).send({
            error: 500,
            message: 'Invalid data!'
          });
        }
      }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
