import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { addBreweryRatingToDb, getBreweryRating} from '../API'
 
class StarRating extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: null
    };
  }

  componentDidMount(){
    const breweryId = this.props.item.id;
    const userId = this.props.userId;
    getBreweryRating(breweryId, userId)
    .then(rating => {
      this.setState({rating: rating})
    }
    );
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    const breweryId = this.props.item.id;
    const userRating = nextValue;
    const userId = this.props.userId
    addBreweryRatingToDb(breweryId, userRating, userId)
  }

 
  render() {
    const { rating } = this.state;
    
    return (
        <div>
        <b>My Rating: </b>
          <StarRatingComponent 
          className='starRating'
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
        {rating}
        </div>
    );
  }
}

export default StarRating;