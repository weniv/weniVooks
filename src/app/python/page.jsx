import dynamic from 'next/dynamic';
const Codeblock = dynamic(() => import('../../components/feature/CodeBlock'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      내용내용!
      <Codeblock lang="python" />
    </>
  );
}
