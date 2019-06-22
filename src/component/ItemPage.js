import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardImg, CardBody, CardTitle, CardText, CardFooter, Container} from 'reactstrap';
import MainNav from './Navbar';
import {fetchItem} from './../action/home';
import _ from 'lodash';

class ItemPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchItem(this.props.match.params.id);
  }


  renderItemDetails(){
    const {ItemPage} = this.props;
  return _.map(ItemPage.products, (data, index) => {
    console.log('ItemPage: ',data.id);
      if(data.id==this.props.match.params.id){
        return(
          <Card className="card-main-item">
            <CardImg className="card-image" variant="top" src={data.image} />
              <CardBody>
                <CardTitle>{data.title}</CardTitle>
                  <CardText>{data.body}</CardText>
              </CardBody>
               <CardFooter>
                    {"Rs: "+data.price}
              </CardFooter>
          </Card>
        );
      }
    });

  }

  render() {
    return (
      <div>
      <MainNav/>
      <Container>
      {this.renderItemDetails()}
      </Container>
      </div>
    );
  }

}

function mapStateToProps(ItemPage) {
  return {ItemPage};
}

export default connect(mapStateToProps, {fetchItem})(ItemPage);
