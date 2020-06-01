import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExpense extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeTotalPrice = this.onChangeTotalPrice.bind(this);
    this.onChangePaymentMethod = this.onChangePaymentMethod.bind(this);
    this.onChangeTxType = this.onChangeTxType.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      quantity: 0,
      totalPrice: '',
      paymentMethod: '',
      txType: '',
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3061/expense/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          quantity: response.data.quantity,
          totalPrice: response.data.totalPrice,
          paymentMethod: response.data.paymentMethod,
          txType: response.data.txType,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:3061/user/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value
    })
  }

  onChangeTotalPrice(e){
    this.setState({
      totalPrice: e.target.value
    })
  }

  onChangePaymentMethod(e){
    this.setState({
      paymentMethod: e.target.value
    })
  }

  onChangeTxType(e){
    this.setState({
      txType: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const expense = {
      username: this.state.username,
      description: this.state.description,
      quantity: this.state.quantity,
      totalPrice: this.state.totalPrice,
      paymentMethod: this.state.paymentMethod,
      txType: this.state.txType,
      date: this.state.date
    }

    console.log(expense);

    axios.post('http://localhost:3061/expense/update/' + this.props.match.params.id, expense)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Expense Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Quantity (in nos.): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.quantity}
              onChange={this.onChangeQuantity}
              />
        </div>
        <div className="form-group">
          <label>Total Price: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.totalPrice}
              onChange={this.onChangeTotalPrice}
              />
        </div>
        <div className="form-group">
          <label>Payment Method (CASH/GOOGLEPAY/PAYTM/CARD): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.paymentMethod}
              onChange={this.onChangePaymentMethod}
              />
        </div>
        <div className="form-group">
          <label>Transaction Type (credit / debit): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.txType}
              onChange={this.onChangeTxType}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Expense Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}