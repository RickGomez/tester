import React, { Component } from 'react';
import { Button } from './Button'
import { MATTRESSES } from '../Constants.js'


export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMattress: '',
      shoppingCart: []
    };
  }

  componentDidMount() {
    this.setState({ activeMattress: Object.keys(MATTRESSES)[0] });
    }

  selectActiveMattress = key => this.setState({activeMattress: key});


  addMattressToCart = key => {
    const { shoppingCart } = this.state;
    shoppingCart.push(key)
    this.setState({ shoppingCart: shoppingCart });
  }

  render() {
    const { activeMattress, shoppingCart } = this.state;
    const selectedMattress = activeMattress ? activeMattress : Object.keys(MATTRESSES)[0]
    const imageUrl = `images/${MATTRESSES[selectedMattress].imageFileName}`;
    return (
      <div className="mattress-container">
        <div className="row">
          <div className="col-sm-6 col-xs-12 image-container">
            {/* <img src={imageUrl} alt={MATTRESSES[selectedMattress].name} width="600" height="300" /> */}
            <img src={imageUrl} alt={MATTRESSES[selectedMattress].name}  />
          </div>
          <div className="col-sm-6 col-xs-12 selection-container">
            <div className="section-header" >Choose Your Mattress</div>
            <div className="mattress-options" >
              <div className="list-label">Select Mattress Type</div>
              <div className="button-list">
                { Object.entries(MATTRESSES).map((mattress) => 
                  <button type="button" className={selectedMattress === mattress[0] ? "btn primary-button active" : "btn primary-button"} onClick={() => this.selectActiveMattress(mattress[0])}>{mattress[1].name}</button>
                )}
              </div>
              <div className="mattress-details">
                  <div>{MATTRESSES[selectedMattress].name}</div><div className="mattress-price">${MATTRESSES[selectedMattress].price.toLocaleString('en')}</div>
              </div>
            </div>
            <div>
              <button type="button" className="btn primary-button gold-button" onClick={() => this.addMattressToCart(activeMattress)}>Add to Cart</button>
              <div>Buying: {shoppingCart.length}</div> 
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;