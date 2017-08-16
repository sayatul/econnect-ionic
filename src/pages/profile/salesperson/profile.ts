import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../../providers/rest-api/rest-api';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class SalesProfile {

	profileData: any;
	userData: any;

  constructor(public navCtrl: NavController, 
  		public navParams: NavParams, 
  		private storage: Storage,
  		private apiService : RestApiProvider,
  		public toastCtrl: ToastController
  	) {
  	this.userData = this.navParams.data.userData;
  	this.loadProfile();
  }

  /*loadData() {
    this.userData = this.storage.get('userData')
				.then((val) => { this.userData = val;
			});
  }*/
	loadProfile(){
		console.log("profile",this.navParams.data);
		if(this.navParams.data.userData.role == "Salesperson"){
			let userData = this.navParams.data.userData
			this.profileData = this.apiService.getData('http://staging.exol.in/salesperson/api-profile/' + userData.user_id + '/')
	    		.subscribe(data => { 
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
