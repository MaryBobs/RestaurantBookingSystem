import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ExistingCustomers from '../component/newBookingComponents/ExistingCustomers';
import NewCustomerForm from '../component/newBookingComponents/NewCustomerForm';
import NewBookingForm from '../component/newBookingComponents/NewBookingForm';
import Request from '../helpers/request';

class NewBookingBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            customers: [],
            bookingCustomer: ""
        }

        this.handlePost = this.handlePost.bind(this);
        this.handleNewBooking = this.handleNewBooking.bind(this);
        this.handleCustomer = this.handleCustomer.bind(this);
    }

    componentDidMount(){
        const request = new Request();

        request.get('http://localhost:8080/customers')
        .then((data) => {
            this.setState({customers: data._embedded.customers})
        })
    }

    handlePost(customer) {
        const request = new Request();
        request.post('http://localhost:8080/customers', customer)
        .then((customer) => {
            console.log(customer)
            this.setState({bookingCustomer: customer.id})
        })
        // .then(() => {
        //     window.location = '/newbooking'
        // })
    }

    handleNewBooking(booking) {
        const request = new Request();
        request.post('http://localhost:8080/bookings', booking).then(() => {
            window.location = '/'
        })
    }

    handleCustomer(customer) {
        this.setState({bookingCustomer: customer})
    }

    render () {
        return (
            <div>
            <h1>New Booking</h1>
            <ExistingCustomers customers={this.state.customers} handleSelectedCustomer={this.handleCustomer}/>
            <NewCustomerForm addCustomer={this.handlePost}/>
            <NewBookingForm addBooking={this.handleNewBooking} bookedCustomer={this.state.bookingCustomer}/>
            </div>
        )
    }
}

export default NewBookingBox;