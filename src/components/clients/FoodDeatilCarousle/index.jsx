import { useEffect, useRef } from 'react';

import { Carousel, Col, Row } from 'antd';
import NumberFormat from 'react-number-format';
import { FcNext, FcPrevious } from 'react-icons/all';
import PropTypes from 'prop-types';

import * as Style from './style';

import { ROOT_PATH } from '../../../contants';

const NextArrow = ({ onClick, index, lastIndex, setFoodId, foodId }) => {
  return (
    <Style.NextArrowButtonWrap hide={index === lastIndex}>
      <Style.NextArrowButton onClick={() => {
        onClick();
        setFoodId(foodId);
      }}>
        <FcNext />
      </Style.NextArrowButton>
    </Style.NextArrowButtonWrap>
  );
};

const PrevArrow = ({ onClick, index, setFoodId, foodId }) => {
  return (
    <Style.PrevArrowButtonWrap hide={index === 0}>
      <Style.PrevArrowButton onClick={() => {
        onClick();
        setFoodId(foodId);
      }}>
        <FcPrevious />
      </Style.PrevArrowButton>
    </Style.PrevArrowButtonWrap>
  );
};

const FoodDetailCarousel = function({ foodList, index, setIndex, setFoodId }) {
  const slider = useRef(null);

  useEffect(() => {
    setIndex(index);
    slider.current.goTo(index);
  }, [index]);

  const renderFoodCarouselItem = () => {
    return foodList.map(({ discount, foodConsume, foodDescription, foodImage, foodName, id }) => {
      return (
        <Style.CarouselItem key={id}>
          <div>
            <img src={`${ROOT_PATH}${foodImage}`} alt={foodName} />
            <div className='info'>
              <Row>
                <Col  lg={20} md={20} sm={20} xs={18}>
                  <div className='imgbox-food-name'>{foodName}</div>
                  <div className='imgbox-desc'>{foodDescription}</div>
                  <div className='imgbox-total'>
                    Đã được đặt
                    <span className='txt-bold'>
                      &nbsp;{foodConsume}&nbsp;
                    </span>
                    lần
                  </div>
                </Col>
                <Col lg={4} md={4} sm={4} xs={6} style={{ alignSelf: 'center' }}>
                  <div className='imgbox-current-price'>
                    <NumberFormat
                      value={discount}
                      displayType={'text'}
                      thousandSeparator
                      suffix={'đ'}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Style.CarouselItem>
      );
    });
  };
  return (
    <Carousel
      arrows
      nextArrow={
        <NextArrow
          index={index}
          lastIndex={foodList.length - 1}
          setFoodId={setFoodId}
          foodId={foodList[index]['id']}
        />
      }
      prevArrow={
        <PrevArrow
          index={index}
          setFoodId={setFoodId}
          foodId={foodList[index]['id']}
        />
      }
      dots={false}
      ref={slider}
      afterChange={(current) => {
        setIndex(current);
      }}
    >
      {renderFoodCarouselItem()}
    </Carousel>
  );
};
export default FoodDetailCarousel;

NextArrow.propTypes = {
  foodId: PropTypes.number,
  onClick: PropTypes.func,
  index: PropTypes.number,
  lastIndex: PropTypes.number,
  setFoodId: PropTypes.func,
};
PrevArrow.propTypes = {
  foodId: PropTypes.number,
  onClick: PropTypes.func,
  index: PropTypes.number,
  setFoodId: PropTypes.func,
};
FoodDetailCarousel.propTypes = {
  foodList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      foodName: PropTypes.string.isRequired,
      foodDescription: PropTypes.string.isRequired,
      foodImage: PropTypes.string.isRequired,
      discount: PropTypes.number.isRequired,
      foodConsume: PropTypes.number.isRequired,
    })),
  index: PropTypes.number,
  setIndex: PropTypes.func,
  setFoodId: PropTypes.func,
};
