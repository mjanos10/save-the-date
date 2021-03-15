type YesNo = '' | 'yes' | 'no';

export interface PageData {
  isLoading: boolean;
  loadError: null | Error;
  canBringPlusOne: boolean;
  askChildren: boolean;
  people: string[];
  peopleCount: number;
  multipleChildren: boolean;
  submitLoading: boolean;
  submitError: null | Error;
  // Form Data
  isComing: YesNo;
  plusOne: YesNo;
  requiresAccommodation: YesNo;
  hasAllergy: YesNo;
  allergyDesc: string;
  bringingChildren: YesNo;
  childrenDesc: string;
  message: string;
}
