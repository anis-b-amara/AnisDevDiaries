import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

import { BLOGS_PATH } from '../../utils';
import PageContainer from '@/components/PageContainer';
import Head from 'next/head';

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
      <PageContainer>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold text-center">The Blog</h2>
          <ul className="flex flex-col w-full gap-2">
            {blogs.map((blog) => (
              <li key={blog.slug}>
                <Link
                  className="text-base font-semibold text-secondary"
                  href={`/blog/${blog.slug}`}
                >
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
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
