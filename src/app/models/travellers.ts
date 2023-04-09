import {TestPCR} from './test';

export class Travellers {
  id: number;
  code: string;
  firstname: string;
  lastname: string;
  sexe: string;
  birthdate: string;
  phone: string;
  email: string;
  nationality: string;
  contactName: string;
  contactPhone: string;
  contactAddress: string;
  documentType: string;
  documentSerial: string;
  documentFile: string;
  travelType: string;
  company: string
  flightNumber: string;
  provenanceCountry: string
  originCountry: string;
  visitedCountries: [];
  travelMotif: string
  isTestPCR: boolean;
  dateTestPCR: Date;
  testDocumentFile: any[];
  testDocumentType: string;
}
