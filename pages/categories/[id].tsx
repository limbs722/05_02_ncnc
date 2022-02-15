// categories/[id].tsx
// 브랜드 페이지
import axios from 'axios';
import Grid from 'components/Grid';
import { useRouter } from 'next/router';

export default function BrandList({ data }) {
  const router = useRouter();
  const { id } = router.query;

  return <>{id === '1' ? <div>hi</div> : <Grid data={data.conCategory2s} />}</>;
}

export const getServerSideProps = async ({ query }) => {
  const { id } = query;
  // console.log(id);
  if (id === '1') {
    // 땡처리 상품일 경우
    const res = await axios.get('https://api2.ncnc.app/con-items/soon');
    const { conItems } = res.data;
    return {
      props: {
        data: conItems,
      },
    };
  } else {
    // 다른 상품 종류일 경우
    const res = await axios.get(
      `https://api2.ncnc.app/con-category1s/${id}/nested`,
    );
    const { conCategory1 } = res.data;
    return {
      props: {
        data: conCategory1,
      },
    };
  }
};
