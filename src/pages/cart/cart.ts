import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../providers/rest-api/rest-api'
import { NgForm } from '@angular/forms';


@Component({
  templateUrl: 'cart.html'
})
export class Cart {

  custData: any;
  cart: any;
  cartItems: Array<{}>;
  productList: Array<{}>;

  constructor(public navCtrl: NavController,
  		private storage: Storage,
  		private navParams: NavParams,
  		public loadingCtrl: LoadingController,
  		private apiService : RestApiProvider,
  		public toastCtrl: ToastController,
  		private alertCtrl: AlertController
  	) {
  	this.loadData();
  }
    
  loadData(){
		console.log('cart',this.navParams.data);
      this.cart = this.navParams.data.cart;
			this.custData = this.navParams.data.custData;
      this.apiService.getData('http://staging.exol.in/cart/api/cart-item/' + this.cart.id + '/')
        .subscribe(data => {
          console.log('cartitems', data)
          this.cartItems = data;
        }),
          error => {this.presentToast('Error Fetching Data...');
          };
  			};


  deleteItem(item){
    console.log('additem', item.sr_no);
      let body = {'item':item.sr_no, 'delete':'True', 'c_id':this.custData.id}
      this.apiService.postData('http://staging.exol.in/cart/api/cart-detail/' + this.cart.id + '/', body)
        .subscribe(data => {
          console.log('addcart', data)
          this.cart = data;
        }),
          error => {this.presentToast('Error Fetching Data...');
          };
  }

  updateItem(item, qty){
   console.log('additem', item.sr_no, qty);
      let body = {'item':item.sr_no, 'qty':qty, 'c_id':this.custData.id}
      this.apiService.postData('http://staging.exol.in/cart/api/cart-detail/' + this.cart.id + '/', body)
        .subscribe(data => {
          console.log('addcart', data)
          this.cart = data;
        }),
          error => {this.presentToast('Error Fetching Data...');
          }; 
  }

  goBack(){
    this.navCtrl.pop();
  }

  presentLoading(time) {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: time
      }).present();
    }

  presentAlert( title , msg) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Ok']
    });
    alert.present();
  }

  presentToast(msg) {
      this.toastCtrl.create({
        message: msg,
        duration: 3000
      }).present();
  }
}