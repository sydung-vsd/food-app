import { Anchor } from 'antd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as HomeS from '../../styles';

const SectionPromotion = ({ render, anchor: AnchorLink }) => {
  const { foodPromotions: { data: promotionData } } = useSelector(({ foodReducer }) => foodReducer);
  return (
    <HomeS.Section>
      <HomeS.SectionTitle>Khuyến mãi</HomeS.SectionTitle>
      <HomeS.SectionContainer>
        {render(promotionData)}
        <div className='d-flex vertical-center horizontal-center mt-3r'>
          <Anchor affix={false} className='d-inline-block w-40'>
            <AnchorLink href='#food_list' title={
              <HomeS.ButtonCustom>Xem tất cả</HomeS.ButtonCustom>
            } />
          </Anchor>
        </div>
      </HomeS.SectionContainer>
    </HomeS.Section>
  );
};
export default SectionPromotion;

SectionPromotion.propTypes = {
  render: PropTypes.func,
  anchor: PropTypes.func,
};
