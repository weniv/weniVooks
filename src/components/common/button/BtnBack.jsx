'use client';
import { useRouter } from 'next/navigation';
import Btn from './Btn';

export default function BtnBack(props) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return <Btn onClick={goBack} {...props} />;
}
