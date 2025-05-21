import { Injectable } from '@angular/core';
import { CutRecord, AluminumRod } from '../../Models/rod';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private rods: AluminumRod[] = [
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


applyCuts(cutResults: { rodId: string, cuts: CutRecord[] }[]): void {
  for (const used of cutResults) {
    const rod = this.rods.find(r => r.id === used.rodId);
    if (rod) {
      for (const cut of used.cuts) {
        rod.availableLengthMM -= cut.lengthMM;
        rod.usedCuts.push(cut);
      }
    }
  }
}

  getInventory(): AluminumRod[] {
    return this.rods;
  }

  addRod(rod: AluminumRod): void {
    this.rods.push(rod);
  }

  clearInventory(): void {
    this.rods = [];
  }
}
