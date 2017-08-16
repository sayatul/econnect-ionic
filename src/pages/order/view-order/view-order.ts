import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../../providers/rest-api/rest-api'
import { ProductList } from '../../products/products';
import { CartItem } from '../cart-items/cart-items';
import { NgForm } from '@angular/forms';

import { Bank } from '../../wallet/bank/bank'



@Component({
  templateUrl: 'view-order.html'
})
export class ViewOrder {
  //orderList = [];
  orderList: Array<{}>;

  constructor(public navCtrl: NavController,
  		//private storage: Storage,
  		private navParams: NavParams,
  		public loadingCtrl: LoadingController,
  		private apiService : RestApiProvider,
  		public toastCtrl: ToastController,
  		private alertCtrl: AlertController
  	) {
  	this.loadData();
  }
    loadData(){
		console.log('wallet',this.navParams.data);
			let userData = this.navParams.data.userData
			this.apiService.getData('http://staging.exol.in/order/api/check-order/' + userData.user_id + '/')
				.subscribe(data => {
					this.orderList = data;
				}),
      	error => {this.presentToast('Error Fetching Data...');
      	};
			};


    cartItems(cart){
      this.navCtrl.push(CartItem, cart)
    }


    presentLoading() {
        let loader = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 800
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