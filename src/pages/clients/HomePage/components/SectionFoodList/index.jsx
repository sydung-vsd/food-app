import { useEffect, useState } from 'react';
import { Affix, Button, Col, Menu, Row, Select, Spin, Tag } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import * as HomeS from '../../styles';
import * as S from './style';
import * as RootStyle from '../../../../../styles';
import { BiFilterAlt, BsCheck, MdRemoveShoppingCart } from 'react-icons/all';
import { getFoodListAction, getTagListAction } from '../../../../../redux/actions';

const SectionFoodList = ({ render }) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const {
    foodList: {
      currentPage,
      data: foodData,
      lastPage,
      load: foodLoad,
      total,
    },
  } = useSelector(({ foodReducer }) => foodReducer);
  const { tagList: { data: tagData } } = useSelector(({ tagReducer }) => tagReducer);
  const [mobileFilterActive, setMobileFilterActive] = useState(false);
  const [dropdownSelectOpen, setDropdownSelectOpen] = useState({ tag: false, price: false });
  const [menuActive, setMenuActive] = useState('created_at');
  const [sortPrice, setSortPrice] = useState('');
  const [request, setRequest] = useState({
    group: null,
    sort: 'created_at',
    sortType: -1,
    page: 1,
    tags: [],
  });

  useEffect(() => {
    dispatch(getTagListAction());
  }, []);

  useEffect(() => {
    dispatch(getFoodListAction(request));
  }, [request]);

  const renderTagList = () => {
    return tagData.map(({ id, tagActive, tagName }) => {
      if (tagActive === 1) {
        return {
          value: id,
          label: tagName,
        };
      }
    });
  };
  const tagRender = ({ label, value, closable, onClose }) => {
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color='green'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
        value={value}
      >
        {label}
      </Tag>
    );
  };
  const handleChaneTag = (key) => {
    let tagsActive = [...request.tags];
    if (key === '') {
      tagsActive = [];
    } else {
      const tagIndex = tagsActive.indexOf(key);
      if (tagIndex !== -1) {
        tagsActive.splice(tagIndex, 1);
      } else {
        tagsActive.push(key);
      }
    }
    setRequest({
      ...request,
      page: 1,
      tags: tagsActive,
    });
  };
  const handleChangeMenu = (key) => {
    setMenuActive(key);
    let menuRequest = {
      ...request,
      page: 1,
    };
    if (key === 'promotion') {
      menuRequest = {
        ...menuRequest,
        sort: null,
        group: key,
      };
    } else {
      setSortPrice('');
      menuRequest = {
        ...menuRequest,
        sort: key,
        sortType: -1,
        group: null,
      };
    }
    setRequest(menuRequest);
  };

  const renderTagListMenu = (tagsActive) => {
    return tagData.map(({ id, tagActive, tagName }) => {
      if (tagActive === 1) {
        let icon = null;
        const isActive = tagsActive.indexOf(`${id}`) > -1;
        if (isActive) {
          icon = (<BsCheck className='custom-icon-position' />);
        }
        return (
          <Menu.Item
            key={id}
            icon={icon}
            className='hide-after'
            onClick={({ key }) => handleChaneTag(key)}
          >
            {tagName}
          </Menu.Item>
        );
      }
    });
  };
  return (
    <Row gutter={20}>
      <Col span={4} className='filter-food-by-tags'>
        <Affix offsetTop={88.375}>
          <Menu
            theme='light'
            style={{ background: '#fff', height: 'auto' }}
            selectedKeys={request.tags.length === 0 ? [''] : request.tags}
            mode='inline'
          >
            <S.HeaderFilter>
              <BiFilterAlt /> B??? l???c
            </S.HeaderFilter>
            <Menu.Item
              className='hide-after'
              key=''
              icon={request.tags.length === 0 && < BsCheck className='custom-icon-position' />}
              onClick={({ key }) => handleChaneTag(key)}
            >
              T???t c???
            </Menu.Item>
            {renderTagListMenu(request.tags)}
          </Menu>
        </Affix>
      </Col>
      <Col lg={20} md={20} sm={24}>
        <HomeS.AffixIndex offsetTop={88.375}>
          <RootStyle.Filter>
            <RootStyle.PrefixFilter
              mode='horizontal'
              multiple={true}
              selectedKeys={[menuActive]}
              style={{
                flexBasis: '50%',
              }}
            >
              <Menu.Item key='created_at' onClick={({ key }) => {
                handleChangeMenu(key);
              }}>
                M???i nh???t
              </Menu.Item>
              <Menu.Item key='promotion' onClick={({ key }) => {
                handleChangeMenu(key);
              }}>
                Khuy???n m??i
              </Menu.Item>
              <Menu.Item key='food_consume' onClick={({ key }) => {
                handleChangeMenu(key);
              }}>
                B??n ch???y
              </Menu.Item>
            </RootStyle.PrefixFilter>
            <RootStyle.MoreFilterIcon onClick={() => setMobileFilterActive(!mobileFilterActive)} />
            <RootStyle.SuffixFilter
              className='suffix-filter'
              active={mobileFilterActive}
              selectOpen={dropdownSelectOpen.tag || dropdownSelectOpen.price}
            >
              <li className='mobile-filter filer-by-tag'>
                <Select
                  value={request?.tags}
                  mode='multiple'
                  showArrow
                  placeholder='Ch???n danh m???c'
                  tagRender={tagRender}
                  options={renderTagList()}
                  maxTagCount={3}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  onDropdownVisibleChange={(status) => {
                    setDropdownSelectOpen({ ...dropdownSelectOpen, tag: status });
                  }}
                  onChange={(value) => {
                    setRequest({
                      ...request,
                      tags: value,
                      page: 1,
                    });
                  }}
                />
              </li>
              <li className='sort-by-price'>
                <Select
                  value={sortPrice}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  onDropdownVisibleChange={(status) => {
                    setDropdownSelectOpen({ ...dropdownSelectOpen, price: status });
                  }}
                  onChange={(value) => {
                    setSortPrice(value);
                    if (menuActive === 'created_at' || menuActive === 'food_consume') {
                      setMenuActive('');
                    }
                    setRequest({
                      ...request,
                      sort: 'price',
                      sortType: value,
                      page: 1,
                    });
                  }}
                >
                  <Option value='' selected hidden disabled>
                    Gi??
                  </Option>
                  <Option value='1'>Gi?? t??ng d???n</Option>
                  <Option value='-1'>Gi?? gi???m d???n</Option>
                </Select>
              </li>
            </RootStyle.SuffixFilter>
          </RootStyle.Filter>
        </HomeS.AffixIndex>
        <div className='p-relative pt-2r'>
          {total === 0
            ?
            <div
              className='d-flex vertical-center horizontal-center t-center fw-b'
              style={{
                minHeight: '400px',
                fontSize: '150%',
              }}
            >
              <div>
                <MdRemoveShoppingCart
                  style={{
                    color: '#f5222d',
                    fontSize: '200%',
                  }}
                /><br />
                Kh??ng c?? m??n ??n n??o!
              </div>
            </div>
            :
            render(foodData, 6)
          }
          {
            foodLoad &&
            <Spin
              size='large'
              className='p-absolute'
              style={{
                top: '100%',
                left: '50%',
                transform: 'translate(-50%, -200%)',
              }}
            />
          }
          {currentPage < lastPage &&
          <div className='d-flex vertical-center horizontal-center mt-3r'>
            <Button
              onClick={() => setRequest({
                ...request,
                page: request.page + 1,
              })}
            >
              Xem th??m
            </Button>
          </div>
          }
        </div>
      </Col>
    </Row>
  );
};
export default SectionFoodList;

SectionFoodList.propTypes = {
  render: PropTypes.func,
};
