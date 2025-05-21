import { ComponentType } from './product';

export interface InventoryItem {
  id: string;
  name: string;
  type: ComponentType;
  qty: number;
  width?: number;
  height?: number;
  length?: number;
  unitCost: number;
}