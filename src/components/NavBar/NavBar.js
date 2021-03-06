import './NavBar.css';

import { Col, Modal, ModalBody } from 'react-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import React, { Component } from 'react';
import { faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ModalHeader from 'react-bootstrap/ModalHeader';
import SelectionCart from '../SelectionCart/SelectionCart.js'
import logo from 'images/white_logo.png';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.handleNavbarClick = this.handleNavbarClick.bind(this);
    this.routes = this.props.routes;
    this.userID = this.props.userID;
    this.onLogout = this.props.onLogout;

    const complete_path = window.location.pathname;
    const first_slash_index = complete_path.indexOf('/');
    const second_slash_index = complete_path.indexOf('/', first_slash_index + 1);
    const current_path = second_slash_index === -1
      ? complete_path.substring(0, complete_path.length)
      : complete_path.substring(0, second_slash_index);
    this.state = {
      active_button: current_path
      , show: false
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({ show: true })
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleNavbarClick(index) {
    this.setState(state => ({
      active_button: index
    }));
  }

  getClassName(path) {
    return 'navbar-btn' + ((path === this.state.active_button) ? ' active' : '');
  }

  render() {
    return (
      <Navbar
      collapseOnSelect
      expand='lg'
      variant='dark'
      fixed='top'
      id='app-navbar'
      className='navbar-color'
      >
        <Navbar.Brand
          as={Link}
          to='/'
          onClick={this.handleNavbarClick.bind(this, '/')}
        >
          <img
            id='navbar-logo'
            src={logo}
            className='d-inline-block align-top'
            alt='logo'
          />

        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' expanded='false' />

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>

            {this.routes.map((route, index) =>
              <Nav.Link
                key={index}
                className={this.getClassName(route.path)}
                as={Link}
                to={route.path}
                onClick={this.handleNavbarClick.bind(this, route.path)}
              >
                <div className='navbar-btn-legend'>
                  {route.legend}
                </div>
              </Nav.Link>
            )}

          </Nav>

        </Navbar.Collapse>

        <Nav.Link className='shopping-cart'>
          <div onClick={ this.handleShow }>
            <div className='shoping-cart-icon'>
              <FontAwesomeIcon icon={ faShoppingCart } className='mr-2' />
            </div>
            <div onClick={ e => e.stopPropagation() }>
              <Modal className='cart-modal'
                show={ this.state.show }
                onHide={ this.handleClose }
              >
                <ModalHeader className='cart-head' closeButton>
                  <Col xs={ 6 } className='offset-3'>
                    <h2>Cart</h2>
                  </Col>
                </ModalHeader>
                <ModalBody>
                  <SelectionCart 
                    userID = { this.userID }
                    handleClose={ this.handleClose }
                  />
                </ModalBody>
              </Modal>
            </div>
          </div>
        </Nav.Link>

        <Nav.Link className='sign-out' onClick={this.onLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />
        </Nav.Link>

      </Navbar>

    );
  }

}

export default NavBar;
