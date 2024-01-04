import styles from './ListSNS.module.scss';

import BtnIcon from '@/components/common/button/BtnIcon';
import SVGHome from '@/components/svg/SVGHome';
import SVGInflearn from '@/components/svg/SVGInflearn';
import SVGInstar from '@/components/svg/SVGInstar';
import SVGNaver from '@/components/svg/SVGNaver';
import SVGYoutube from '@/components/svg/SVGYoutube';

export default function ListSNS({ color = 'grayLv2' }) {
  const SNSList = [
    {
      text: '메인',
      icon: <SVGHome color={color} />,
      href: '/',
      target: null,
    },
    {
      text: '인프런',
      icon: <SVGInflearn color={color} />,
      href: 'https://www.inflearn.com/users/170213/@jejucoding',
      target: '_blank',
    },
    {
      text: '유튜브',
      icon: <SVGYoutube color={color} />,
      href: 'https://www.youtube.com/@jejucodingcamp',
      target: '_blank',
    },
    {
      text: '네이버 블로그',
      icon: <SVGNaver color={color} />,
      href: 'https://blog.naver.com/paul-lab',
      target: '_blank',
    },
    {
      text: '인스타그램',
      icon: <SVGInstar color={color} />,
      href: 'https://www.instagram.com/weniv_official/',
      target: '_blank',
    },
  ];

  return (
    <ul className={styles.list}>
      {SNSList.map((sns, index) => (
        <li key={index}>
          <BtnIcon
            className={styles.snsBtn}
            href={sns.href}
            target={sns.target}
          >
            {sns.icon}
            <span className="a11y-hidden">{sns.text}</span>
          </BtnIcon>
        </li>
      ))}
    </ul>
  );
}
