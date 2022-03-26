import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import * as HomeS from '../../styles';
import StoreItem from '../../../../../components/clients/StoreItem';
import { getStoresAction } from '../../../../../redux/actions';
import { PATH } from '../../../../../contants';
import ModalStoreDetail from '../../../../../components/clients/ModalStoreDetail';

const SectionStore = () => {
  const dispatch = useDispatch();
  const { storeList: { data: storeData } } = useSelector(({ storeReducer }) => storeReducer);
  const [isShowModalBookmark, setIsShowModalBookmark] = useState(false);
  const [storeDetail, setStoreDetail] = useState({
    storeId: null,
    storeName: null,
    avgRate: null,
    storeImage: null,
    storeAddress: null
  });

  useEffect(() => {
    dispatch(getStoresAction({ limit: 12 }));
  }, []);
  const renderStore = (span = 4) => {
    return (
      <Row gutter={[16, 16]}>
        {storeData.map((store) => {
          return (
            <Col lg={span} md={6} sm={6} xs={12} key={store.id}>
              <StoreItem
                {...store}
                isShowModalBookmark={isShowModalBookmark}
                setIsShowModalBookmark={setIsShowModalBookmark}
                setStoreDetail={setStoreDetail}
              />
            </Col>
          );
        })}
      </Row>
    );
  };
  return (
    <HomeS.Section>
      <HomeS.SectionTitle>Cửa hàng</HomeS.SectionTitle>
      <HomeS.SectionContainer>
        <ModalStoreDetail
          isShow={isShowModalBookmark}
          setShow={setIsShowModalBookmark}
          storeId={storeDetail.storeId}
          avgRate={storeDetail.avgRate}
          image={storeDetail.storeImage}
          address={storeDetail.storeAddress}
          storeName={storeDetail.storeName}
          fromDetail={false}
        />
        {renderStore()}
        <div className='d-flex vertical-center horizontal-center mt-3r'>
          <Link to={PATH.STORE} className='d-inline-block w-40'>
            <HomeS.ButtonCustom>Xem tất cả</HomeS.ButtonCustom>
          </Link>
        </div>
      </HomeS.SectionContainer>
    </HomeS.Section>
  );
};
export default SectionStore;
