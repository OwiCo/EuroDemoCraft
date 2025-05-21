import { Injectable } from '@angular/core';
import { SalesOrder } from '../../Models/sales-order';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {
  private orders: SalesOrder[] = [];

  getOrders(): SalesOrder[] {
    return this.orders;
  }

  addOrder(order: SalesOrder): void {
    this.orders.push(order);
  }
  updateStatus(orderId: string, newStatus: SalesOrder['status']): void {
  const order = this.orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
  }
}

}
