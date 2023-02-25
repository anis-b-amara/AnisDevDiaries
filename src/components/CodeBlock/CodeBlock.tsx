import * as React from 'react';

import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-cshtml';

import 'prismjs/themes/prism-tomorrow.css';

interface CodeBlockProps {
  children: string;
  language: string;
}

const CodeBlock = (props: CodeBlockProps): JSX.Element => {
  const { children, language } = props;

  React.useEffect(() => Prism.highlightAll(), []);

  return (
    <pre>
      <code className={`language-${language}`}>{children}</code>
    </pre>
  );
};

export default CodeBlock;
