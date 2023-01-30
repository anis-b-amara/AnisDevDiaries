import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteProps } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import path from 'path';
import { BLOGS_PATH } from '../../blogs/utils';

interface BlogPostProps {
  source: MDXRemoteProps;
}

const BlogPost: React.FC<BlogPostProps> = ({ source }) => {
  return (
    <div className="blog-post">
      <MDXRemote {...source} />
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
  const files = fs.readdirSync(BLOGS_PATH);

  const paths = files.map((file) => {
    return {
      params: {
        post: file.replace('.mdx', ''),
      },
    };
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
  const filePath = path.join(BLOGS_PATH, `${params.post}.mdx`);
  const content = fs.readFileSync(filePath, 'utf-8');
  const source = await serialize(content);

  return {
    props: {
      source,
    },
  };
};

export default BlogPost;
