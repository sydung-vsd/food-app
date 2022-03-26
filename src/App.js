import { Router, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import moment from 'moment';
import 'moment/locale/vi';
import { ThemeProvider } from 'styled-components';

import history from './utils/history';

import { DYNAMIC, PATH } from './contants';

import FullLayout from './layouts/FullLayout';
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';

import LoginPage from './pages/authClient/Login';
import AdminLoginPage from './pages/AdminLogin';
import DashboardPage from './pages/admins/Dashboard';
import HomePage from './pages/clients/HomePage';
import RegisterPage from './pages/authClient/Register';
import StoreDetail from './pages/clients/StoreDetail';
import CartPage from './pages/clients/Cart';
import UserProfile from './pages/clients/UserProfile';
import ClientList from './pages/clients/List';

import NotFoundPage from './pages/NotFound';

import {
  getAdminInfoAction,
  getUserInfoAction,
  refreshAdminTokenUserAction,
  refreshTokenUserAction,
} from './redux/actions';

import { rootTheme } from './styles/themes/root.js';

import 'antd/dist/antd.less';
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const cCSS = 'color: #29d197; font-size: 500%; font-weight: bold;text-shadow: 1px 1px 5px #000; margin-left: 40%;';
    console.log('%cFreshFood', cCSS);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    if (userInfo) {
      const time = userInfo.expires - moment().valueOf() / 1000;
      if (time < 86400) {
        if (time < 0) {
          localStorage.removeItem('userInfo');
        } else {
          dispatch(
            refreshTokenUserAction({
              data: userInfo.accessToken,
            }),
          );
        }
      } else {
        dispatch(getUserInfoAction({ data: userInfo.accessToken }));
      }
    }
    if (adminInfo) {
      const time = adminInfo.expires - moment().valueOf() / 1000;
      if (time < 86400) {
        if (time < 0) {
          localStorage.removeItem('adminInfo');
        } else {
          dispatch(
            refreshAdminTokenUserAction({
              data: adminInfo.accessToken,
            }),
          );
        }
      } else {
        dispatch(getAdminInfoAction({ data: adminInfo.accessToken }));
      }
    }
  }, []);

  return (
    <ThemeProvider theme={rootTheme}>
      <Router history={history}>
        <Switch>
          <ClientLayout exact path={PATH.HOME} component={HomePage} />

          <ClientLayout exact path={PATH.STORE} component={ClientList} />
          <ClientLayout exact path={PATH.FOOD} component={ClientList} />
          <ClientLayout exact path={PATH.PROMOTION} component={ClientList} />
          <ClientLayout exact path={PATH.CROWDED} component={ClientList} />
          <ClientLayout exact path={PATH.FAVORITE} component={ClientList} />

          <ClientLayout path={DYNAMIC(PATH.STORE, ['slug'])} component={StoreDetail} />

          <ClientLayout exact path={PATH.CART} component={CartPage} />

          <ClientLayout path={DYNAMIC(PATH.PROFILE, ['page'])} component={UserProfile} />

          <AdminLayout exact path={PATH.ADMIN} component={DashboardPage} />

          <FullLayout exact path={PATH.LOGIN} component={LoginPage} />
          <FullLayout exact path={PATH.REGISTER} component={RegisterPage} />
          <FullLayout exact path={PATH.ADMIN_LOGIN} component={AdminLoginPage} />

          <FullLayout component={NotFoundPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
