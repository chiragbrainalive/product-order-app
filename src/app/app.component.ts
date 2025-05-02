import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OrderFormComponent } from './order-form/order-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, OrderFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'product-order-app';
}
