import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/admins/Header';
import Sidebar from '../../components/admins/Sidebar';
import Footer from '../../components/admins/Footer';

import * as StyleLayout from './style';
import { LoadingMiddleStyle } from '../../styles/LoadingMiddle.style';

const AdminLayout = ({ exact, path, component: Component }) => {
  const [collapsed, setCollapsed] = useState(true);

  const { adminInfo } = useSelector(({ adminReducer }) => adminReducer);
  const [redirect, setRedirect] = useState(false);

  const adminToken = localStorage.adminInfo;
  useEffect(() => {
    if (adminInfo.error) {
      setRedirect(true);
    }
  }, [adminInfo]);

  if (!adminToken || redirect) {
    return <Redirect to="/" />;
  } else {
    if (adminInfo.load) {
      return (
        <LoadingMiddleStyle size={'large'}/>
      );
    } else {
      return (
        <Route
          exact={exact}
          path={path}
          render={(routeProps) => {
            return (
              <StyleLayout.Container>
                <StyleLayout.Sidebar isShow={collapsed}>
                  <Sidebar />
                </StyleLayout.Sidebar>

                <StyleLayout.SiteLayout isFull={!collapsed}>
                  <StyleLayout.Header isFull={!collapsed}>
                    <Header collapsed={collapsed} toggle={setCollapsed} />
                  </StyleLayout.Header>

                  <StyleLayout.Content>
                    <Component {...routeProps} />
                  </StyleLayout.Content>

                  <StyleLayout.Footer>
                    <Footer />
                  </StyleLayout.Footer>
                </StyleLayout.SiteLayout>
              </StyleLayout.Container>
            );
          }}
        />
      );
    }
  }
};

export default AdminLayout;

AdminLayout.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.func,
};
