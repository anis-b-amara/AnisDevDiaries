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
    <main className="flex flex-col gap-4 w-[960px] mx-auto">
      <section className="flex flex-col items-center p-4 bg-orange-200">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <div>{data.x}</div>
        <div>
          <i className="text-sm">
            Published <span className="font-medium">{date}</span>
          </i>
        </div>
      </section>
      <section className="p-4 bg-slate-100">
        <MDXRemote {...content} />
      </section>
    </main>
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
