import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

//import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../providers/rest-api/rest-api'
import { NgForm } from '@angular/forms';

import { Bank } from '../wallet/bank/bank'

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {
	bal: any = 0;
	walletTxn: Array<{}>;

  constructor(public navCtrl: NavController,
  		//private storage: Storage,
  		private qrScanner: QRScanner,
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
			let userData = this.navParams.data.userData;
			this.bal = this.apiService.getData('http://staging.exol.in/wallet/api/wallet-detail/' + userData.user_id + '/')
				.subscribe(data => {
					if(data.amount){
					this.bal = data.amount
					}
				}),
              	error => {this.presentToast('Error Fetching Data...');
              	};
            this.apiService.getData('http://staging.exol.in/wallet/api/wallet-transaction/' + userData.user_id + '/')
				.subscribe(data => {this.walletTxn = data;
				console.log('txn', data);
				}), 
              	error => this.presentToast('Error Fetching Data...');
			};

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
