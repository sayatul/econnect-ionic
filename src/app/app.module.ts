import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';


import { WalletPage } from '../pages/wallet/wallet';
import { Coupon } from '../pages/coupon/coupon';
import { Salesperson } from '../pages/dashboard/salesperson/salesperson';
import { Mechanic } from '../pages/dashboard/mechanic/mechanic';
import { CustomerPage } from '../pages/customer/customer';
import { MechProfile } from '../pages/profile/mechanic/profile';
import { SalesProfile } from '../pages/profile/salesperson/profile';
import { OrderPage } from '../pages/order/order';
import { ViewOrder } from '../pages/order/view-order/view-order';
import { CartItem } from '../pages/order/cart-items/cart-items';
import { Cart } from '../pages/cart/cart';
import { ProductList } from '../pages/products/products';
import { LoginPage } from '../pages/account/login/login';
import { Password } from '../pages/account/password/password';
import { SignupPage } from '../pages/account/signup/signup';
import { BikeRec } from '../pages/oil-recommendation/bike/bike';
import { Bank } from '../pages/wallet/bank/bank'

import { BikeModel } from '../pages/oil-recommendation/bike/bike-model/bike-model';
import { BikeOil } from '../pages/oil-recommendation/bike/bike-oil/bike-oil';

import { CarRec } from '../pages/oil-recommendation/car/car';
import { CarModel } from '../pages/oil-recommendation/car/car-model/car-model';
import { CarOil } from '../pages/oil-recommendation/car/car-oil/car-oil';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    WalletPage,
    Salesperson,
    CustomerPage,
    OrderPage,
    LoginPage,
    SignupPage,
    MechProfile,
    SalesProfile,
    Mechanic,
    Password,
    CarRec,
    CarModel,
    CarOil,
    BikeRec,
    BikeModel,
    BikeOil,
    Bank,
    ProductList,
    ViewOrder,
    CartItem,
    Cart,
    Coupon
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WalletPage,
    Salesperson,
    CustomerPage,
    OrderPage,
    LoginPage,
    SignupPage,
    MechProfile,
    SalesProfile,
    Mechanic,
    Password,
    CarRec,
    CarModel,
    CarOil,
    BikeRec,
    BikeModel,
    BikeOil,
    Bank,
    ProductList,
    ViewOrder,
    CartItem,
    Cart,
    Coupon
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestApiProvider,
    QRScanner
  ]
})
export class AppModule {}
