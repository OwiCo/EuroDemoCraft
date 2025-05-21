import { Injectable } from '@angular/core';
import { AluminumRod, CutRecord } from '../../Models/rod';
import { PartRequirement } from '../../Models/part-requirement';

@Injectable({
  providedIn: 'root'
})
export class GlassForgeEngineService {

  constructor() {}

  calculateBuildableUnits(cutPlan: PartRequirement[], inventory: AluminumRod[]) {
    const usedRods: { rodId: string, cuts: CutRecord[] }[] = [];
    const missing: PartRequirement[] = [];
    const leftover: { rodId: string, remainingMM: number }[] = [];

    // Clone inventory to avoid mutating real state
    const workingInventory = JSON.parse(JSON.stringify(inventory)) as AluminumRod[];

    for (const part of cutPlan) {
      let qtyToCut = part.quantity;

      for (const rod of workingInventory.filter(r => r.profile === part.profile)) {
        while (qtyToCut > 0 && rod.availableLengthMM >= part.requiredLengthMM) {
          // Perform cut
          rod.availableLengthMM -= part.requiredLengthMM;
          qtyToCut--;

          const existingRod = usedRods.find(r => r.rodId === rod.id);
          const cutRecord: CutRecord = {
            partId: part.partType,
            lengthMM: part.requiredLengthMM,
            timestamp: new Date()
          };

          if (existingRod) {
            existingRod.cuts.push(cutRecord);
          } else {
            usedRods.push({ rodId: rod.id, cuts: [cutRecord] });
          }
        }
      }

      if (qtyToCut > 0) {
        missing.push({ ...part, quantity: qtyToCut });
      }
    }

    for (const rod of workingInventory) {
      const delta = rod.availableLengthMM;
      if (delta < rod.lengthMM) {
        leftover.push({ rodId: rod.id, remainingMM: delta });
      }
    }

    const unitsBuildable = missing.length === 0 ? 1 : 0;

    return {
      unitsBuildable,
      used: usedRods,
      missing,
      leftover
    };
  }
}
