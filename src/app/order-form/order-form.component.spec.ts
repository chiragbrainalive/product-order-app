import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderFormComponent } from './order-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFormComponent, FormsModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a row when product and quantity are selected', () => {
    component.orderRows = [{ product: 'Pencil', quantity: 2 }];
    component.addRow(0);
    expect(component.orderRows.length).toBe(2);
  });

  it('should not add a row if product is missing', () => {
    component.orderRows = [{ product: '', quantity: 2 }];
    component.addRow(0);
    expect(component.orderRows.length).toBe(1);
  });

  it('should not add a row if quantity is missing', () => {
    component.orderRows = [{ product: 'Eraser', quantity: null }];
    component.addRow(0);
    expect(component.orderRows.length).toBe(1);
  });

  it('should only keep valid rows when showOrder is called', () => {
    component.orderRows = [
      { product: 'Pencil', quantity: 3 },
      { product: '', quantity: 2 },
      { product: 'Pens', quantity: null }
    ];
    component.showOrder();
    expect(component.finalOrder.length).toBe(1);
    expect(component.finalOrder[0].product).toBe('Pencil');
  });

  it('should call speechSynthesis.speak when speakOrder is called', () => {
    spyOn(window.speechSynthesis, 'speak');
    component.finalOrder = [
      { product: 'Pencil', quantity: 2 },
      { product: 'Eraser', quantity: 1 }
    ];
    component.speakOrder();
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });
});
