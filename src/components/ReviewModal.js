import React from 'react';
import {Modal, ModalHeader, ModalBody, Button, Input, Form, FormGroup} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import StarRating from './StarRating';
import { addBreweryReviewToDb, getBreweryReview } from '../API'

import { connect } from 'react-redux';
import { actions } from '../store';

class ReviewModal extends React.Component {
  constructor() {
    super();
    this.state = {
      reviewModal: false,
      reviewText: null,
      userId: null,
      breweryId: null,
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    getBreweryReview(this.props.brewery.id, this.props.userId)
    .then(reviewText => {
      this.setState(
      {
        reviewText: reviewText,
        userId: this.props.userId,
        breweryId: this.props.brewery.id,
      }
    )
  })
  }
  
  toggle() {
    this.setState({
      reviewModal: !this.state.reviewModal,
    })
  }

  handleChange = (e) => {
    this.setState({
        reviewText: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const review = {
      reviewText: this.state.reviewText,
      userId: this.state.userId,
      breweryId: this.state.breweryId,
    }
    addBreweryReviewToDb(review.breweryId, review.reviewText, review.userId);
    this.setState({
        reviewModal: false,
    })
 }

  render() {
    return (
        <div>
          <Button onClick={this.toggle} size='md' color="info">Review</Button>
            <Modal isOpen={this.state.reviewModal} toggle={this.toggle} size='lg'>
              <ModalHeader>Review: {this.props.brewery.name}</ModalHeader>
                <ModalBody>
                  <AvForm>
                      <p>{this.state.reviewText}</p> 
                    <StarRating userId={this.props.user.uid} item={this.props.brewery}/>
                      <AvField onChange={e => this.handleChange(e)} value={this.state.reviewText} name="reviewText" type="textarea" rows="10" validate={{maxLength: {value: 1000}}} />
                    <Button onClick={(e) => this.onSubmit(e)} type="submit" color="info">Submit</Button>
                  </AvForm>
                </ModalBody>
            </Modal>
        </div>
      );
    }
  }

  function mapStateToProps(state){
    return {
      reviewModal: state.reviewModal,
      user: state.user
    };
  }

  function mapDispatchToProps(dispatch){
    return {
      onToggleReviewModal(modalBool){
        dispatch(actions.toggleReviewModal(modalBool));
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ReviewModal);