import React from 'react';

const MathFlashCard = props => {

  return(
    <div className="flash-card" data-operation={props.current_operation}>
      <div className="a">{props.current_card.a}</div>
      <div className="b">{props.current_card.b}</div>
    </div>
  );

};

export default MathFlashCard;