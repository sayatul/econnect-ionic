import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { RestApiProvider } from '../../../providers/rest-api/rest-api';


@Component({
  templateUrl: 'password.html',
})
export class Password {

	profileData: any;
	userData: any;

  constructor(public navCtrl: NavController, 
  		public navParams: NavParams, 
  		private apiService : RestApiProvider,
  		public loadingCtrl: LoadingController,
	  	public toastCtrl: ToastController,
    	private alertCtrl: AlertController
  	) {
  	this.userData = this.navParams.data.userData;
  }


	submitForm(form: NgForm){
		console.log("pwd",this.navParams.data);
		this.presentLoading();
	  	if(form.value.n_pwd == form.value.c_pwd){
	  		let body = {'old_password':form.value.old_pwd, 'new_password':form.value.n_pwd}
		    this.apiService.putData('http://staging.exol.in/api/change-password/'+this.navParams.data.userData.user_id+'/', body)
		        .subscribe(data => {
		      		this.presentAlert('Response', 'Your password updated successfully');
		      		this.navCtrl.pop();
		        },
		        error => { if(error.status == 400){
		          console.log("pwd_e",error);
		        	this.presentToast('Invalid UserName or Password');
		        }
		        else{
		          this.presentToast('Error connecting to the Server...');
		        }
	        });
	  	}
	  	else{
	  		this.presentAlert('Error','Password Did Not Match!')
	  	}
		}
	presentLoading() {
    	let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 500
    }).present();
  }

  presentToast(msg) {
    	this.toastCtrl.create({
	    	message: msg,
	    	duration: 3000
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
}
