'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { getInitPythonCode } from '@/components/codeblock/event';

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
  const initCode = `def solution():\n  return "Hello World"\nsolution()`;
  const [python, setPython] = useState([
    { id: 1, code: initCode, result: '결과값' },
    {
      id: 2,
      code: `def solution():\n  return "Hello 2222"\nsolution()`,
      result: '111',
    },
  ]);

  return (
    <>
      <div style={{ overflowX: 'hidden' }}>
        <h2>Python</h2>
        {python.map((el) => (
          <PythonCodeblock
            key={el.id}
            id={el.id}
            code={el.code}
            result={el.result}
            setPython={setPython}
          />
        ))}
      </div>

      {/* <div>
        <h2>JavaScript</h2>
        <JavascriptCodeblock />
      </div> */}
    </>
  );
}
