import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AluminumRod } from '../../Models/rod';
import { InventoryService } from '../../core/services/inventory.service';


@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent {
  constructor(private inventoryService: InventoryService) {}

ngOnInit() {
  this.rods = this.inventoryService.getInventory();
}

  rods: AluminumRod[] = [
    {
      id: 'Rod-A1',
      profile: 'U',
      finish: 'Clear',
      lengthMM: 6000,
      availableLengthMM: 6000,
      usedCuts: []
    },
    {
      id: 'Rod-B1',
      profile: 'C',
      finish: 'Black',
      lengthMM: 4800,
      availableLengthMM: 4800,
      usedCuts: []
    }
  ];

  newRod: Partial<AluminumRod> = {
    id: '',
    profile: 'U',
    finish: 'Clear',
    lengthMM: 0
  };

  addRod() {
    if (this.newRod.id && this.newRod.lengthMM) {
this.inventoryService.addRod({
  ...this.newRod as AluminumRod,
  availableLengthMM: this.newRod.lengthMM!,
  usedCuts: []
});
this.rods = this.inventoryService.getInventory(); // Refresh UI

    }
  }
}
