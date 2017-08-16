import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../providers/rest-api/rest-api'
import { NgForm } from '@angular/forms';
import { Cart } from '../cart/cart';


@Component({
  templateUrl: 'products.html'
})
export class ProductList {

  custData: any;
  flag: Boolean = false;
  cart: any;
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
    if(this.cart){
      this.flag = true;
    }
  }
    
  loadData(){
		console.log('wallet',this.navParams.data);
			let userData = this.navParams.data.userData
			this.custData = this.apiService.getData('http://staging.exol.in/cart/api/place-order/' + userData.user_id + '/')
				.subscribe(data => {
					this.custData = data;
				}),
        	error => {this.presentToast('Error Fetching Customer Data...');
        	};
       this.apiService.getData('http://staging.exol.in/cart/api/product-list/' + userData.user_id + '/')
        .subscribe(data => {
          console.log('prouct', data)
          this.productList = data;
        }),
          error => {this.presentToast('Error Fetching Product List...');
          };

  			};

  createCart(){
       let body = {'user_id':this.navParams.data.userData.user_id, 'disabled':'True'}
        this.apiService.postData('http://staging.exol.in/cart/api/create-cart/', body)
          .subscribe(data => {
            console.log('cart', data)
            this.cart = data;
          }),
          error => {this.presentToast('Error Fetching Data...');
          };
  }

  addItem(item, qty){
    console.log('additem', item.sr_no, qty);
    if (this.flag == false){
      
      let body = {'user_id':this.navParams.data.userData.user_id, 'disabled':'True'}
        this.apiService.postData('http://staging.exol.in/cart/api/create-cart/', body)
          .subscribe(data => {
            console.log('cart', data)
            this.cart = data;

            let body = {'item':item.sr_no, 'qty':qty, 'c_id':this.custData.id}
            this.apiService.postData('http://staging.exol.in/cart/api/cart-detail/' + this.cart.id + '/', body)
              .subscribe(data => {
                console.log('addcart', data)
                this.cart = data;
                this.presentToast('Product Added to Cart');
              }),
                error => {this.presentToast('Error Fetching Data...');
                };

          }),
          error => {this.presentToast('Error Fetching Data...');
          };

      this.flag = true;
    }
    else{
       let body = {'item':item.sr_no, 'qty':qty, 'c_id':this.custData.id}
        this.apiService.postData('http://staging.exol.in/cart/api/cart-detail/' + this.cart.id + '/', body)
          .subscribe(data => {
            console.log('addcart', data)
            this.cart = data;
            this.presentToast('Product Added to Cart');
          }),
            error => {this.presentToast('Error Fetching Data...');
            };      
    }
  }

  gotoCart(){
    console.log('clicked');
    this.navCtrl.push(Cart, {'cart':this.cart, 'userData':this.navParams.data.userData, 'custData':this.custData})
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