import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../../../providers/rest-api/rest-api';
import { CarOil } from '../car-oil/car-oil'


@Component({
  templateUrl: 'car-model.html',
})
export class CarModel {

	modelData: Array<{}>;

  constructor(public navCtrl: NavController, 
  		public navParams: NavParams, 
  		private storage: Storage,
  		private apiService : RestApiProvider,
  		public toastCtrl: ToastController
  	) {
  	this.loadData();
  }

	loadData(){
		console.log("b_model",this.navParams.data);
		let id = this.navParams.data.id
		this.apiService.getData('http://econnect.exol.in/product/api/car-model-list/'+ id +'/')
    		.subscribe(data => { 
        		this.modelData = data;	
    		},
    		error => { 
    			this.presentToast();
    		}); 
		}

	oilRec(id){
		this.navCtrl.push(CarOil, {'id':id});
	}
	

	presentToast() {
    	this.toastCtrl.create({
	    	message: 'Error Connecting to Server',
	    	duration: 3000
	    }).present();
	}

}
