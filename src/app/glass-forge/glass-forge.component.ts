import { ProductBlueprint } from '../Models/product';
import { InventoryItem } from '../Models/inventory';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-glass-forge',
  imports: [CommonModule],
  templateUrl: './glass-forge.component.html',
  styleUrls: ['./glass-forge.component.css'],
})
export class GlassForgeComponent implements OnInit {
ngOnInit(): void {
  this.calculateAll();
}
  // ✅ Inventory
  inventory: InventoryItem[] = [
    { id: 'f1', name: 'Standard Frame 36x80', type: 'frame', qty: 5, width: 36, height: 80, unitCost: 18 },
    { id: 'g1', name: 'Glass 34x78', type: 'glass', qty: 5, width: 34, height: 78, unitCost: 20 },
    { id: 'h1', name: 'Handle', type: 'handle', qty: 10, unitCost: 5 },
    { id: 'l1', name: 'Lock', type: 'lock', qty: 10, unitCost: 7 }
  ];

  // ✅ Product list
products: ProductBlueprint[] = [
  {
    name: 'Fixed Window & Shapes (EC100)',
    image: 'assets/images/ec100-fixed.png',
    salePrice: 220,
    requiredParts: [
      { type: 'frame', quantity: 1, width: 36, height: 36 },
      { type: 'glass', quantity: 1, width: 34, height: 34 }
    ]
  },
  {
    name: 'Single Hung Window (EC200)',
    image: 'assets/images/ec200-singlehung.png',
    salePrice: 240,
    requiredParts: [
      { type: 'frame', quantity: 1, width: 36, height: 60 },
      { type: 'glass', quantity: 1, width: 34, height: 58 },
      { type: 'lock', quantity: 1 }
    ]
  },
  {
    name: 'Horizontal Slider Window (EC300)',
    image: 'assets/images/ec300-slider.png',
    salePrice: 260,
    requiredParts: [
      { type: 'frame', quantity: 1, width: 48, height: 36 },
      { type: 'glass', quantity: 2, width: 22, height: 34 },
      { type: 'handle', quantity: 1 }
    ]
  },
  {
    name: 'Casement Door (EC400)',
    image: 'assets/images/ec400-casementdoor.png',
    salePrice: 310,
    requiredParts: [
      { type: 'frame', quantity: 1, width: 36, height: 80 },
      { type: 'glass', quantity: 1, width: 34, height: 78 },
      { type: 'handle', quantity: 1 },
      { type: 'lock', quantity: 1 }
    ]
  },
  {
    name: 'Sliding Door (EC450)',
    image: 'assets/images/ec450-slidingdoor.png',
    salePrice: 340,
    requiredParts: [
      { type: 'frame', quantity: 2, width: 36, height: 80 },
      { type: 'glass', quantity: 2, width: 34, height: 78 },
      { type: 'handle', quantity: 1 },
      { type: 'lock', quantity: 1 }
    ]
  },
  {
    name: 'Storefront Window (EC500)',
    image: 'assets/images/ec500-storefront.png',
    salePrice: 400,
    requiredParts: [
      { type: 'frame', quantity: 2, width: 36, height: 72 },
      { type: 'glass', quantity: 3, width: 34, height: 70 }
    ]
  },
  {
    name: 'Commercial French Door (EC600)',
    image: 'assets/images/ec600-frenchdoor.png',
    salePrice: 420,
    requiredParts: [
      { type: 'frame', quantity: 2, width: 36, height: 80 },
      { type: 'glass', quantity: 2, width: 34, height: 78 },
      { type: 'handle', quantity: 2 },
      { type: 'lock', quantity: 2 }
    ]
  },
  {
    name: 'Out-Swing Door (EC650)',
    image: 'assets/images/ec650-outswing.png',
    salePrice: 360,
    requiredParts: [
      { type: 'frame', quantity: 1, width: 36, height: 80 },
      { type: 'glass', quantity: 1, width: 34, height: 78 },
      { type: 'handle', quantity: 1 },
      { type: 'lock', quantity: 1 }
    ]
  },
  {
    name: 'Casement Window (EC700)',
    image: 'assets/images/ec700-casementwindow.png',
    salePrice: 280,
    requiredParts: [
      { type: 'frame', quantity: 1, width: 30, height: 36 },
      { type: 'glass', quantity: 1, width: 28, height: 34 },
      { type: 'handle', quantity: 1 }
    ]
  }
];
// ✅ Selected + result state
productResults: {
  [productName: string]: {
    buildableUnits: number;
    totalCost: number;
    revenue: number;
    profit: number;
    missingParts: string[];
    partBreakdown: {
      type: string;
      width?: number;
      height?: number;
      requiredPerUnit: number;
      totalAvailable: number;
      used: number;
      leftover: number;
    }[];
  };
} = {};


  selectedProduct: ProductBlueprint | null = null;

  result: {
    buildableUnits: number;
    totalCost: number;
    revenue: number;
    profit: number;
  } | null = null;

  // ✅ Select a product
  selectProduct(product: ProductBlueprint) {
      console.log('Selected:', product.name);
    this.selectedProduct = product;
    this.calculateBuildableUnits(product);
  }


  calculateAll(): void {
  this.products.forEach(product => {
    let buildableUnits = Infinity;
    let totalCost = 0;
    const missingParts: string[] = [];

    const partBreakdown = product.requiredParts.map(required => {
      const matches = this.inventory.filter(inv =>
        inv.type === required.type &&
        (!required.width || inv.width === required.width) &&
        (!required.height || inv.height === required.height)
      );

      const totalQty = matches.reduce((sum, i) => sum + i.qty, 0);
      const possibleUnits = Math.floor(totalQty / required.quantity);

      if (possibleUnits === 0) {
        const dims = required.width && required.height
          ? ` ${required.width}x${required.height}`
          : '';
        missingParts.push(`${required.type}${dims}`);
      }

      buildableUnits = Math.min(buildableUnits, possibleUnits);
      totalCost += matches.reduce((sum, i) => sum + (i.unitCost * i.qty), 0);

      const usedQty = required.quantity * buildableUnits;
      const leftover = totalQty - usedQty;

      return {
        type: required.type,
        width: required.width,
        height: required.height,
        requiredPerUnit: required.quantity,
        totalAvailable: totalQty,
        used: usedQty,
        leftover
      };
    });

    const revenue = product.salePrice * buildableUnits;
    const profit = revenue - totalCost;

    this.productResults[product.name] = {
      buildableUnits,
      totalCost,
      revenue,
      profit,
      missingParts,
      partBreakdown
    };
  });
}


  // ✅ Calculation logic
  calculateBuildableUnits(product: ProductBlueprint) {
    let buildableUnits = Infinity;
    let totalCost = 0;

    for (const required of product.requiredParts) {
      const matches = this.inventory.filter(inv =>
        inv.type === required.type &&
        (!required.width || inv.width === required.width) &&
        (!required.height || inv.height === required.height)
      );

      const totalQty = matches.reduce((sum, i) => sum + i.qty, 0);
      const units = Math.floor(totalQty / required.quantity);
      buildableUnits = Math.min(buildableUnits, units);

      const cost = matches.reduce((sum, i) => sum + (i.unitCost * i.qty), 0);
      totalCost += cost;
    }

    const revenue = product.salePrice * buildableUnits;
    const profit = revenue - totalCost;

    this.result = {
      buildableUnits,
      totalCost,
      revenue,
      profit
    };
     console.log('RESULT:', this.result);
  }

  getMatchingInventoryQty(
  type: string,
  width?: number,
  height?: number
): number {
  return this.inventory
    .filter(inv =>
      inv.type === type &&
      (width ? inv.width === width : true) &&
      (height ? inv.height === height : true)
    )
    .reduce((sum, item) => sum + item.qty, 0);
}
}