
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Salesperson } from '../../dashboard/salesperson/salesperson';
import { RestApiProvider } from '../../../providers/rest-api/rest-api';
import { NgForm } from '@angular/forms';

 import { LoginPage } from '../login/login';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(private navCtrl: NavController,
	  	private storage: Storage,
	  	private apiService : RestApiProvider,
	  	public loadingCtrl: LoadingController,
	  	public toastCtrl: ToastController
  	){
     
  }

  submitForm(form: NgForm){
  	this.presentLoading();
  	if(form.value.pwd == form.value.cpwd){
	  	let body = {'name':form.value.name,
	  		'password':form.value.pwd,
	  		'mobile':form.value.mobile,
	  		'shop':form.value.shop,
	  		'address':form.value.address,
	  		'city':form.value.city,
	  		'state':form.value.state,
	  		'pin_code':form.value.pincode
	  	}
	    this.apiService.postData('http://staging.exol.in//api/register/', body)
	        .subscribe(data => {
	              this.navCtrl.push(LoginPage, {'username':data.username, 'show':true});
	        },
	        error => { if(error.status == 400){
	          console.log("signup",error);
	        	this.presentToast(JSON.parse(error._body).msg);
	        }
	        else{
	          this.presentToast('Error connecting to the Server...');
	        }
	        });	
  	}
  	else{
  		this.presentToast('Password Did Not Match!');
  	}
  	
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 200
    }).present();
  }

  presentToast(msg) {
    	this.toastCtrl.create({
	    	message: msg,
	    	duration: 3000
	    }).present();
	}

}
