/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Page = 'home' | 'registration' | 'partners' | 'contact';

export interface Address {
  thana: string;
  upazilla: string;
  postOffice: string;
  district: string;
  other?: string;
}

export type Category = 'present' | 'ex';
export type UserType = 'student' | 'teacher';

export interface RegistrationData {
  nameEng: string;
  nameBan: string;
  mobile: string;
  email?: string;
  presentAddress: Address;
  permanentAddress: Address;
  userType: UserType;
  category: Category;
  // Student specific
  sscBatch?: string;
  group?: 'science' | 'arts' | 'commerce';
  fee: number;
}
