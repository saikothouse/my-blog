import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import matter from 'gray-matter';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const importAllPosts = async () => {
      const context = require.context('../posts', true, /\.md$/);
      const postsArray = await Promise.all(
        context.keys().map(async (key) => {
          const post = await import(`../posts${key.replace('./', '/')}`);
          const { data } = matter(post.default);
          return {
            title: data.title,
            id: key.replace('./', '').replace('.md', ''),
            publishedAt: data.publishedAt,
            image: data.image,
          };
        })
      );
      setPosts(postsArray);
    };

    importAllPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Helmet>
        <title>My Blog - Home</title>
        <meta name="description" content="Welcome to my blog where I share insights and stories." />
      </Helmet>
      <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105">
            <Link to={`/post/${post.id}`} className="block">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-500 text-sm">Published on: {new Date(post.publishedAt).toLocaleDateString()}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;