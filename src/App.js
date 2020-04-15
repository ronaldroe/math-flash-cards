import React, { Component } from 'react';

import './scss/Global.scss';

import MathFlashCard from './Components/Card';
import Numerals from './Components/Numerals/Numerals';
import AnswerBlock from './Components/AnswerBlock';
import { shuffle } from './Functions';

class App extends Component {

  constructor(){

    super();

    this.state = {
      cards: [],
      current_operation: 'x',
      current_card: {a: 0, b: 0, answer: 0, index: 0},
      current_answer: '',
      current_index: 0,
      status: '',
      menu_open: false
    };

  }
  
  componentDidMount(){

    this.build_decks();

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
          <h1>Math Flash Cards</h1>
          <div className="button" onClick={this.toggle_menu}>&#9776;</div>
        </header>
        <main>
          <MathFlashCard current_card={this.state.current_card} current_operation={this.state.current_operation} />
          
          <AnswerBlock
            current_card={this.state.current_card}
            current_answer={this.state.current_answer}
            update_answer={this.update_answer}
            delete_answer={this.delete_answer}
            submit_answer={this.submit_answer}
            status={this.state.status}
          />

          <Numerals numeralSelect={this.numeralSelect} />
          <div className={`controls_outer ${this.state.menu_open ? 'open' : ''}`} onClick={this.toggle_menu}>
          	<div className="controls">
          	  <div className="button" onClick={this.reset_game}>Start Over</div>
          	  <div className="button" onClick={this.randomize}>Randomize</div>
          	  <div className="button operation" onClick={() => this.change_operation('x')}>x</div>
          	  <div className="button operation" onClick={() => this.change_operation('÷')}>÷</div>
          	  <div className="button operation" onClick={() => this.change_operation('+')}>+</div>
          	  <div className="button operation" onClick={() => this.change_operation('-')}>-</div>
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

      localStorage.setItem('prev_card', JSON.stringify(this.state.cards[this.state.current_index + 1 < this.state.cards.length ? this.state.current_index + 1 : 0]));
      
      this.setState(prevState => ({
        current_index: prevState.current_index < prevState.cards.length - 1 ? prevState.current_index + 1 : 0,
        current_answer: '',
        status: 'correct',
        current_card: prevState.cards[prevState.current_index < prevState.cards.length - 1 ? prevState.current_index + 1 : 0]
      }));

      window.setTimeout(() => this.setState({status: ''}), 750);
      
    } else {

      this.setState({status: 'incorrect'});

      window.setTimeout(() => this.setState({status: ''}), 1250);

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

  build_decks = () => {

    // Temporary, to set up the multiplication game. Need to expand later
    let mult_cards = [];
    let plus_cards = [];
    let sub_cards = [];
    let div_cards = [];

    let big_index = 0;

    for(let i = 0; i < 11; i++){

      for(let j = 0; j < 11; j++){

        mult_cards.push({
          a: i,
          b: j,
          answer: i * j,
          index: big_index
        });

        plus_cards.push({
          a: i,
          b: j,
          answer: i + j,
          index: big_index
        });

        if(i >= j){

          sub_cards.push({
            a: i,
            b: j,
            answer: i - j,
            index: big_index
          });

        }

        if(i % j === 0){

          div_cards.push({
            a: i,
            b: j,
            answer: i / j,
            index: big_index
          });

        }

        big_index++;

      }

    }

    this.setState({
      cards: mult_cards,
      mult_cards: mult_cards,
      plus_cards: plus_cards,
      sub_cards: sub_cards,
      div_cards: div_cards,
    });
    
  }

  change_operation = new_op => {

    let new_cards;

    switch (new_op){
      case '+':
        new_cards = this.state.plus_cards
        break;
      case '-':
        new_cards = this.state.sub_cards
        break;
      case '÷':
        new_cards = this.state.div_cards
        break;
      default:
        new_cards = this.state.mult_cards
    }

    this.setState({cards: new_cards, current_operation: new_op, current_index: 0, current_card: new_cards[0]});
    localStorage.setItem('prev_card', JSON.stringify(new_cards[0]));
    localStorage.setItem('operation', new_op);

  }
  
};

export default App;
