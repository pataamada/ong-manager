export interface INotificationTranferPix {
    event: string;
    transfer: Transfer;
  }
  
  interface Transfer {
    object: string;
    id: string;
    dateCreated: string;
    status: string;
    effectiveDate: null;
    endToEndIdentifier: null;
    type: string;
    value: number;
    netValue: number;
    transferFee: number;
    scheduleDate: string;
    authorized: boolean;
    failReason: null;
    transactionReceiptUrl: null;
    bankAccount: BankAccount;
    operationType: string;
    description: string;
  }
  
  interface BankAccount {
    bank: Bank;
    accountName: string;
    ownerName: string;
    cpfCnpj: string;
    agency: string;
    agencyDigit: string;
    account: string;
    accountDigit: string;
    pixAddressKey: string;
  }
  
  interface Bank {
    ispb: string;
    code: string;
    name: string;
  }