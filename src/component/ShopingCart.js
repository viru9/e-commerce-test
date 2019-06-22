import React, {Component} from 'react';
import MainNav from './Navbar';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {Table, Container, Input, Card,Button, Row, Col} from 'reactstrap';
import ErrorBoundary from './../common/ErrorBoundary';

class ShopingCart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products_count:0,
      product_list:null
    }
  }

  componentDidMount(){
    if(JSON.parse(localStorage.getItem('CartObject'))){
      this.setState({product_list:JSON.parse(localStorage.getItem('CartObject'))});
    }
  }

  removeFromCart(id){
    let data_set = this.state.product_list;
    _.map(data_set, (data, index) => {
      console.log('data: ',data);
      if(data.id && data.id===id){
        data_set.splice(index+1, 1);
      }
    });
    this.setState({product_list:data_set});
    localStorage.setItem('CartObject',JSON.stringify(data_set));
  }

  onQtyChange(id,qty,event){
      let data_set = this.state.product_list;
    _.map(data_set, (data, index) => {
      if(data.id && data.id===id){
        data_set[index].qty = event.target.value;
      }
    });
    this.setState({product_list:data_set});
    localStorage.setItem('CartObject',JSON.stringify(data_set));
  }

  renderShopingCartTable(){
    return _.map(this.state.product_list, (data,index) => {
      return(
        <tr key={data.id}>
          <th scope="row">{index+1}</th>
          <td>{data.title}</td>
          <td><img className="cart-image" src={data.image}/></td>
          <td>{data.price}</td>
          <td><input onChange={this.onQtyChange.bind(this,data.id,data.qty)} className="input-width" type="number" value={data.qty}/></td>
          <td>{data.price*data.qty}</td>
          <td>
          <div onClick={this.removeFromCart.bind(this,data.id)}><i className="fa fa-times pointer-icon" aria-hidden="true"></i></div></td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
      <ErrorBoundary>
      <MainNav products_count={this.state.products_count}/></ErrorBoundary>
      <Container>

      <Row>
      <Table size="sm">
       <thead>
         <tr>
           <th>#</th>
           <th>Item Name</th>
           <th></th>
           <th>Price</th>
           <th>Quantity</th>
           <th>Total</th>
         </tr>
       </thead>
       <tbody>
       {this.renderShopingCartTable()}
       </tbody>
     </Table>
     </Row>

     <Row>
     <Col xs="6" sm="6"></Col>
     <Col xs="6" sm="6">
     <Card body outline color="primary">
     <Row>
     <Col xs="8" sm="8">
      <Row>
      <Col xs="6" sm="6">Total: </Col>
      <Col xs="6" sm="6"></Col>
     </Row>
      <Row>
      <Col xs="6" sm="6">Vat: </Col>
      <Col xs="6" sm="6"></Col>
      </Row>
      <Row>
      <Col xs="6" sm="6">Discount: </Col>
      <Col xs="6" sm="6"></Col>
      </Row>
      <Row>
      <Col xs="6" sm="6">Sub Total: </Col>
      <Col xs="6" sm="6"></Col>
      </Row>
     </Col>
     <Col xs="4" sm="4"></Col>
     </Row>
     </Card></Col>
     </Row>


     </Container>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {shopingCart: state};
}

export default connect(mapStateToProps, {})(ShopingCart);
