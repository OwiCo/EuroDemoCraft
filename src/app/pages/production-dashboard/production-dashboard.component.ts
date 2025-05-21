import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import { SalesOrder } from '../../Models/sales-order';
import { SalesOrderService } from '../../core/services/sales-order.service';

@Component({
  selector: 'app-production-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './production-dashboard.component.html'
})
export class ProductionDashboardComponent implements OnInit {
  statuses: Array<'Confirmed' | 'In Progress' | 'Completed'> = ['Confirmed', 'In Progress', 'Completed'];

  salesOrders: SalesOrder[] = [];

  filters = {
    customer: '',
    material: '',
    startDate: '',
    endDate: ''
  };

  constructor(private orderService: SalesOrderService) {}

  ngOnInit(): void {
    this.salesOrders = [
      {
        id: 'SO-1001',
        customerName: 'Acme Builders',
        createdAt: new Date('2024-08-01'),
        deliveryDate: '2024-08-10',
        status: 'Confirmed',
        assignedTo: 'Marlis',
        items: [
          { material: 'EuroSlide Door', quantity: 2, unit: 'each', unitPrice: 500 }
        ],
        subtotal: 1000,
        tax: 70,
        total: 1070
      },
      {
        id: 'SO-1002',
        customerName: 'Beta Homes',
        createdAt: new Date('2024-08-02'),
        deliveryDate: '2024-08-15',
        status: 'In Progress',
        assignedTo: 'Luis',
        items: [
          { material: 'ThermaPane Window', quantity: 1, unit: 'each', unitPrice: 800 }
        ],
        subtotal: 800,
        tax: 56,
        total: 856
      },
      {
        id: 'SO-1003',
        customerName: 'Delta Construction',
        createdAt: new Date('2024-08-03'),
        deliveryDate: '2024-08-20',
        status: 'Completed',
        assignedTo: 'Jose',
        items: [
          { material: 'Glass Panel', quantity: 3, unit: 'each', unitPrice: 250 }
        ],
        subtotal: 750,
        tax: 52.5,
        total: 802.5
      },
      {
        id: 'SO-1004',
        customerName: 'Skyline Developments',
        createdAt: new Date('2024-08-04'),
        deliveryDate: '2024-08-25',
        status: 'Confirmed',
        assignedTo: '',
        items: [
          { material: 'Frame U-profile', quantity: 10, unit: 'ft', unitPrice: 40 }
        ],
        subtotal: 400,
        tax: 28,
        total: 428
      }
    ];
  }

  onDrop(event: CdkDragDrop<SalesOrder[]>, newStatus: 'Confirmed' | 'In Progress' | 'Completed') {
    if (event.previousContainer === event.container) return;

    const order = event.previousContainer.data[event.previousIndex];
    order.status = newStatus;

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  filteredOrdersByStatus(status: 'Confirmed' | 'In Progress' | 'Completed'): SalesOrder[] {
    return this.salesOrders.filter(order =>
      order.status === status &&
      (this.filters.customer === '' || order.customerName.toLowerCase().includes(this.filters.customer.toLowerCase())) &&
      (this.filters.material === '' || order.items.some(i => i.material.toLowerCase().includes(this.filters.material.toLowerCase()))) &&
      (this.filters.startDate === '' || new Date(order.deliveryDate) >= new Date(this.filters.startDate)) &&
      (this.filters.endDate === '' || new Date(order.deliveryDate) <= new Date(this.filters.endDate))
    );
  }

  generatePDF(order: SalesOrder) {
    // Optional: Add jsPDF logic here to generate order PDF
    console.log('Generating PDF for', order.id);
  }
}
