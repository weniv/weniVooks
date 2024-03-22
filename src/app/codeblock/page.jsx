'use client';

import dynamic from 'next/dynamic';

const PythonCodeblock = dynamic(
  () => import('@/components/codeblock/PythonCodeblock'),
  {
    ssr: false,
  },
);

const JavascriptCodeblock = dynamic(
  () => import('@/components/codeblock/JavascriptCodeblock'),
  {
    ssr: false,
  },
);

export default function page() {
  return (
    <div>
      <div>
        <h2>Python</h2>
        <PythonCodeblock />
      </div>

      <div>
        <h2>JavaScript</h2>
        <JavascriptCodeblock />
      </div>
    </div>
  );
}
