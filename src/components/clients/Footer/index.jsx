import { Col, Row } from 'antd';
import {
  AiFillSkype,
  FaFacebookF,
  GrGooglePlus,
  RiMapPin2Fill,
} from 'react-icons/all';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

import * as FooterStyle from './style';

function Footer() {
  return (
    <div>
      <FooterStyle.FooterWrap>
        <div>
          <Row gutter={50}>
            <Col span={8}>
              <FooterStyle.AboutFooter>
                <h4>Giới thiệu</h4>
                <p>
                  Freshfood - ứng dụng mua sắm trực tuyến thú vị, tin cậy, an toàn và miễn phí!
                  Freshfood là nền tảng giao dịch trực tuyến hàng đầu ở Việt Nam.
                  Với sự đảm bảo của Freshfood, bạn sẽ mua hàng trực tuyến an tâm và nhanh chóng hơn bao giờ hết!
                </p>
                <div>
                  <div className='facebook'>
                    <a href='https://www.facebook.com/danlangvan/'><FaFacebookF /></a>
                  </div>
                  <div className='google'>
                    <a href='https://www.google.com.vn/'><GrGooglePlus /></a>
                  </div>
                  <div className='skype'>
                    <a href='https://www.skype.com/'><AiFillSkype /></a>
                  </div>
                </div>
              </FooterStyle.AboutFooter>
            </Col>
            <Col span={8}>
              <FooterStyle.Subscribe>
                <h4>Chăm sóc khách hàng</h4>
                <ul>
                  <li>
                    <a href=''>
                      Trung Tâm Trợ Giúp
                    </a>
                  </li>
                  <li>
                    <a href=''>
                      Freshfood Blog
                    </a>
                  </li>
                  <li>
                    <a href=''>
                      Freshfood Mall
                    </a>
                  </li>
                  <li>
                    <a href=''>
                      Hướng Dẫn Mua Hàng
                    </a>
                  </li>
                  <li>
                    <a href=''>
                      Hướng Dẫn Bán Hàng
                    </a>
                  </li>
                  <li>
                    <a href=''>
                      Vận Chuyển
                    </a>
                  </li>
                  <li>
                    <a href=''>
                      Trả Hàng & Hoàn Tiền
                    </a>
                  </li>
                  <li>
                    <a href=''>
                      Chăm Sóc Khách Hàng
                    </a>
                  </li>
                  <li>
                    <a href=''>
                      Chính Sách Bảo Hành
                    </a>
                  </li>
                </ul>
              </FooterStyle.Subscribe>
            </Col>
            <Col span={8}>
              <FooterStyle.GetInTouch>
                <h4>Thông tin liên hệ</h4>
                <ul>
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
                  <li>
                    <a>
                      <RiMapPin2Fill />
                      K54/16 Đồng Kè - Hoa Khanh Bac
                    </a>
                  </li>
                </ul>
              </FooterStyle.GetInTouch>
            </Col>
          </Row>
        </div>
      </FooterStyle.FooterWrap>
      <FooterStyle.Copyright>
        <span>FreshFood </span>- Copyright 2021. Design by <span> Vu Sy Dung & Huy Huan</span>
      </FooterStyle.Copyright>
    </div>
  );
}

export default Footer;
