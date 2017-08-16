import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../../../providers/rest-api/rest-api';


@Component({
  templateUrl: 'car-oil.html',
})
export class CarOil {

	oilData: Array<{}>;

  constructor(public navCtrl: NavController, 
  		public navParams: NavParams, 
  		private storage: Storage,
  		private apiService : RestApiProvider,
  		public toastCtrl: ToastController
  	) {
  	this.loadData();
  }

	loadData(){
		console.log("bc_model",this.navParams.data);
		let id = this.navParams.data.id
		this.apiService.getData('http://econnect.exol.in/product/api/car-recommendation/'+ id +'/')
    		.subscribe(data => { 
        		this.oilData = data;	
    		},
    		error => { 
    			this.presentToast();
    		}); 
		}

	presentToast() {
    	this.toastCtrl.create({
	    	message: 'Error Connecting to Server',
	    	duration: 3000
	    }).present();
	}

}
