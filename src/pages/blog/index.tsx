import fs from 'fs';
import path from 'path';
import Link from 'next/link';

import { BLOGS_PATH } from '../../blogs/utils';

interface Blog {
  title: string;
  fileName: string;
}

interface BlogProps {
  blogs: Blog[];
}

const Blogs = ({ blogs }: BlogProps) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.fileName}>
          <Link href={`/blog/${blog.fileName}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync(BLOGS_PATH);

  const blogs: Blog[] = files.map((file) => {
    const filePath = path.join(BLOGS_PATH, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const lines = content.split('\n');
    const title = lines.find((line) => line.startsWith('# '))?.substr(2) || '';

    return {
      title,
      fileName: file.replace('.mdx', ''),
    };
  });

  return {
    props: {
      blogs,
    },
  };
};

export default Blogs;
