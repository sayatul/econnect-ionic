import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../../providers/rest-api/rest-api';
import { BikeModel } from '../bike/bike-model/bike-model'

@Component({
  templateUrl: 'bike.html',
})
export class BikeRec {

	modelPage: BikeModel;
	bikeData: Array<{}>;

  constructor(public navCtrl: NavController, 
  		public navParams: NavParams, 
  		private storage: Storage,
  		private apiService : RestApiProvider,
  		public toastCtrl: ToastController
  	) {
  	this.loadData();
  }

	loadData(){
		console.log("bike");	
		this.apiService.getData('http://econnect.exol.in/product/api/bike-brand-list/')
    		.subscribe(data => { 
        		this.bikeData = data;	
    		},
    		error => { 
    			this.presentToast();
    		}); 
		}
	
	bikeModel(id){
		this.navCtrl.push(BikeModel, {'id':id})
	}

	presentToast() {
    	this.toastCtrl.create({
	    	message: 'Error Connecting to Server',
	    	duration: 3000
	    }).present();
	}

}
