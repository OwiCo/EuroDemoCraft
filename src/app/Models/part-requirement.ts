export interface PartRequirement {
  partType: 'FrameVertical' | 'FrameHorizontal' | 'GlassPanel' | 'Handle' | 'Lock';
  requiredLengthMM: number;
  quantity: number;
  profile: string;
}
