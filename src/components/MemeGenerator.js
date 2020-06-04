import React from "react";

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImages: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    const { memes } = data.data;
    this.setState({ allMemeImages: memes });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const randomIndex = Math.floor(
      Math.random() * this.state.allMemeImages.length
    );
    this.setState({ randomImage: this.state.allMemeImages[randomIndex].url });
  }

  render() {
    return (
      <main>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            name="topText"
            value={this.state.topText}
            placeholder="Top Text"
            onChange={this.handleChange}
          />
          <input
            name="bottomText"
            value={this.state.bottomText}
            placeholder="Bottom Text"
            onChange={this.handleChange}
          />
          <button>Gen</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImage} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </main>
    );
  }
}

export default MemeGenerator;
