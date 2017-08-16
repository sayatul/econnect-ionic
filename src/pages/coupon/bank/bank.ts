import { Component, Pipe } from '@angular/core';
import { NavController, ToastController, NavParams, LoadingController, AlertController } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
import { RestApiProvider } from '../../../providers/rest-api/rest-api'
import { NgForm } from '@angular/forms';



@Component({
  templateUrl: 'bank.html'
})
export class Bank {

  constructor(public navCtrl: NavController,
  		//private storage: Storage,
  		private navParams: NavParams,
  		public loadingCtrl: LoadingController,
  		private apiService : RestApiProvider,
  		public toastCtrl: ToastController,
  		private alertCtrl: AlertController
  	) {
  }

  submitForm(form: NgForm){
  	this.presentLoading();
  	let body = {'user_id':this.navParams.data.userData.user_id, 
  		'acc':form.value.acc, 
  		'ifsc':form.value.ifsc,
  		'bank':form.value.bank,
  		'branch':form.value.branch
  	}
    this.apiService.postData('http://staging.exol.in/wallet/api/link-bank/', body)
        .subscribe(data => {   
            this.presentAlert('Successful', data.msg);
        },
        error => { if(error.status == 400){
          console.log("bank",error);
        	this.presentAlert('Response', error._body);
        }
        else{
          this.presentToast('Error fetching data...');
        }
        });
  }

	presentLoading() {
	    let loader = this.loadingCtrl.create({
	      content: "Please wait...",
	      duration: 800
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

	presentToast(msg) {
    	this.toastCtrl.create({
	    	message: msg,
	    	duration: 3000
	    }).present();
	}
}
