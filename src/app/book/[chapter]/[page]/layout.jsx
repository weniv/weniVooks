import PageIndex from '@/components/sub/PageIndex';

export default function Layout({ children }) {
  return (
    <>
      <main style={{ maxWidth: '99rem' }}>{children}</main>
      <PageIndex />
    </>
  );
}
