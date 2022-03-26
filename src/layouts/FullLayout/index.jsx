import { Link, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import * as LayoutStyle from './style';

import bgLogin from '../../assets/images/bg-login.png';
import foodLogo from '../../assets/images/food_logo.png';
import { LoadingMiddleStyle } from '../../styles/LoadingMiddle.style';

function FullLayout({ exact, path, component: Component }) {
  const { userInfo: { data: userData, loadUser } } = useSelector(({ userReducer }) => userReducer);
  if (userData.id) {
    return <Redirect to='/' />;
  } else {
    if (loadUser) {
      return (
        <LoadingMiddleStyle size={'large'} />
      );
    } else {
      return (
        <Route
          exact={exact}
          path={path}
          render={(routeProps) => {
            return (
              <div>
                <LayoutStyle.BackGround src={bgLogin} />
                <LayoutStyle.Container>
                  <LayoutStyle.LogoWrap>
                    <Link to='/'>
                      <LayoutStyle.LogoImg src={foodLogo} />
                      <h1>FreshFood</h1>
                    </Link>
                  </LayoutStyle.LogoWrap>
                  <LayoutStyle.FormWrap>
                    <Component {...routeProps} />
                  </LayoutStyle.FormWrap>
                </LayoutStyle.Container>
              </div>
            );
          }}
        />
      );
    }
  }
}

export default FullLayout;

FullLayout.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.func,
};
