import React from 'react'
import css from './calculator.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      display: 0,
      currentNumber: '',
      operator: '',
      storedResult: 0
    }

    this.handleInputChange1 = this.handleInputChange.bind(this, 'input1')
    this.handleInputChange2 = this.handleInputChange.bind(this, 'input2')
    this.handleSumButton = this.handleSumButton.bind(this)
    this.handleSubButton = this.handleSubButton.bind(this)
    this.handleMultiplyButton = this.handleMultiplyButton.bind(this)
    this.handleEqualsButton = this.handleEqualsButton.bind(this)
    this.handleClearButton = this.handleClearButton.bind(this)
  }

  sum (a = 0, b = 0) {
    // return this.state.input1 + this.state.input2
    return a + b
  }

  multiply (a ,b) {
    return a * b
  }

  substract (a ,b) {
    return a - b
  }

  handleInputChange(which, event) {
    const val = parseInt(event.target.value, 10)
    this.setState({
      [which]: val
    })
  }

  handleSumButton(event) {
    // valor nuevo
    const currentNumber = this.state.currentNumber * 1
    const operator = this.state.operator

    const storedResult = this.state.storedResult
    const newResult = this.sum(storedResult, currentNumber)

    if ((newResult + '').length > 9) {
      this.setState({
        display: 'ERROR',
        storedResult: 0,
        currentNumber: '',
        operator: ''
      })
      return
    }

    if (operator === '') {
      this.setState({
        display: newResult,
        storedResult: newResult,
        currentNumber: '',
        operator: '+'
      })
    } else if (operator === '+') {
      this.setState({
        display: newResult,
        storedResult: newResult,
        currentNumber: ''
      })
    } else if (operator === '-') {
      const res = this.substract(storedResult, currentNumber)
      this.setState({
        display: res,
        storedResult: res,
        operator: '+',
        currentNumber: ''
      })
    } else if (operator === '*') {
      const res = this.multiply(storedResult, currentNumber)
      this.setState({
        display: res,
        storedResult: res,
        operator: '+',
        currentNumber: ''
      })
    }
  }

  handleSubButton(event) {
    const currentNumber = this.state.currentNumber * 1
    const operator = this.state.operator

    const storedResult = this.state.storedResult
    const newResult = this.substract(storedResult, currentNumber)

    if (newResult < 0 && storedResult > 0) {
      this.setState({
        display: 'ERROR',
        storedResult: 0,
        currentNumber: '',
        operator: ''
      })
      return
    }

    if (operator === '') {
      this.setState({
        storedResult: storedResult > 0 ? newResult : currentNumber,
        currentNumber: '',
        operator: '-'
      })
    } else if (operator === '-') {
      this.setState({
        display: newResult,
        storedResult: newResult,
        currentNumber: ''
      })
    } else if (operator === '+') {
      const res = this.sum(storedResult, currentNumber)
      this.setState({
        display: res,
        storedResult: res,
        operator: '-',
        currentNumber: ''
      })
    }
  }

  handleMultiplyButton(event) {
    // valor nuevo
    const currentNumber = this.state.currentNumber * 1
    const operator = this.state.operator

    const storedResult = this.state.storedResult
    const newResult = this.multiply(storedResult, currentNumber)

    if ((newResult + '').length > 9) {
      this.setState({
        display: 'ERROR',
        storedResult: 0,
        currentNumber: '',
        operator: ''
      })
      return
    }

    if (operator === '') {
      if (currentNumber != 0) {
        console.log('paso' + currentNumber)
        this.setState({
          storedResult: storedResult > 0 ? newResult : currentNumber,
          currentNumber: '',
          operator: '*'
        })
      } else {
        this.setState({
          currentNumber: '',
          operator: '*'
        })
      }
      
    } else if (operator === '*') {
      this.setState({
        display: newResult,
        storedResult: newResult,
        currentNumber: ''
      })
    } else if (operator === '-') {
      const res = this.substract(storedResult, currentNumber)
      this.setState({
        display: res,
        storedResult: res,
        operator: '*',
        currentNumber: ''
      })
    } else if (operator === '+') {
      const res = this.sum(storedResult, currentNumber)
      this.setState({
        display: res,
        storedResult: res,
        operator: '*',
        currentNumber: ''
      })
    }
  }

  handleEqualsButton(event) {
    const operator = this.state.operator
    const a = this.state.currentNumber * 1
    const b = this.state.storedResult * 1
    let result = 0

    if (operator === '+') {
      result = this.sum(a,b)
    } else if (operator === '-') {
      result = this.substract(b,a)
    } else if (operator === '*') {
      result = this.multiply(a,b)
    } else {
      return
    }

    if ((result + '').length > 9 || result < 0) {
      this.setState({
        display: 'ERROR',
        storedResult: 0,
        currentNumber: '',
        operator: ''
      })
      return
    }

    this.setState({
      display: result,
      storedResult: result,
      currentNumber: '',
      operator: ''
    })
  }

  handleClearButton(event) {
    this.setState({
      display: 0,
      currentNumber: '',
      operator: '',
      storedResult: 0
    })
  }

  handleNumber(value) {
    let currentNumber = this.state.currentNumber + '' + value
    if (currentNumber == 0) {
      // do nothing
    } else if (currentNumber.length > 9) {
      // do nothing
    }
    else {
      this.setState({
        currentNumber,
        display: currentNumber
      })
    }
    
    console.log(currentNumber)
  }

  render() {
    return (
      <div className="calculator">
        <div className="display">{this.state.display}</div>
        <div className="keyboard">
          <div className="operations">
            <button onClick={this.handleSumButton}>+</button>
            <button onClick={this.handleSubButton}>-</button>
            <button onClick={this.handleMultiplyButton}>*</button>
          </div>
          
          <div className="numbers">
            <button onClick={() => {this.handleNumber(1)}}>1</button>
            <button onClick={() => {this.handleNumber(2)}}>2</button>
            <button onClick={() => {this.handleNumber(3)}}>3</button>
            <button onClick={() => {this.handleNumber(4)}}>4</button>
            <button onClick={() => {this.handleNumber(5)}}>5</button>
            <button onClick={() => {this.handleNumber(6)}}>6</button>
            <button onClick={() => {this.handleNumber(7)}}>7</button>
            <button onClick={() => {this.handleNumber(8)}}>8</button>
            <button onClick={() => {this.handleNumber(9)}}>9</button>
            <button onClick={this.handleClearButton} id='clear_btn'>C</button>
            <button onClick={() => {this.handleNumber(0)}}>0</button>
            <button onClick={this.handleEqualsButton} id='equal_btn'>=</button>
          </div>
        </div>
        
        
        <br />
      </div>
    )
  }
}
