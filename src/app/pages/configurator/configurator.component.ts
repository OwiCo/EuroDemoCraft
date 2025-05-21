import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlassForgeEngineService } from '../../core/services/glassforge-engine.service';
import { AluminumRod } from '../../Models/rod';
import { PartRequirement } from '../../Models/part-requirement';
import { InventoryService } from '../../core/services/inventory.service';

@Component({
  selector: 'app-configurator',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ THIS FIXES ALL YOUR ERRORS
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css']
})
export class ConfiguratorComponent {
  unitCount: number = 1;

  products = [
    { name: 'EuroSlide Door', id: 'euro' },
    { name: 'ThermaPane Window', id: 'therma' }
  ];

  selectedProduct: any = null;
  width: number = 0;
  height: number = 0;

  buildResult: any = null;

constructor(
  private engine: GlassForgeEngineService,
  private inventoryService: InventoryService
) {}


generateEstimate() {
  const expandedCutPlan: PartRequirement[] = [];

for (const part of this.cutPlan) {
  expandedCutPlan.push({
    ...part,
    quantity: part.quantity * this.unitCount
  });
}

this.buildResult = this.engine.calculateBuildableUnits(expandedCutPlan, this.inventory);

}

 get inventory(): AluminumRod[] {
  return this.inventoryService.getInventory();
}

cutPlan: PartRequirement[] = [
  { partType: 'FrameVertical', requiredLengthMM: 2100, quantity: 2, profile: 'U' },
  { partType: 'FrameHorizontal', requiredLengthMM: 800, quantity: 2, profile: 'C' },
  { partType: 'GlassPanel', requiredLengthMM: 1950, quantity: 1, profile: 'Flat' }
];

}
