import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

//import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../providers/rest-api/rest-api'
import { NgForm } from '@angular/forms';

import { Bank } from '../wallet/bank/bank'

@Component({
  templateUrl: 'coupon.html'
})
export class Coupon {
	bal: any = 0;
	scanText: any;

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
			};

	submitForm(form: NgForm){
		this.presentLoading();
		let body = {'mobile':form.value.mobile, 'code':form.value.code, 'user_id':this.navParams.data.userData.user_id}
	this.apiService.postData('http://staging.exol.in/coupon/api/redeem-coupon/', body)
	    .subscribe(data => {  
	    	this.loadData();  
	        this.presentAlert('Successful', data.msg);
	    },
	    error => { if(error.status == 400){
	      console.log("coupon",error._body);
	    	this.presentAlert('Response', JSON.parse(error._body).msg);
	    }
	    else{
	      this.presentToast('Error fetching data...');
	    }
	    });
	}

	scan(){
		this.qrScanner.prepare()
		  .then((status: QRScannerStatus) => {
		     if (status.authorized) {
		       // camera permission was granted

		       // start scanning
		       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
		         console.log('Scanned something', text);
		         this.scanText = text;

		         this.qrScanner.hide(); // hide camera preview
		         scanSub.unsubscribe(); // stop scanning
		       });

		       // show camera preview
		       this.qrScanner.show();

		       // wait for user to scan something, then the observable callback will be called

		     } else if (status.denied) {
		       this.presentToast('Camera Permission Denied!');

		     } else {
		       // permission was denied, but not permanently. You can ask for permission again at a later time.
		     	this.presentToast('Try Again...');
		     }
		  })
		  .catch((e: any) => {console.log('Error is', e);
		  		this.presentAlert('Error',e)

		});
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
