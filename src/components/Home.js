import React, { Component } from "react";

class Home extends Component {
  state = {
    roman: "",
    number: "",
    readonly: false,
    error: ""
  };

  fromRoman(e) {
    this.setState({ roman: e.target.value.toUpperCase(), error: "" });
    let romanNumber = e.target.value.toUpperCase();

    //pattern to identify three consecutive identical characters
    let pattern = /([a-z\d])\1\1\1/gi;
    //patter to identify more than one V
    let patternForV = /([v\d])\1/gi;
    //pattern to identify more than one D
    let patternForD = /([d\d])\1/gi;
    //pattern to identify more than one L
    let patternForL = /([l\d])\1/gi;

    let positionOfC = romanNumber.indexOf("C");
    let positionOfM = romanNumber.indexOf("M");
    let positionOfL = romanNumber.indexOf("L");

    //checking if C.M,L is preceded by X
    if (positionOfC === 1 || positionOfM === 1 || positionOfL === 1) {
      let check =
        romanNumber.charAt(positionOfC - 1) === "X" ||
        romanNumber.charAt(positionOfL - 1) === "X" ||
        romanNumber.charAt(positionOfM - 1) === "X";
      if (!check) {
        this.setState({
          roman: "",
          number: "",
          error: "Can't type that..Retype"
        });
        return false;
      }
    }

    //checking for repition of L and D
    if (patternForD.test(romanNumber) || patternForL.test(romanNumber)) {
      this.setState({
        roman: "",
        number: "",
        error: "L and D only appear once..Retype"
      });
      return false;
    }
    //checking for V and more than three repition of same character
    if (pattern.test(romanNumber) || patternForV.test(romanNumber)) {
      this.setState({
        roman: "",
        number: "",
        error: "That's not valid..Retype"
      });
      return false;
    } else {
      this.setState({ readonly: false });
    }

    let result = 0;
    if (romanNumber == null) {
      result = 0;
    }
    let myMap = new Map();
    myMap.set("I", 1);
    myMap.set("V", 5);
    myMap.set("X", 10);
    myMap.set("L", 50);
    myMap.set("C", 100);
    myMap.set("D", 500);
    myMap.set("M", 1000);

    let len = romanNumber.length;
    for (let i = 0; i < len; i++) {
      if (
        myMap.get(romanNumber.charAt(i)) < myMap.get(romanNumber.charAt(i + 1))
      ) {
        result -= myMap.get(romanNumber.charAt(i));
      } else {
        // if (
        //   myMap.get(romanNumber.charAt(i + 1)) <
        //   myMap.get(romanNumber.charAt(i + 2))
        // ) {
        //   this.setState({ roman: "", number: "" });
        //   return false;
        // }
        result += myMap.get(romanNumber.charAt(i));
      }
    }
    console.log("result:-------", result);
    if (/\D/gi.test(result)) {
      this.setState({
        roman: "",
        number: "",
        error: "Only alphabets please..Retype"
      });
      return false;
    }

    this.setState({ number: result });
  }

  toRoman(e) {
    let typedValue = e.target.value;

    //checking for non-digit value as input
    if (/\D/gi.test(typedValue)) {
      this.setState({
        roman: "",
        number: "",
        error: "Ooopsie...Only numbers please..Retype"
      });
      return false;
    }

    if (typedValue > 3999) {
      return false;
    }
    this.setState({ number: e.target.value, error: "" });

    let numberArr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let romanArr = [
      "M",
      "CM",
      "D",
      "CD",
      "C",
      "XC",
      "L",
      "XL",
      "X",
      "IX",
      "V",
      "IV",
      "I"
    ];
    let result = [];

    const findChar = e => {
      return e <= typedValue;
    };

    while (typedValue > 0) {
      let nextLargestNumber = numberArr.find(findChar);

      result.push(romanArr[numberArr.indexOf(nextLargestNumber)]);
      typedValue -= nextLargestNumber;
    }
    let finalResult = result.join("");
    console.log("finalResult:-", finalResult);
    this.setState({ roman: finalResult });
  }
  render() {
    return (
      <div className='app-container'>
        <h3 className='heading'>Roman Numerals Converter</h3>
        <div className='body-container'>
          <div className='number-container'>
            <label>Number -></label>
            <input
              type='text'
              placeholder='Enter Number'
              value={this.state.number}
              onChange={e => this.toRoman(e)}
            />
          </div>
          <div className='roman-container'>
            <label>Roman -></label>
            <input
              type='text'
              placeholder='Enter Roman Numeral'
              value={this.state.roman}
              onChange={e => this.fromRoman(e)}
            />
          </div>
        </div>
        <label className='err'>{this.state.error}</label>
      </div>
    );
  }
}

export default Home;
