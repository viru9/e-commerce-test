import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import { Card, CardHeader, CardBody,CardTitle, CardText, Button,
   CardFooter, CardImg, Container, Row, Col} from 'reactstrap';

import {getProductList} from './../action/home';

class ProductList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getProductList();
  }

  renderProductList(){
    const { productList } = this.props;
    if(productList.products.length>0){
      return _.map(productList.products, data => {
        return (
          <Col xs="6" sm="3" key={data.id}>
            <Card>
              <CardImg variant="top" src="https://www.gstatic.com/webp/gallery/1.jpg" />
              <CardBody>
              <CardTitle>{data.title.length > 40 ? (data.title.substring(1, 40)+"...") : data.title }</CardTitle>
              <CardText>
              </CardText>
              <Button variant="primary">Add to cart</Button>
              </CardBody>
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
