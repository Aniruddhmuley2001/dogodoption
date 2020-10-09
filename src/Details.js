import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';
import {navigate} from '@reach/router';
import Modal from './Modal';

// Use of Class Components
class Details extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       loading: true,
  //     };
  //   }

  //   Replacing the above piece of code by the below line
  state = { loading: true, showModal: false };

  componentDidMount() {
    // throw new Error('sorry');
    // Above line to throw error (testing purposes)
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        url: animal.url,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }

  toggleModal = () => this.setState({showModal: !this.state.showModal})
  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    const { animal, breed, location, description, media, name, showModal } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{backgroundColor: theme}} onClick={this.toggleModal} >Adopt {name}</button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {
            showModal ? (
              <Modal>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No, sorry!</button>
                </div>
              </Modal>
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  )
}
