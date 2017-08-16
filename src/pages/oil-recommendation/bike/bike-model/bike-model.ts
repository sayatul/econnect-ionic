import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../../../providers/rest-api/rest-api';
import { BikeOil } from '../bike-oil/bike-oil'


@Component({
  templateUrl: 'bike-model.html',
})
export class BikeModel {

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
		this.apiService.getData('http://econnect.exol.in/product/api/bike-model-list/'+ id +'/')
    		.subscribe(data => { 
        		this.modelData = data;	
    		},
    		error => { 
    			this.presentToast();
    		}); 
		}

	oilRec(id){
		this.navCtrl.push(BikeOil, {'id':id});
	}
	

	presentToast() {
    	this.toastCtrl.create({
	    	message: 'Error Connecting to Server',
	    	duration: 3000
	    }).present();
	}

}
