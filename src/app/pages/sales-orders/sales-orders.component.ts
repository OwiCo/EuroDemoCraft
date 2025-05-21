import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesOrderService } from '../../core/services/sales-order.service';
import { GlassForgeEngineService } from '../../core/services/glassforge-engine.service';
import { InventoryService } from '../../core/services/inventory.service';
import { SalesOrder } from '../../Models/sales-order';
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-sales-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales-orders.component.html',
  styleUrls: ['./sales-orders.component.css']
})
export class SalesOrdersComponent implements OnInit {
  orders: SalesOrder[] = [];
  selectedOrder: SalesOrder | null = null;
showDetails: boolean = false;


  showForm = false;

  statusOptions = ['Draft', 'Confirmed', 'In Progress', 'Completed'];

  productOptions = [
    'EuroSlide Door',
    'ThermaPane Window',
    'Glass Panel',
    'Handle',
    'Frame U-profile',
    'Frame C-profile'
  ];

  form = {
    customerName: '',
    createdAt: new Date(),
    deliveryDate: '',
    status: 'Draft',
    items: [
      { material: '', quantity: 1, unit: 'each', unitPrice: 0 , costPerUnit:0}
    ]
  };

  filters = {
    customer: '',
    salesOrderId: '',
    date: '',
    status: ''
  };

  constructor(
    private orderService: SalesOrderService,
    private inventoryService: InventoryService,
    private engine: GlassForgeEngineService
  ) {}

ngOnInit(): void {
  this.orders = [
    {
      id: 'SO-10001',
      customerName: 'Acme Corp',
      createdAt: new Date('2024-08-01'),
      deliveryDate: '2024-08-15',
      status: 'Draft',
      items: [
        { material: 'EuroSlide Door', quantity: 2, unit: 'each', unitPrice: 500 }
      ],
      subtotal: 1000,
      tax: 70,
      total: 1070
    },
    {
      id: 'SO-10002',
      customerName: 'Beta Industries',
      createdAt: new Date('2024-08-05'),
      deliveryDate: '2024-08-20',
      status: 'Confirmed',
      items: [
        { material: 'Glass Panel', quantity: 5, unit: 'each', unitPrice: 200 }
      ],
      subtotal: 1000,
      tax: 70,
      total: 1070
    },
    {
      id: 'SO-10003',
      customerName: 'Delta Homes',
      createdAt: new Date('2024-08-10'),
      deliveryDate: '2024-08-30',
      status: 'In Progress',
      items: [
        { material: 'ThermaPane Window', quantity: 3, unit: 'each', unitPrice: 750 }
      ],
      subtotal: 2250,
      tax: 157.5,
      total: 2407.5
    },
    {
      id: 'SO-10004',
      customerName: 'Everest Builders',
      createdAt: new Date('2024-08-12'),
      deliveryDate: '2024-09-01',
      status: 'Completed',
      items: [
        { material: 'Frame U-profile', quantity: 10, unit: 'ft', unitPrice: 50 }
      ],
      subtotal: 500,
      tax: 35,
      total: 535
    }
  ];
}


  submitOrder(): void {
    const id = 'SO-' + Math.floor(10000 + Math.random() * 90000);

    const newOrder: SalesOrder = {
      id,
      customerName: this.form.customerName,
      createdAt: this.form.createdAt,
      deliveryDate: this.form.deliveryDate,
      status: this.form.status as SalesOrder['status'],
      items: [...this.form.items],
      subtotal: this.getSubtotal(),
      tax: this.getTax(),
      total: this.getTotal()
    };

    this.orderService.addOrder(newOrder);
    this.orders = this.orderService.getOrders();
    this.resetForm();
    this.showForm = false;
  }

  getCostTotalFromItems(items: any[]): number {
  return items.reduce((sum, item) => sum + (item.costPerUnit || 0) * item.quantity, 0);
}

getProfitFromItems(items: any[], total: number): number {
  return total - this.getCostTotalFromItems(items);
}


  openDetails(order: SalesOrder): void {
  this.selectedOrder = order;
  this.showDetails = true;
}
getCostTotal(order: SalesOrder): number {
  return order.items.reduce((sum, item) => sum + (item.costPerUnit || 0) * item.quantity, 0);
}
getTotalCost(order: SalesOrder): number {
  return order.items.reduce((sum, item) => {
    const cost = item.costPerUnit ?? this.productComponentMap[item.material]?.costPerUnit ?? 0;
    return sum + cost * item.quantity;
  }, 0);
}



getItemProfit(item: any): number {
  return ((item.unitPrice || 0) - (item.costPerUnit || 0)) * item.quantity;
}
getTotalProfit(order: SalesOrder): number {
  const totalCost = order.items.reduce((sum, item) => {
    const cost = item.costPerUnit ?? this.productComponentMap[item.material]?.costPerUnit ?? 0;
    return sum + cost * item.quantity;
  }, 0);

  return order.total - totalCost;
}

  startProduction(orderId: string): void {
    this.orderService.updateStatus(orderId, 'In Progress');
    this.orders = this.orderService.getOrders();
  }

  markComplete(orderId: string): void {
    this.orderService.updateStatus(orderId, 'Completed');
    this.orders = this.orderService.getOrders();
  }

productComponentMap: { [product: string]: { parts: string[], costPerUnit: number } | undefined } = {
  'EuroSlide Door': { parts: ['Glass', 'Frame U-profile', 'Handle, Textile frame'], costPerUnit: 320 },
  'ThermaPane Window': { parts: ['Insulated Glass', '\nAluminum Frame'], costPerUnit: 400 },
  'Glass Panel': { parts: ['Tempered Glass, 2U Bolts, Nails, Rubber coating'], costPerUnit: 120 },
  'Handle': { parts: ['Zinc Alloy 23u60 , Screw TR5, Wooden Finish'], costPerUnit: 10 },
  'Frame U-profile': { parts: ['Aluminum Rod'], costPerUnit: 25 },
  'Frame C-profile': { parts: ['Aluminum Rod'], costPerUnit: 30 }
};

getProfit(order: any): number {
  return this.getTotal() - this.getCostTotal(order);
}

addItem(): void {
  this.form.items.push({
    material: '',
    quantity: 1,
    unit: 'each',
    unitPrice: 0,
    costPerUnit: 0
  });
}

onMaterialChange(item: any): void {
  const component = this.productComponentMap[item.material];
  if (component) {
    item.costPerUnit = component.costPerUnit;
  } else {
    item.costPerUnit = 0;
  }
}

  getSubtotal(): number {
    return this.form.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.07;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  resetForm(): void {
    this.form = {
  customerName: '',
  createdAt: new Date(),
  deliveryDate: '',
  status: 'Draft',
  items: [
    { material: '', quantity: 1, unit: 'each', unitPrice: 0, costPerUnit: 0 }
  ]
};
  }


  filteredOrders(): SalesOrder[] {
    return this.orders.filter(order => {
      const matchesCustomer = this.filters.customer === '' || order.customerName.toLowerCase().includes(this.filters.customer.toLowerCase());
      const matchesId = this.filters.salesOrderId === '' || order.id.toLowerCase().includes(this.filters.salesOrderId.toLowerCase());
      const matchesDate = this.filters.date === '' || (order.deliveryDate && new Date(order.deliveryDate).toISOString().split('T')[0] === this.filters.date);
      const matchesStatus = this.filters.status === '' || order.status === this.filters.status;
      return matchesCustomer && matchesId && matchesDate && matchesStatus;
    });
  }
  generatePDF(order: SalesOrder): void {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Sales Order Summary', 10, 10);

  doc.setFontSize(12);
  doc.text(`Order ID: ${order.id}`, 10, 20);
  doc.text(`Customer: ${order.customerName}`, 10, 30);
  doc.text(`Created At: ${new Date(order.createdAt).toLocaleDateString()}`, 10, 40);
  doc.text(`Delivery Date: ${order.deliveryDate}`, 10, 50);
  doc.text(`Status: ${order.status}`, 10, 60);

  doc.text('Items:', 10, 75);
  let y = 85;
  order.items.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.material} - ${item.quantity} ${item.unit} @ $${item.unitPrice}`,
      12,
      y
    );
    y += 10;
  });

  y += 5;
  doc.text(`Subtotal: $${order.subtotal.toFixed(2)}`, 10, y);
  doc.text(`Tax: $${order.tax.toFixed(2)}`, 10, y + 10);
  doc.text(`Total: $${order.total.toFixed(2)}`, 10, y + 20);

  doc.save(`${order.id}.pdf`);
}

}
