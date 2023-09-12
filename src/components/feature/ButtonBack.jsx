'use client';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

export default function ButtonBack(props) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return <Button onClick={goBack} {...props} />;
}
