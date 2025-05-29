export interface Attack {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
}

export interface Weakness {
  type: string;
  value: string;
}

export interface Resistance {
  type: string;
  value: string;
}

export interface Ability {
  name: string;
  text: string;
  type: string;
}

export interface PokemonCard {
  id: string;
  name: string;
  imageUrl: string;
  imageUrlHiRes: string;
  supertype: string;
  subtype: string;
  hp: string;
  number: string;
  artist: string;
  rarity: string;
  series: string;
  set: string;
  setCode: string;
  text: string[];

  // 🔽 เพิ่ม property ที่ขาด
  type?: string;
  nationalPokedexNumber?: number;
  retreatCost?: string[];
  convertedRetreatCost?: number;
  ability?: Ability;
  attacks?: Attack[];
  weaknesses?: Weakness[];
  resistances?: Resistance[];

  // 🔽 ค่าที่คำนวณเพิ่มเข้าไป
  hpLevel?: number;
  strengthLevel?: number;
  weaknessLevel?: number;
  damage?: number;
  happiness?: number;
}

