import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../../providers/rest-api/rest-api';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class MechProfile {

	profileData: any;
	userData: any;

  constructor(public navCtrl: NavController, 
  		public navParams: NavParams, 
  		//private storage: Storage,
  		private apiService : RestApiProvider,
  		public toastCtrl: ToastController
  	) {
  	this.userData = this.navParams.data.userData;
  	this.loadProfile();
  }

	loadProfile(){
		//console.log("profile",this.navParams.data);
		if(this.navParams.data.userData.role == "Mechanic"){
			let userData = this.navParams.data.userData
			this.profileData = this.apiService.getData('http://staging.exol.in/mechanic/api/profile/' + userData.user_id + '/')
	    		.subscribe(data => {// console.log("profile1", data);
	        		this.profileData = data;	
	    		},
	    		error => { 
	    			this.presentToast();
	    		}); 
			}
		}

	presentToast() {
    	this.toastCtrl.create({
	    	message: 'Error Connecting to Server',
	    	duration: 3000
	    }).present();
	}

}
