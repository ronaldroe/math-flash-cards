import React from 'react';

const FlashCard = props => {

  return(
    <div className="flash-card">
      <div className="a">{props.current_card.a}</div>
      <div className="b">{props.current_card.b}</div>
    </div>
  );

};

export default FlashCard;