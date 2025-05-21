export interface SalesOrderItem {
  material: string;
  quantity: number;
  unit: string;
  unitPrice: number;   // price charged to customer
  costPerUnit?: number; // internal cost (optional)
}
