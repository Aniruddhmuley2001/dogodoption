import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0,
  };

  // Takes in some properties, filters it and then passes it on to the component
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  // Whenever function is passed to children or event listener done, use arrow function
  // To prevent the anomaly of 'this' keyword
  // Event listeners not going to create new context
  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
      // + added to convert string to number
    });
  };

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // The below comment is functional, and not redundant

            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal-thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
