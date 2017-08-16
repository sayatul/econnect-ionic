import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  templateUrl: 'cart-items.html'
})
export class CartItem {
  //orderList = [];
  itemList: Array<{}>;

  constructor(public navCtrl: NavController,
  		private navParams: NavParams
  	) {
  	this.loadData();
  }
    loadData(){
		  console.log('cartitem',this.navParams.data);
		  this.itemList = this.navParams.data.items;
		};

    goBack(){
      this.navCtrl.pop();
    }
}