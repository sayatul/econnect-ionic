import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { OrderPage } from '../pages/order/order';
import { WalletPage } from '../pages/wallet/wallet';
import { Coupon } from '../pages/coupon/coupon';
import { CustomerPage } from '../pages/customer/customer';
import { Salesperson } from '../pages/dashboard/salesperson/salesperson';
import { Mechanic } from '../pages/dashboard/mechanic/mechanic';
import { LoginPage } from '../pages/account/login/login';
import { MechProfile } from '../pages/profile/mechanic/profile';
import { SalesProfile } from '../pages/profile/salesperson/profile';
import { Password } from '../pages/account/password/password';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;
  pages: Array<{title: string, icon: string, component: any}>;

  userData: any;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private storage: Storage) 
  {
    this.initializeApp();

    this.storage.get('userData').then((val) => {
      this.userData = val;
      if (val.role == 'Mechanic'){
        this.pages = [
          { title: 'Dashboard', icon : 'fa fa-user', component: Mechanic },
          { title: 'Profile', icon : 'fa fa-user', component: MechProfile }
        ];  
      }
      else if(val.role == 'Salesperson'){
         this.pages = [
          { title: 'Dashboard', icon : 'fa fa-user', component: Salesperson },
          { title: 'Orders', icon : 'fa-file', component: OrderPage },
          { title: 'Profile', icon : 'fa fa-user', component: SalesProfile }
        ]; 
      }else{
        this.pages = [
          { title: 'Dashboard', icon : 'fa fa-user', component: Mechanic }
        ];
      }
      this.pages.push( 
              { title: 'Wallet', icon : 'fa-inr', component: WalletPage },
              { title: 'Redeem Coupon', icon : 'fa-qrcode', component: Coupon },
              { title: 'Change Password', icon : 'fa-key', component: Password }
            )
    });
  }

  initializeApp(){
      this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.storage.get('userData').then((val) => {
      this.nav.setRoot(page.component, {'userData':val});
    });
    
  }

  
}
