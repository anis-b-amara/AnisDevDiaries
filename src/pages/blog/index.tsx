import Link from 'next/link';
import Head from 'next/head';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

import { BLOGS_PATH } from '../../utils';

interface Blog {
  title: string;
  slug: string;
}

interface BlogProps {
  blogs: Blog[];
}

const Blogs = ({ blogs }: BlogProps) => {
  return (
    <>
      <Head>
        <title>Blog contents</title>
      </Head>
      <div className="flex flex-col gap-5">
        <h2 className="text-center text-2xl font-semibold">The Blog</h2>
        <ul className="flex w-full flex-col gap-2">
          {blogs.map((blog) => (
            <li key={blog.slug}>
              <Link
                className="text-base font-semibold text-slate-900 dark:text-slate-200"
                href={`/blog/${blog.slug}`}
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
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
