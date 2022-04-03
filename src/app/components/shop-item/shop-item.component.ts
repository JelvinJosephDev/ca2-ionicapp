import { Component, OnInit } from '@angular/core';
import { IonItem } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent implements OnInit {
  item: Array<number> = [];
  enteredPaidCash: number;
  paidCash: number;
  total: number;
  taxResult: number;
  returnCash: any;
  isSubmitted = false;
  isPaidButtonClicked = false;
  isCalculateButtonClicked = false;
  hasError = false;
  i: number;
  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  onSubmit() {
      for (this.i = 0; this.i < this.item.length; this.i++) {
        console.log(this.item[this.i]);
        if (this.item[this.i] === null) {
          this.hasError = true;
          console.log('Null item found');
        } else {
          console.log(this.item.length);
        }
      }
      if (this.hasError === true) {
        this.alertController
            .create({
              header: 'Error',
              message: 'Please enter a valid item amount',
              buttons: ['OK'],
            })
            .then((res) => res.present());
            this.onCancel();
      } else if (this.hasError === false) {
      this.total = this.item.reduce((a, b) => a + b, 0);
      this.taxResult = this.total + 0.18 * this.total;
      this.isSubmitted = true;
      this.alertController
            .create({
              header: 'Success',
              message: 'Values have been submitted',
              buttons: ['OK'],
            })
            .then((res) => res.present());
      }
  }

  onPaidCash() {
    this.isPaidButtonClicked = true;
  }

  onCancel() {
    this.item = [];
    this.enteredPaidCash = null;
    this.paidCash = null;
    this.total = null;
    this.taxResult = null;
    this.returnCash = null;
    this.isSubmitted = false;
    this.isPaidButtonClicked = false;
    this.isCalculateButtonClicked = false;
    this.hasError = false;
  }

  onCalculateBalance() {
    this.paidCash = this.enteredPaidCash;
    if (this.taxResult > this.enteredPaidCash) {
      this.returnCash = 'Sorry, you don\'t have enough money';
    } else {
      this.returnCash = this.enteredPaidCash - this.taxResult;
      this.isCalculateButtonClicked = true;
    }
  }
}
