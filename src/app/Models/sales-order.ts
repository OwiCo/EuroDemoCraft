export interface SalesOrder {
  id: string;
  customerName: string;
  createdAt: Date;
  deliveryDate: string;
  status: 'Draft' | 'Confirmed' | 'In Progress' | 'Completed';
  assignedTo?: string;
  items: {
    material: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    costPerUnit?: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
}
