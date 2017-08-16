import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddCustomerPage } from '../customer/addcustomer/addcustomer'


@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {

  addCustomerPage = AddCustomerPage
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
  }

}
