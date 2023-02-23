export interface Contact {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  emails: Email[];
  phones: Phone[];
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface Email {
  id: number;
  contactId: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Phone {
  id: number;
  contactId: number;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: number;
  contactId: number;
  address: string;
  createdAt: string;
  updatedAt: string;
}
