import PageHeader from "./common/pageHeader";
import React, { Component } from "react";
// import cardService from "../services/cardsService";

class MyCards extends Component {
  state = {
    cards: [],
  };

  render() {
    const { user } = this.props;
    const { cards } = this.state;
    return (
      <div className="container mb-4">
        <PageHeader title={<>My Cards page</>} />
        <div className="row">
          <div className="col-12">
            <p>Those are Your cards...</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MyCards;
