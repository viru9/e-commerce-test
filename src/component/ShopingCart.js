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
      product_list:null,
      total:0,
      tax:0,
      discount:0,
      sub_total:0
    }
  }

  componentDidMount(){
    if(JSON.parse(localStorage.getItem('CartObject'))){
      this.setState({product_list:JSON.parse(localStorage.getItem('CartObject'))});
      setTimeout(() => {
        this._calculateTotals();
      }, 1000);
    }
  }

  removeFromCart(id,event){
    let data_set = this.state.product_list;
    let index_remove = -1;
    _.map(data_set, (data, index) => {
      if((data.id && id) && data.id===id){
        index_remove = index;
      }
    });
    if(index_remove>-1){
      data_set.splice(index_remove, 1);
      this.setState({product_list:data_set, products_count:data_set.length});
      localStorage.setItem('CartObject',JSON.stringify(data_set));
      this._calculateTotals();
    }
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
    this._calculateTotals();
  }

  _calculateTotals(){
    let total = 0;
    let tax = 0;
    let discount = 0;
    let sub_total = 0;
    let data_set = this.state.product_list;
    _.map(data_set, (data, index) => {
      total = total + (data.price*data.qty);
    });

    tax = total * 12/100;
    if(total>500){
      let disc = parseInt(total/500);
      discount = (total * (2/100*disc));
      sub_total = (total + tax) - discount;
    }
    else {
      discount=0;
      sub_total = tax + total;
    }

    this.setState({total:this._decimalValidator(total),
      tax:this._decimalValidator(tax),
      discount: this._decimalValidator(discount),
      sub_total:this._decimalValidator(sub_total)});
  }

  _decimalValidator(value){
    return ((Math.floor(value * 100) / 100).toFixed(2));
  }

  renderShopingCartTable(){
    return _.map(this.state.product_list, (data,index) => {
      return(
        <tr key={data.id}>
          <th scope="row">{index+1}</th>
          <td>{data.title}</td>
          <td><img className="cart-image" src={data.image}/></td>
          <td>{data.price}</td>
          <td><input onChange={this.onQtyChange.bind(this,data.id,data.qty)} className="input-width" type="number" value={data.qty} min="1"/></td>
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
     <Col xs="1" sm="4"></Col>
     <Col xs="11" sm="8">
     <Card body outline color="primary">
     <Row>
     <Col xs="11" sm="8">
      <Row>
      <Col xs="7" sm="8">Total: </Col>
      <Col xs="5" sm="4">{"Rs: "+this.state.total}</Col>
     </Row>
      <Row>
      <Col xs="7" sm="8">Vat (12%): </Col>
      <Col xs="5" sm="4">{"Rs: "+this.state.tax}</Col>
      </Row>
      <Row>
      <Col xs="7" sm="8">Discount (2% for every Rs 500): </Col>
      <Col xs="5" sm="4">{"Rs: "+this.state.discount}</Col>
      </Row>
      <Row>
      <Col xs="7" sm="8">Sub Total: </Col>
      <Col xs="5" sm="4">{"Rs: "+this.state.sub_total}</Col>
      </Row>
     </Col>
     </Row>
     </Card></Col>
     </Row>

     <Row>
     <Col xs="11" sm="8">
     </Col>
     <Col xs="1" sm="4">
     <Button className="checkout-button" color="secondary">Checkout</Button>
     </Col>
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
