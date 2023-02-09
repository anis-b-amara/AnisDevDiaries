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
    <main className="flex flex-col items-center gap-4 p-4">
      <div className="relative flex flex-col items-center justify-center w-full p-4 bg-slate-400">
        <div className="px-4 py-2 text-white bg-black sm:mr-auto flex-0">
          <Link href="/" className="flex">
            Go back to Home Page
          </Link>
        </div>
        <h1 className="flex-grow text-3xl sm:absolute left">The Blog</h1>
      </div>
      <ul className="flex flex-col w-full gap-2 p-4 bg-slate-100">
        {blogs.map((blog) => (
          <li key={blog.slug}>
            <Link
              className="text-xl font-semibold text-blue-600"
              href={`/blog/${blog.slug}`}
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
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
