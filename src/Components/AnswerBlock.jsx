import React from 'react';

const AnswerBlock = props => {

  return(
    <aside className="answer-block">
      <div className="answer">{props.current_answer}</div>
      <div className="button go" onClick={props.submit_answer}><span role="img">&#10151;</span></div>
      <div className="button" onClick={props.delete_answer}><span role="img">&#10060;</span></div>
    </aside>
  );

};

export default AnswerBlock;