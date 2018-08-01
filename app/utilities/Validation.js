import React from 'react';
import ValidationComponent from 'react-native-form-validator';

export default class MyForm extends ValidationComponent {
  constructor(props) {
  super(props);
  this.state = {name : "My name", email: "titi@gmail.com", number:"56"};
}

_onSubmit() {
  // Call ValidationComponent validate method
  this.validate({
    name: {minlength:3, maxlength:7, required: true},
    email: {email: true},
    number: {numbers: true}
  });
}
}
