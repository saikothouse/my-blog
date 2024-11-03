import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';
import matter from 'gray-matter';
import { formatDistanceToNow } from 'date-fns';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { DiscussionEmbed } from 'disqus-react';

const PostDetail = () => {
  const { postId } = useParams();
  const [content, setContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [publishedAt, setPublishedAt] = useState(new Date());
  const [image, setImage] = useState('');
  const [readingTime, setReadingTime] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const post = await import(`../posts/${postId}.md`);
      const { data, content } = matter(post.default);
      setPostTitle(data.title);
      setPublishedAt(new Date(data.publishedAt));
      setImage(data.image);
      setContent(content);
    };

    fetchPost();
  }, [postId]);

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  };

  useEffect(() => {
    if (content) {
      setReadingTime(calculateReadingTime(content));
    }
  }, [content]);

  const disqusShortname = 'your-disqus-shortname'; // Replace with your Disqus shortname
  const disqusConfig = {
    url: window.location.href,
    identifier: postId,
    title: postTitle,
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Helmet>
        <title>{postTitle}</title>
        <meta name="description" content={`Read about ${postTitle}`} />
        <meta property="og:title" content={postTitle} />
        <meta property="og:description" content={`Read about ${postTitle}`} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postTitle} />
        <meta name="twitter:description" content={`Read about ${postTitle}`} />
        <meta name="twitter:image" content={image} />
      </Helmet>
      {image && (
        <img
          src={image}
          alt={postTitle}
          className="w-full h-auto mb-4 rounded-lg shadow-lg"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{postTitle}</h1>
      <p className="text-gray-600 mb-4">
        Published {formatDistanceToNow(publishedAt)} ago · {readingTime} read
      </p>
      <div className="prose lg:prose-xl">
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={{
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-600 my-4" {...props} />
            ),
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={solarizedlight}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-gray-200 rounded px-1" {...props}>
                  {children}
                </code>
              );
            },
            iframe: ({ node, ...props }) => {
              const src = props.src || '';
              if (src.includes('youtube.com') || src.includes('youtu.be')) {
                const videoId = src.split('?v=')[1] || src.split('youtu.be/')[1];
                return (
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      frameBorder="0"
                      allowFullScreen
                      {...props}
                    />
                  </div>
                );
              } else if (src.includes('facebook.com')) {
                const videoId = src.split('?video_id=')[1];
                return (
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F${videoId}`}
                      frameBorder="0"
                      allowFullScreen
                      {...props}
                    />
                  </div>
                );
              }
              return <iframe {...props} />;
            },
            a: ({ node, ...props }) => {
              const href = props.href || '';
              if (href.includes('gist.github.com')) {
                const gistId = href.split('gist.github.com/')[1];
                return (
                  <div className="my-4">
                    <script
                      src={`https://gist.github.com/${gistId}.js`}
                      async
                      defer
                    />
                  </div>
                );
              }
              return <a {...props} />;
            },
            audio: ({ node, ...props }) => {
              return (
                <audio controls {...props}>
                  <source src={props.src} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              );
            },
            video: ({ node, ...props }) => {
              return (
                <video controls {...props}>
                  <source src={props.src} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              );
            },
          }}
        />
      </div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
};

export default PostDetail;
