export type ComponentType = 'frame' | 'glass' | 'handle' | 'lock';

export interface ProductPart {
  type: ComponentType;
  quantity: number;
  width?: number;
  height?: number;
  length?: number;
}

export interface ProductBlueprint {
  name: string;
  image: string;
  salePrice: number;
  requiredParts: ProductPart[];
}
