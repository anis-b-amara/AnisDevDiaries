import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import { BLOGS_PATH } from '../../utils';
import matter from 'gray-matter';

interface Blog {
  title: string;
  slug: string;
}

interface BlogProps {
  blogs: Blog[];
}

const Blogs = ({ blogs }: BlogProps) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.slug}>
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync(BLOGS_PATH);

  const blogs: Blog[] = files.map((file) => {
    const filePath = path.join(BLOGS_PATH, file);
    const mdXContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(mdXContent);
    const slug = data.slug;
    const title = data.title;

    return {
      title,
      slug,
    };
  });

  return {
    props: {
      blogs,
    },
  };
};

export default Blogs;
