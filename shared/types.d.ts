export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse<E = Error> {
  success: false;
  error: E;
}

export type Response<T, E = Error> = SuccessResponse<T> | ErrorResponse<E>;

export type AirtableYesNo = "" | "igen" | "nem";
export type AirtableYesNoUnsure = AirtableYesNo | "nem tudja";
export type FormYesNo = "" | "yes" | "no";
export type FormYesNoUnsure = FormYesNo | "not-sure";

export interface UpdatableAirtableRecord {
  Jön: AirtableYesNoUnsure;
  "Hoz gyereket?": AirtableYesNo;
  "Gyerek leírás"?: string;
  "Kér szállást?": AirtableYesNo;
  "Hoz +1-et?": AirtableYesNoUnsure;
  "Kér spec. ételt?": AirtableYesNo;
  "Spec. étel kívánság"?: string;
  Üzenet?: string;
}

export interface AirtableRecord extends UpdatableAirtableRecord {
  Ismertető: string;
  Csoport: string;
  Név1: string;
  Név2: string;
  Név3: string;
  Név4: string;
  Név5: string;
  Gyerekes: boolean;
  "Több gyerekes": boolean;
}

export interface Settings {
  canBringPlusOne: boolean;
  askChildren: boolean;
  people: string[];
  peopleCount: number;
  multipleChildren: boolean;
}

export interface FormData {
  isComing: FormYesNoUnsure;
  plusOne?: FormYesNoUnsure;
  requiresAccommodation?: FormYesNo;
  hasSpecialDietaryNeeds?: FormYesNo;
  specialDietaryNeedsDesc?: string;
  bringingChildren?: FormYesNo;
  childrenDesc?: string;
  message?: string;
}

export type SharedRecord = Settings & FormData;

export interface PageData extends SharedRecord {
  id: string;
  isLoading: boolean;
  loadError: null | Error;

  submitLoading: boolean;
  submitError: null | Error;
}
