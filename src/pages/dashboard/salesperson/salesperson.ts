import { Component } from '@angular/core';
import { NavController, MenuController, NavParams, ToastController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';

import { ViewOrder } from '../../order/view-order/view-order';
import { WalletPage } from '../../wallet/wallet';
import { SalesProfile } from '../../profile/salesperson/profile';
import { BikeRec } from '../../oil-recommendation/bike/bike';
import { CarRec } from '../../oil-recommendation/car/car';
import { RestApiProvider } from '../../../providers/rest-api/rest-api';
import { ProductList } from '../../products/products';


@Component({
  selector: 'page-sales',
  templateUrl: 'salesperson.html'
})
export class Salesperson {
  
  data: any;
  custData: any;

  	constructor(private navCtrl: NavController,
		private navParams: NavParams, 
		//private storage: Storage,
		private menuCtrl: MenuController,
		private apiService : RestApiProvider,
		public toastCtrl: ToastController
   	){	
  		this.loadData();
  		this.presentToast('You were successfully SignedIn');
  	}

	loadData(){
		this.data = this.navParams.data.userData;
		console.log('salesperson',this.navParams.data);
		let userData = this.navParams.data.userData;
		this.custData = this.apiService.getData('http://staging.exol.in/cart/api/place-order/' + userData.user_id + '/')
				.subscribe(data => {
					this.custData = data;
				}),
				error => {this.presentToast('Error Fetching Data...');
              	}
	}

	gotoProfile(){
		this.navCtrl.push(SalesProfile, this.navParams.data);		
	}

	placeOrder(){
		this.navCtrl.push(ProductList, {'userData':this.navParams.data.userData, 'cusData':this.custData} );
	}

	viewOrder(){
		this.navCtrl.push(ViewOrder, this.navParams.data);
	}

	gotoWallet(){
		this.navCtrl.push(WalletPage, this.navParams.data);	
	}

  	bikeRemd(){
		this.navCtrl.push(BikeRec);
	}

	carRemd(){
		this.navCtrl.push(CarRec);
	}

	presentToast(msg) {
    	this.toastCtrl.create({
	    	message: msg,
	    	duration: 3000
	    }).present();
	}

	

}
