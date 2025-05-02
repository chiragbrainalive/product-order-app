import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  products: string[] = ['Pencil', 'Eraser', 'Pens'];
  maxRows = 8;

  orderRows: { product: string; quantity: number | null }[] = [
    { product: '', quantity: null }
  ];

  finalOrder: { product: string; quantity: number }[] = [];
  showOrderList = false;

  constructor(private http: HttpClient) {}

  addRow(index: number): void {
    const current = this.orderRows[index];
    if (
      current.product &&
      current.quantity !== null &&
      this.orderRows.length < this.maxRows &&
      index === this.orderRows.length - 1
    ) {
      this.orderRows.push({ product: '', quantity: null });
    }
  }

  showOrder(): void {
    this.finalOrder = this.orderRows
      .filter(row => row.product && row.quantity !== null)
      .map(row => ({ product: row.product, quantity: row.quantity! }));
    this.showOrderList = true;
  }

  // speakOrder(): void {
  //   if (this.finalOrder.length === 0) {
  //     alert('No items to read.');
  //     return;
  //   }
  
  //   const orderText = this.finalOrder
  //     .map(item => `${item.quantity} ${item.product}${item.quantity > 1 ? 's' : ''}`)
  //     .join(', ');
  
  //   const url = 'https://voicerss-text-to-speech.p.rapidapi.com/';
  //   const headers = new HttpHeaders({
  //     'content-type': 'application/x-www-form-urlencoded',
  //     'X-RapidAPI-Key': '9b7f629b66msh871501cb93b0fc7p1a9ba3jsn0d4a3671dceb',
  //     'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
  //   });
  
  //   const body = new HttpParams()
  //     .set('src', `Your order is: ${orderText}`)
  //     .set('hl', 'en-us')
  //     .set('v', 'Linda')
  //     .set('r', '0')
  //     .set('c', 'mp3')
  //     .set('f', '44khz_16bit_stereo');
  
  //   this.http.post(url, body.toString(), { headers, responseType: 'blob' }).subscribe({
  //     next: (audioBlob) => {
  //       if (audioBlob.type === 'audio/mpeg') {
  //         const audioUrl = URL.createObjectURL(audioBlob);
  //         const audio = new Audio(audioUrl);
  //         audio.play().catch(err => console.error('Playback failed:', err));
  //       } else {
  //         console.error('Unexpected response type:', audioBlob.type);
  //         alert('Failed to receive valid audio response from API.');
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Text-to-speech API call failed:', err);
  //       alert('Text-to-speech failed. See console for details.');
  //     }
  //   });
  // }
  speakOrder(): void {
    if (this.finalOrder.length === 0) {
      alert('No items to read.');
      return;
    }
  
    const orderText = this.finalOrder
      .map(item => `${item.quantity} ${item.product}${item.quantity > 1 ? 's' : ''}`)
      .join(', ');
  
    const message = new SpeechSynthesisUtterance(`Your order is: ${orderText}`);
    message.lang = 'en-US';
    message.rate = 1; // normal speed
    message.volume = 1; // full volume
    speechSynthesis.speak(message);
  }
  
  
}
