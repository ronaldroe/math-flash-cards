import React, { Component } from 'react';

import './scss/Global.scss';

import FlashCard from './Components/Card';
import Numerals from './Components/Numerals/Numerals';
import AnswerBlock from './Components/AnswerBlock';
import { shuffle } from './Functions';

class App extends Component {

  constructor(){

    super();

    this.state = {
      cards: [],
      current_card: {a: 0, b: 0, answer: 0, index: 0},
      current_answer: '',
      current_index: 0,
      status: '',
      menu_open: false
    };

  }
  
  componentDidMount(){

    // Temporary, to set up the multiplication game. Need to expand later
    let temp_cards = [];

    let big_index = 0;

    for(let i = 0; i < 11; i++){

      for(let j = 0; j < 11; j++){

        temp_cards.push({
          a: i,
          b: j,
          answer: i * j,
          index: big_index
        });

        big_index++;

      }

    }

    this.setState({cards: temp_cards});

    if(localStorage.getItem('prev_card')){

      let prev_card = JSON.parse(localStorage.getItem('prev_card'));

      this.setState({
        current_card: prev_card,
        current_index: prev_card.index
      });

    } else {
      localStorage.setItem('prev_card', JSON.stringify(this.state.current_card));
    }

  }
  
  render(){
    return (
      <>
        <header>
          <h1>X Flash Cards</h1>
          <div className="button" onClick={this.toggle_menu}>&#9776;</div>
        </header>
        <main>
          <FlashCard current_card={this.state.current_card} />
          
          <AnswerBlock
            current_card={this.state.current_card}
            current_answer={this.state.current_answer}
            update_answer={this.update_answer}
            delete_answer={this.delete_answer}
            submit_answer={this.submit_answer}
          />

          <Numerals numeralSelect={this.numeralSelect} />
          <div className={`controls_outer ${this.state.menu_open ? 'open' : ''}`} onClick={this.toggle_menu}>
          	<div className="controls">
          	  <div className="button" onClick={this.reset_game}>Start Over</div>
          	  <div className="button" onClick={this.randomize}>Randomize</div>
          	</div>
          </div>
        </main>
      </>
    );
  }
  
  numeralSelect = num_in => {

    if(this.state.current_answer.length < this.state.current_card.answer.toString().length){
      this.setState(prevState => (
        {
          current_answer: `${prevState.current_answer !== '0' ? prevState.current_answer : ''}${num_in}`
        }
      ));
    } else {
      this.setState({current_answer: `${num_in}`});
    }

  };

  update_answer = data => {
    this.setState({current_answer: `${data.target.value}`})
  };

  delete_answer = () => {
    this.setState({current_answer: ''});
  };

  check_answer = () => (
    parseInt(this.state.current_answer, 10) === this.state.current_card.answer
  );

  submit_answer = () => {

    if(this.check_answer()){

      localStorage.setItem('prev_card', JSON.stringify(this.state.cards[this.state.current_card.index + 1]));
      
      this.setState(prevState => ({
        current_index: prevState.current_index <= prevState.cards.length ? prevState.current_index + 1 : 0,
        current_answer: '',
        status: 'correct',
        current_card: prevState.cards[prevState.current_index + 1]
      }));

      window.setTimeout(() => this.setState({status: ''}), 2000);
      
    } else {

      this.setState({status: 'incorrect'});

      window.setTimeout(() => this.setState({status: ''}), 2000);

    }

  };

  reset_game = () => {

    this.setState(prevState => ({
      current_card: this.state.cards[0],
      current_answer: '',
      current_index: 0,
      status: ''
    }));

    localStorage.removeItem('prev_card');

  }

  randomize = () => {

    this.setState(prevState => ({
      cards: shuffle(prevState.cards),
      current_index: 0
    }), 
      () => this.setState({current_card: this.state.cards[0]}));

  }

  toggle_menu = () => {
    this.setState(prevState => ({menu_open: !prevState.menu_open}));
  }
  
};

export default App;
