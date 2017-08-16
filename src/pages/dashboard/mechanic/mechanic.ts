import { Component } from '@angular/core';
import { NavController, MenuController, NavParams, ToastController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';

import { WalletPage } from '../../wallet/wallet';
import { Coupon } from '../../coupon/coupon';
import { MechProfile } from '../../profile/mechanic/profile';
import { BikeRec } from '../../oil-recommendation/bike/bike';
import { CarRec } from '../../oil-recommendation/car/car';
//import { RestApiProvider } from '../../../providers/rest-api/rest-api';

@Component({
  selector: 'page-mechanic',
  templateUrl: 'mechanic.html'
})
export class Mechanic {
  
  data: any;

  	constructor(private navCtrl: NavController,
		private navParams: NavParams, 
		//private storage: Storage,
		private menuCtrl: MenuController,
		//private apiService : RestApiProvider,
		public toastCtrl: ToastController
   	){	
  		this.loadData();
  	}

	loadData(){
		this.data = this.navParams.data.userData;
		console.log('mechanic',this.navParams.data);
		
	}

	bikeRemd(){
		this.navCtrl.push(BikeRec);
	}

	carRemd(){
		this.navCtrl.push(CarRec);
	}

	gotoProfile(){
		this.navCtrl.push(MechProfile, this.navParams.data);		
	}

	gotoWallet(){
		this.navCtrl.push(WalletPage, this.navParams.data);	
	}

	redeemCoupon(){
		this.navCtrl.push(Coupon, this.navParams.data)
	}

	presentToast() {
    	this.toastCtrl.create({
	    	message: 'You were successfully SignedIn',
	    	duration: 3000
	    }).present();
	}

	

}
