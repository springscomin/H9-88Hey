export interface ExterierColorsProps {
  id: number;
  name: string;
  carImagePath: string;
  colorImageUrl: string;
  additionalPrice: number;
  availableInteriorColors: number[];
  tags: string[];
}

export interface InteriorColorsProps {
  id: number;
  name: string;
  carImageUrl: string;
  colorImageUrl: string;
  tags: string[];
}

export interface ColorDataProps {
  exterierColors: ExterierColorsProps[];
  interiorColors: InteriorColorsProps[];
}
