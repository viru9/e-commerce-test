import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import { Card, CardHeader, CardBody,CardTitle, CardText, Button,
   CardFooter, CardImg, Container, Row, Col,Input, Form, FormGroup} from 'reactstrap';

import {getProductList} from './../action/home';

class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product_list:null
    }
  }

  componentDidMount(){
    this.props.getProductList();
    localStorage.clear();
  }

  addProduct(event){
     event.preventDefault();
     let cart_object = {
       qty:event.target[0].value,
       id:event.target[1].value,
       title:event.target[2].value,
       body:event.target[3].value,
       image:event.target[3].value
     }

     let store_cart = JSON.parse(localStorage.getItem('CartObject'));

     if(!store_cart){
       let obj = [];
       obj.push(cart_object)
       localStorage.setItem('CartObject',JSON.stringify(obj));
     }
     else {
       let store_cart = JSON.parse(localStorage.getItem('CartObject'));
       let duplicate_id = 0;
       _.map(store_cart, (data, index) => {
         if(data.id===cart_object.id){
           duplicate_id=data.id;
         }
       });
       if(duplicate_id>0){
         _.map(store_cart, (data, index) => {
           if(data.id===cart_object.id){
             store_cart[index].qty=cart_object.qty;
           }
         });
       }
       else {
         store_cart.push(cart_object);
       }

       localStorage.setItem('CartObject',JSON.stringify(store_cart));
       console.log("CART::: ",JSON.parse(localStorage.getItem('CartObject')));
     }
  }

  renderProductList(){

    const { productList } = this.props;

    let qty = 1;
    if(productList.products.length>0){
      return _.map(productList.products, data => {
        return (
          <Col xs="6" sm="3" key={data.id}>
            <Card>
              <CardImg variant="top" src="https://www.gstatic.com/webp/gallery/1.jpg" />
                <CardBody>
                  <CardTitle>{data.title.length > 40 ? (data.title.substring(1, 40)+"...") : data.title }</CardTitle>
                    <CardText></CardText>
                      </CardBody>
                      <CardFooter>
                        <Form onSubmit={this.addProduct.bind(this)}>
                          <Row form>
                          <Col md={8}>
                            <FormGroup>
                              <Input type="number" defaultValue='1'/>
                              <Input type="hidden" value={data.id}/>
                              <Input type="hidden" value={data.title}/>
                              <Input type="hidden" value={data.body}/>
                            </FormGroup>
                              </Col>
                          <Col md={4}><Button type="submit" variant="primary">Add</Button></Col>
                          </Row>
                      </Form>
              </CardFooter>
            </Card>
        </Col>);
  });
  }}

  render() {
    return (
   <Container>
      <Row>
      {this.renderProductList()}
      </Row>
   </Container>
        );
  }
}

function mapStateToProps(productList) {
  return {productList};
}

export default connect(mapStateToProps, {getProductList})(ProductList);
