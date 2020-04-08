import React from 'react';

const numerals = [];

for(let i = 0; i < 10; i++){
  numerals[i] = i;
}

const Numerals = props => (
  <ul className="numerals-list">
    {numerals.map(numeral => (
      <Numeral
        className={`N-${numeral}`}
        digit={numeral}
        numeralSelect={props.numeralSelect}
        key={`N-${numeral}`}
      />
    ))}
  </ul>
);

const Numeral = props => (
  <li className={`numeral ${props.digit}`} onClick={() => props.numeralSelect(props.digit)}>
    {props.digit}
  </li>
);

export default Numerals;
export { Numeral };