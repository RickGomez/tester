import React, { Component } from 'react';
import axios from 'axios';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount(props) {
    axios.get('/api/getallimages')
      .then((images) => {
        console.log(images)
        this.setState({ images: images.data });
      });
  }

  render() {
    const { images } = this.state;

    return (
      <div>
        <h5>User Submitted Images:</h5>
        {
          images.map(image => (
            <div className={'image-card'}>
              <img className={'user-image'} src={require(`../../backend/${image.imagePath}`)} alt={image.impagePath} />
              userId: {image.userId}
            </div>
          ))
        }
      </div>
    );
  }
}

export default Home;