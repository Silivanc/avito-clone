export enum AdTypes {
  Nedvizhimost = "Недвижимость",
  Transport = "Авто",
  Uslugi = "Услуги",
}

export interface IAd {
  id: number;
  name: string;
  description: string;
  location: string;
  image?: string;
}

export interface INedvizhimost {
  type: AdTypes.Nedvizhimost;
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

export interface IFullNedvizhimost extends IAd, INedvizhimost {}

export interface ITransport {
  type: AdTypes.Transport;
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

export interface IFullTransport extends IAd, ITransport {}

export interface IUslugi {
  type: AdTypes.Uslugi;
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
}

export interface IFullUslugi extends IAd, IUslugi {}

export type Ad = IFullNedvizhimost | IFullTransport | IFullUslugi;
export type Ads = Ad[];
