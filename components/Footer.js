import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <h3>Về chúng tôi</h3>
            <p>18094451 - Lê văn Hiệu</p>
          </div>
          <div className="col-lg-4 col-md-6">
            <h3>Liên hệ</h3>
            <ul className="contact-info">
              <li><i className="fa fa-map-marker"></i>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
              <li><i className="fa fa-phone"></i>Số điện thoại: 0123456789</li>
              <li><i className="fa fa-envelope"></i>Email: info@ecommerce.com</li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6">
            <h3>Theo dõi chúng tôi</h3>
            <ul className="social-links">
              <li><a href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a href="#"><i className="fa fa-instagram"></i></a></li>
              <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;