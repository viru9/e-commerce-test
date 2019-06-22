import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {withRouter} from 'react-router-dom';


class MainNav extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      products_count:0
    };
  }

  componentDidMount(){
    if(JSON.parse(localStorage.getItem('CartObject'))){
      this.setState({products_count:JSON.parse(localStorage.getItem('CartObject')).length});
    }
  }

  componentWillReceiveProps(nextPrev){
    if(nextPrev.products_count){
      this.setState({products_count:nextPrev.products_count});
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {history} = this.props;
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">E-Shopping</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>

          <NavItem className="pointer-icon" onClick={()=> {history.replace({pathname: 'shoping-cart'})}}>
            {this.state.products_count}<i class="fas fa-shopping-cart"></i>
          </NavItem>

          </Nav>
        </Collapse>
      </Navbar>
    );
  }

}

function mapStateToProps(state) {
  return {mainNav: state};
}

export default withRouter(connect(mapStateToProps, {})(MainNav));
