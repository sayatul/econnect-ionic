import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SignupPage } from '../signup/signup';
import { Salesperson } from '../../dashboard/salesperson/salesperson';
import { Mechanic } from '../../dashboard/mechanic/mechanic';
import { RestApiProvider } from '../../../providers/rest-api/rest-api';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  signupPage = SignupPage
  error: boolean = false;
/*
  public role: string;
  public fullName: string;
  public userId: number;
*/
  constructor(private navCtrl: NavController,
	  	private storage: Storage,
      public navParams: NavParams,
	  	private apiService : RestApiProvider,
	  	public loadingCtrl: LoadingController,
	  	public toastCtrl: ToastController,
      private alertCtrl: AlertController
  	){
     if(this.navParams.data.show == true){
       this.presentAlert('Registeration Successful', 'Your username is '+this.navParams.data.username);
     }
  }

  submitForm(form: NgForm){
  	this.presentLoading();
  	let body = {'username':form.value.username, 'password':form.value.password}
    this.apiService.postData('http://staging.exol.in/api/login/', body)
        .subscribe(data => {//this.userId = data.user_id, this.role = data.role, 
            console.log('signin', data);
            this.storage.clear();
            if (data.role == "Salesperson"){
              this.navCtrl.push(Salesperson, {'userData':data});
              this.storage.set('userData', data);
            }
            else if(data.role == 'Mechanic'){
             this.navCtrl.push(Mechanic, {'userData':data});
             this.storage.set('userData', data); 
            }
        },
        error => { if(error.status == 400){
          console.log("login",error);
        	this.presentToast('Invalid UserName or Password');
        }
        else{
          this.presentToast('Error connecting to the Server...');
        }
        });
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
