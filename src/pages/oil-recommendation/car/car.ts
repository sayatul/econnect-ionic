import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../../providers/rest-api/rest-api';
import { CarModel } from '../car/car-model/car-model'

@Component({
  templateUrl: 'car.html',
})
export class CarRec {

	modelPage: CarModel;
	carData: Array<{}>;

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
		this.apiService.getData('http://econnect.exol.in/product/api/car-brand-list/')
    		.subscribe(data => { 
        		this.carData = data;	
    		},
    		error => { 
    			this.presentToast();
    		}); 
		}
	
	carModel(id){
		this.navCtrl.push(CarModel, {'id':id})
	}

	presentToast() {
    	this.toastCtrl.create({
	    	message: 'Error Connecting to Server',
	    	duration: 3000
	    }).present();
	}

}
