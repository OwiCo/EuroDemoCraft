export interface AluminumRod {
  id: string;
  profile: 'U' | 'C' | 'T' | 'Z';
  finish: 'Clear' | 'Bronze' | 'Black';
  lengthMM: number;
  availableLengthMM: number;
  usedCuts: CutRecord[];
}

export interface CutRecord {
  partId: string;
  lengthMM: number;
  timestamp: Date;
}
