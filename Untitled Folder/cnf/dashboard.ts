import { Component } from '@angular/core';
import { NavController, MenuController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { OrderPage } from '../order/order';
import { CustomerPage } from '../customer/customer';
import { WalletPage } from '../wallet/wallet';

@Component({
  selector: 'page-home',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  walletPage = WalletPage;
  orderPage = OrderPage;
  data: any

  	constructor(private navCtrl: NavController,
		private navParams: NavParams, 
		private storage: Storage,
		private menuCtrl: MenuController,
		public toastCtrl: ToastController
   	){	
  		this.loadData();
  	}

	loadData(){
		if(this.navParams.data == 'success'){
			this.presentToast();
		}
		this.data = this.storage.get('userData')
			.then((val) => {this.data = val, console.log(this.data)}
   		);
		console.log(this.navParams.data);

	}

	presentToast() {
    	this.toastCtrl.create({
	    	message: 'You were successfully SignedIn',
	    	duration: 3000
	    }).present();
	}

}
