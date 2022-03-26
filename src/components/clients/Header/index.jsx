import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Affix, Badge, Dropdown, Form, Input, Menu, Select, Space } from 'antd';
import {
  AiFillSkype, BsFillBookmarkFill, FaComment,
  FaFacebookF,
  FaHistory,
  GiRank3,
  GrGooglePlus,
  IoFastFoodOutline,
  RiMapPin2Fill,
} from 'react-icons/all';

import {
  LogoutOutlined,
  MailOutlined,
  PhoneOutlined, SearchOutlined, ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

import PropTypes from 'prop-types';

import * as HeaderStyle from './styles';

import history from '../../../utils/history';
import { logoutAction } from '../../../redux/actions';
import { PATH, ROOT_PATH } from '../../../contants';
import toNotMark from '../../../utils/toNotMark';

function Header({ setShowModalLogin }) {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [searchForm] = Form.useForm();
  const [searchType, setSearchType] = useState(PATH.STORE);
  const {
    userInfo: {
      data: {
        avatar,
        firstName,
        id: userId,
        lastName,
        phone,
      },
    },
  } = useSelector(({ userReducer }) => userReducer);
  const { total: totalCart } = useSelector(({ cartReducer }) => cartReducer);
  const handleLogout = () => {
    const { accessToken } = JSON.parse(localStorage.getItem('userInfo'));
    dispatch(
      logoutAction({
        data: accessToken,
      }),
    );
  };
  const handleSearch = ({ searchType, search }) => {
    if (search.trim()) {
      history.push({
        pathname: `${searchType}`,
        search: `?search=${toNotMark(search)}`,
      });
    } else {
      searchForm.resetFields();
    }
  };
  useEffect(() => {
    const pathname = history.location.pathname;
    if (pathname === PATH.FOOD || pathname === PATH.STORE) {
      let field = {
        searchType: pathname,
      };
      if (!history.location.search) {
        field = {
          ...field,
          search: '',
        };
      }
      searchForm.setFieldsValue(field);
    } else {
      searchForm.resetFields();
    }
  }, [history.location.pathname, history.location.search]);
  const userMenu = (
    <HeaderStyle.UserMenu>
      {userId ? (
        <div>
          <Menu.Item
            key={PATH.PROFILE_INFO}
            style={{ padding: '1rem 2rem' }}
            onClick={() => {
              history.push(PATH.SUP_PROFILE(PATH.PROFILE_INFO));
            }}
          >
            <Space>
              <HeaderStyle.UserAvatar
                size='large'
                src={avatar && `${ROOT_PATH}${avatar}`}
              >
                {!avatar && (
                  <span style={{ fontSize: '2rem' }}>
                    {lastName[0].toUpperCase()}
                  </span>
                )}
              </HeaderStyle.UserAvatar>
              <div style={{ marginLeft: '1rem' }}>
                <div>{`${firstName} ${lastName}`}</div>
                <small style={{ color: '#ccc' }}>{phone}</small>
              </div>
            </Space>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key={PATH.PROFILE_ORDER}
            style={{ padding: '1rem 2rem' }}
            icon={<FaHistory />}
            onClick={() => {
              history.push(PATH.SUP_PROFILE(PATH.PROFILE_ORDER));
            }}
          >
            Lịch sử giao dịch
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key={PATH.PROFILE_BOOKMARKS}
            style={{ padding: '1rem 2rem' }}
            icon={<BsFillBookmarkFill />}
            onClick={() => {
              history.push(PATH.SUP_PROFILE(PATH.PROFILE_BOOKMARKS));
            }}
          >
            Bộ sưu tập
          </Menu.Item>
          <Menu.Item
            key={PATH.PROFILE_COMMENTS}
            style={{ padding: '1rem 2rem' }}
            icon={<FaComment />}
            onClick={() => {
              history.push(PATH.SUP_PROFILE(PATH.PROFILE_COMMENTS));
            }}
          >
            Lịch sử bình luận
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key={PATH.PROFILE_RATES}
            style={{ padding: '1rem 2rem' }}
            icon={<GiRank3 />}
            onClick={() => {
              history.push(PATH.SUP_PROFILE(PATH.PROFILE_RATES));
            }}
          >
            Lịch sử đánh giá
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key='logout'
            style={{ padding: '1rem 2rem' }}
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Đăng xuất
          </Menu.Item>
        </div>
      ) : (
        <>
          <Menu.Item key={PATH.LOGIN} style={{ padding: '1rem 2rem' }}>
            <Link to={PATH.LOGIN}>Đăng nhập</Link>
          </Menu.Item>
          <Menu.Item key={PATH.REGISTER} style={{ padding: '1rem 2rem' }}>
            <Link to={PATH.REGISTER}>Đăng ký</Link>
          </Menu.Item>
        </>
      )}
    </HeaderStyle.UserMenu>
  );

  return (
    <div>
      <HeaderStyle.TopBar>
        <div>
          <ul>
            <li>
              <a>
                <RiMapPin2Fill />
                K54/16 Đồng Kè - Hoa Khanh Bac 
              </a>
            </li>
            <li>
              <a href='tel:0935906860'>
                <PhoneOutlined />
                +84 868 758 538
              </a>
            </li>
            <li>
              <a href='mailto:huyhuanhg@gmail.com'>
                <MailOutlined />
                vusydungvsd@gmail.com
              </a>
            </li>
          </ul>
          <div>
            <p>Flow us:</p>
            <div className='facebook'>
              <a href='https://www.facebook.com/vusydungvsd/'><FaFacebookF /></a>
            </div>
            <div className='google'>
              <a href='https://www.google.com.vn/'><GrGooglePlus /></a>
            </div>
            <div className='skype'>
              <a href='https://www.skype.com/'><AiFillSkype /></a>
            </div>
          </div>
        </div>
      </HeaderStyle.TopBar>
      <Affix offsetTop={0}>
        <HeaderStyle.Header>
          <HeaderStyle.MenuWrap>
            <HeaderStyle.Logo to={PATH.HOME}>FreshFood</HeaderStyle.Logo>

            <HeaderStyle.SearchWrap>
              <Form
                onFinish={handleSearch}
                form={searchForm}
                initialValues={{
                  searchType: PATH.STORE,
                  search: '',
                }}
              >

                <Form.Item
                  name='search'
                  noStyle
                >
                  <Input
                    placeholder={`Tìm kiếm ${searchType === PATH.STORE ? 'cửa hàng' : 'món ăn'}`}
                    style={{ background: 'unset' }}
                    suffix={
                      <HeaderStyle.SearchBtn
                        htmlType='submit'
                      >
                        <SearchOutlined /> <span>Tìm kiếm</span>
                      </HeaderStyle.SearchBtn>}
                    addonBefore={
                      <Form.Item
                        name='searchType'
                        noStyle
                      >
                        <HeaderStyle.SearchType
                          size='large'
                          onChange={(value) => {
                            setSearchType(value);
                          }}
                        >
                          <Option value={PATH.STORE}>
                            <ShopOutlined className='search-icon' />
                            <span className='search-text'>Cửa hàng</span>
                          </Option>
                          <Option value={PATH.FOOD}>
                            <IoFastFoodOutline className='search-icon' />
                            <span className='search-text'>Món ăn</span>
                          </Option>
                        </HeaderStyle.SearchType>
                      </Form.Item>
                    }
                  />
                </Form.Item>
              </Form>
            </HeaderStyle.SearchWrap>
            <Space className='p-relative' size='large'>
              <Badge count={totalCart} style={{ right: '5px' }}>
                <HeaderStyle.CartBtn
                  onClick={() => {
                    if (userId && history.location.pathname !== PATH.CART) {
                      history.push(PATH.CART);
                    } else {
                      if (!userId) {
                        setShowModalLogin(true);
                      }
                    }
                  }}
                  disabled={history.location.pathname === PATH.CART}
                >
                  <ShoppingCartOutlined />
                  <span className='text'>Cart</span>
                </HeaderStyle.CartBtn>
              </Badge>
              <Dropdown
                overlay={userMenu}
                trigger={['click']}
                placement='bottomRight'
                className='dropdown-user-profile'
                getPopupContainer={(trigger) => {
                  return trigger.parentNode;
                }}
              >
                <a
                  className='ant-dropdown-link'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {userId ? (
                    <HeaderStyle.UserAvatar
                      size='large'
                      src={
                        avatar && `${ROOT_PATH}${avatar}`
                      }
                    >
                      {!avatar && (
                        <span style={{ fontSize: '2rem' }}>
                          {lastName[0].toUpperCase()}
                        </span>
                      )}
                    </HeaderStyle.UserAvatar>
                  ) : (
                    <HeaderStyle.UserAvatar size='large' icon={<UserOutlined />} />
                  )}
                </a>
              </Dropdown>
            </Space>
          </HeaderStyle.MenuWrap>
        </HeaderStyle.Header>
      </Affix>
    </div>
  );
}

export default Header;

Header.propTypes = {
  setShowModalLogin: PropTypes.func,
};
