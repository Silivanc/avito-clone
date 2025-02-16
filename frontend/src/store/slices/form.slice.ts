import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAd,
  AdTypes,
  INedvizhimost,
  ITransport,
  IUslugi,
} from "../../types/ad.types";

type GeneralInfo = Partial<IAd> & { type?: AdTypes };

export const initialState = {
  general: {
    name: "",
    description: "",
    location: "",
    image: "",
    type: AdTypes.Nedvizhimost,
  },
  nedvizhimost: {
    propertyType: "",
    area: undefined as number | undefined,
    rooms: undefined as number | undefined,
    price: undefined as number | undefined,
  },
  transport: {
    brand: "",
    model: "",
    year: undefined as number | undefined,
    mileage: undefined as number | undefined,
  },
  uslugi: {
    serviceType: "",
    experience: undefined as number | undefined,
    cost: undefined as number | undefined,
    workSchedule: undefined as string | undefined,
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setGeneralInfo: (state, action: PayloadAction<GeneralInfo>) => {
      state.general = { ...state.general, ...action.payload };
    },
    setNedvizhimostInfo: (
      state,
      action: PayloadAction<Partial<INedvizhimost>>,
    ) => {
      state.nedvizhimost = { ...state.nedvizhimost, ...action.payload };
    },
    setTransportInfo: (state, action: PayloadAction<Partial<ITransport>>) => {
      state.transport = { ...state.transport, ...action.payload };
    },
    setUslugiInfo: (state, action: PayloadAction<Partial<IUslugi>>) => {
      state.uslugi = { ...state.uslugi, ...action.payload };
    },
    resetFormAction: (state) => {
      state.general = initialState.general;
      state.nedvizhimost = initialState.nedvizhimost;
      state.transport = initialState.transport;
      state.uslugi = initialState.uslugi;
    },
  },
});

export const {
  setGeneralInfo,
  setNedvizhimostInfo,
  setTransportInfo,
  setUslugiInfo,
  resetFormAction,
} = formSlice.actions;
export default formSlice.reducer;
