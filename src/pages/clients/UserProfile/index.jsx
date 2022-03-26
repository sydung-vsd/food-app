import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Affix, Col, Menu, message, Row } from 'antd';
import {
  AiFillEdit,
  AiOutlinePoweroff, BsFillBookmarkFill,
  BsPencilSquare,
  FaComment,
  FaHistory,
  FaUserAlt,
  FiActivity,
  FiSettings,
  GiRank3,
} from 'react-icons/all';
import PropTypes from 'prop-types';

import * as ClientStyle from '../styles';
import * as S from './style';

import { IMG_SRC, PATH } from '../../../contants';

import Profile from './Profile';
import HistoryOrder from './HistoryOrder';
import HistoryRating from './HistoryRating';
import ChangePassword from './ChangePassword';
import HistoryComment from './HistoryComment';
import Bookmarks from './Bookmarks';
import EditProfile from './EditProfile';

import history from '../../../utils/history';
import { changeAvatarAction, logoutAction } from '../../../redux/actions';
import { MSG } from '../../../contants/message.contant';
import { LoadingMiddleStyle } from '../../../styles';

const UserProfile = ({ match }) => {
  const { SubMenu } = Menu;
  const userToken = localStorage.userInfo;
  const { userInfo } = useSelector(({ userReducer }) => userReducer);
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState({
    subMenu: [],
    menuItem: PATH.PROFILE_ORDER,
  });
  const [redirect, setRedirect] = useState(false);
  const handleChangeAvatar = (e) => {
    let msgErr = '';
    if (e.target.files[0].size > 2048 * 1000) {
      msgErr = MSG.VALIDATE_IMAGE_SIZE;
    }
    if (!e.target.files[0].type.match('image/')) {
      msgErr = MSG.VALIDATE_NOT_IMAGE;
    }
    if (!msgErr) {
      const { accessToken } = JSON.parse(userToken);
      dispatch(changeAvatarAction({
        accessToken,
        data: {
          image: e.target.files[0],
        },
      }));
    } else {
      message.error(msgErr);
    }
  };
  useEffect(() => {
    const menuInfo = match.params.page;
    const menuArr = menuInfo.split('-');
    if (menuArr.length > 1) {
      setActiveMenu({
        subMenu: [menuArr[0]],
        menuItem: menuInfo,
      });
    }
  }, []);
  useEffect(() => {
    if (!userToken || userInfo.error) {
      setRedirect(true);
    }
  }, [userInfo]);
  useEffect(() => {
    const menuInfo = match.params.page;
    const menuArr = menuInfo.split('-');
    if (menuArr.length > 1) {
      setActiveMenu({
        subMenu: [menuArr[0]],
        menuItem: menuInfo,
      });
    } else {
      setActiveMenu({
        subMenu: [],
        menuItem: PATH.PROFILE_ORDER,
      });
    }
  }, [match.params.page]);

  const handleSubMenuClick = ({ key }) => {
    const currentSubMenu = [...activeMenu.subMenu];
    const keyIndex = currentSubMenu.findIndex((subMenuKey) => subMenuKey === key);
    if (keyIndex === -1) {
      currentSubMenu.push(key);
    } else {
      currentSubMenu.splice(keyIndex, 1);
    }
    setActiveMenu({
      ...activeMenu,
      subMenu: currentSubMenu,
    });
  };
  const handleMenuItemClick = ({ key }) => {
    setActiveMenu({
      ...activeMenu,
      menuItem: key,
    });
    history.push(PATH.SUP_PROFILE(key));
  };
  const handleLogout = () => {
    const { accessToken } = JSON.parse(userToken);
    dispatch(
      logoutAction({
        data: accessToken,
      }),
    );
  };
  if (redirect) {
    return <Redirect to={PATH.HOME} />;
  } else {
    if (userInfo.load) {
      return (
        <LoadingMiddleStyle size={'large'} />
      );
    } else {
      return (
        <ClientStyle.Section>
          <ClientStyle.Container>
            <S.ProfileWrap>
              <Row gutter={16}>
                <Col lg={6} md={0} sm={0} xs={0}>
                  <Affix offsetTop={108.375}>
                    <S.ProfileSidebar>
                      <S.ProfileAvatarWrap>
                        <label htmlFor='avatar'>
                          {
                            userInfo.data.avatar ?
                              <img src={IMG_SRC(userInfo.data.avatar)} alt={userInfo.data.lastName} />
                              :
                              <div className='no-avatar'>{userInfo.data.lastName && userInfo.data.lastName[0].toUpperCase()}</div>
                          }

                          <AiFillEdit />
                          <input
                            type='file'
                            id='avatar'
                            hidden
                            accept='image/*'
                            onChange={handleChangeAvatar}
                          />
                        </label>
                      </S.ProfileAvatarWrap>
                      <S.ProfileFullName>
                        <div className='profile-usertitle-name'>
                          {`${userInfo.data.firstName} ${userInfo.data.lastName}`}
                        </div>
                      </S.ProfileFullName>
                      <Menu
                        theme='light'
                        style={{
                          background: '#fff',
                          height: 'auto',
                        }}
                        selectedKeys={[activeMenu.menuItem]}
                        openKeys={activeMenu.subMenu}
                        mode='inline'
                      >
                        <Menu.Item
                          key={PATH.PROFILE_ORDER}
                          icon={<FaHistory className='custom-icon-profile' />}
                          onClick={handleMenuItemClick}
                        >
                          Lịch sử giao dịch
                        </Menu.Item>
                        <SubMenu
                          key='history'
                          icon={<FiActivity />}
                          title='Hoạt động cá nhân'
                          onTitleClick={handleSubMenuClick}
                        >
                          <Menu.Item
                            key={PATH.PROFILE_BOOKMARKS}
                            icon={<BsFillBookmarkFill className='custom-icon-profile' />}
                            onClick={handleMenuItemClick}
                          >
                            Bộ sưu tập
                          </Menu.Item>
                          <Menu.Item
                            key={PATH.PROFILE_COMMENTS}
                            icon={<FaComment className='custom-icon-profile' />}
                            onClick={handleMenuItemClick}
                          >
                            Bình luận
                          </Menu.Item>
                          <Menu.Item
                            key={PATH.PROFILE_RATES}
                            icon={<GiRank3 className='custom-icon-profile' />}
                            onClick={handleMenuItemClick}
                          >
                            Đánh giá
                          </Menu.Item>
                        </SubMenu>
                        <SubMenu
                          key='user'
                          icon={<FiSettings />}
                          title='Cài đặt tài khoản'
                          onTitleClick={handleSubMenuClick}
                        >
                          <Menu.Item
                            key={PATH.PROFILE_INFO}
                            icon={<BsPencilSquare className='custom-icon-profile' />}
                            onClick={handleMenuItemClick}
                          >
                            Thông tin tài khoản
                          </Menu.Item>
                          <Menu.Item
                            key={PATH.PROFILE_CHANGE_PASSWORD}
                            icon={<FaUserAlt className='custom-icon-profile' />}
                            onClick={handleMenuItemClick}
                          >
                            Đổi mật khẩu
                          </Menu.Item>
                        </SubMenu>
                        <Menu.Item
                          key='logout'
                          icon={<AiOutlinePoweroff className='custom-icon-profile' />}
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </Menu.Item>
                      </Menu>
                    </S.ProfileSidebar>
                  </Affix>
                </Col>
                <Col lg={18} md={24} sm={24} xs={24}>
                  <S.ProfileContent>
                    <Switch>
                      <Route exact path={PATH.SUP_PROFILE(PATH.PROFILE_INFO)}>
                        <Profile changeAvatar={handleChangeAvatar} />
                      </Route>
                      <Route exact path={PATH.PROFILE_UPDATE}>
                        <EditProfile />
                      </Route>
                      <Route exact path={PATH.SUP_PROFILE(PATH.PROFILE_ORDER)}>
                        <HistoryOrder />
                      </Route>
                      <Route exact path={PATH.SUP_PROFILE(PATH.PROFILE_COMMENTS)}>
                        <HistoryComment />
                      </Route>
                      <Route exact path={PATH.SUP_PROFILE(PATH.PROFILE_BOOKMARKS)}>
                        <Bookmarks />
                      </Route>
                      <Route exact path={PATH.SUP_PROFILE(PATH.PROFILE_RATES)}>
                        <HistoryRating />
                      </Route>
                      <Route exact path={PATH.SUP_PROFILE(PATH.PROFILE_CHANGE_PASSWORD)}>
                        <ChangePassword />
                      </Route>
                      <Route
                        render={() => {
                          return <Redirect to={PATH.SUP_PROFILE(PATH.PROFILE_ORDER)} />;
                        }}
                      />
                    </Switch>
                  </S.ProfileContent>
                </Col>
              </Row>
            </S.ProfileWrap>
          </ClientStyle.Container>
        </ClientStyle.Section>
      );
    }
  }
};
export default UserProfile;

UserProfile.propTypes = {
  match: PropTypes.object,
};
