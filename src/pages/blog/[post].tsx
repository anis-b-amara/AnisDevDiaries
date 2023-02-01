import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteProps } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

import { BLOGS_PATH } from '../../utils';

interface BlogPostProps {
  content: MDXRemoteProps;
  data: Record<string, string>;
}

const BlogPost: React.FC<BlogPostProps> = ({ content, data }) => {
  const date = new Date(data.date).toLocaleDateString();
  return (
    <div className="blog-post">
      <h1>{data.title}</h1>
      <div>{data.x}</div>
      <i>
        Published <span>{date}</span>
      </i>
      <MDXRemote {...content} />
    </div>
  );
};

interface BlogPostParams {
  post: string;
}

export const getStaticPaths = async (): Promise<{
  paths: Array<{ params: BlogPostParams }>;
  fallback: false;
}> => {
  const files = await fs.promises.readdir(BLOGS_PATH);

  const paths = files.map((filename) => {
    const { data } = matter.read(path.join(BLOGS_PATH, filename));
    return { params: { post: data.slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: BlogPostParams;
}): Promise<{ props: BlogPostProps }> => {
  const postsDirectory = path.join(BLOGS_PATH);
  const filenames = fs.readdirSync(postsDirectory);

  const postFilename = filenames
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      return matter(fileContent);
    })
    .find(({ data }) => data.slug === params.post);

  const { data, content } = postFilename as unknown as BlogPostProps;
  const source = await serialize(content);

  return {
    props: {
      content: source,
      data,
    },
  };
};

export default BlogPost;
