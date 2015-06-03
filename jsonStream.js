/*
    jsonStream.js
    Stream & stringify version of jsonParse.js
    To run: node jsonStream.js [JSON source file] [options: contact|address|account|customer]
    Result is printed out on console.
*/
var fs = require('fs'),
    readline = require('linebyline');

if (!process.argv[2]) {
  console.log('Please specify the source file in the following format:');
  console.log('node jsonStream.js [JSON source file] [options: contact|address|account|customer] > [output filename]');
  process.exit();
}

  var jsonData = process.argv[2];
  printHeader(process.argv[3]);

  // parse line by line here
  var rl = readline(jsonData);
  rl.on('line', function(line, lineCount, byteCount) {
    // console.log('Parsing line #'+lineCount+', reading '+byteCount);
    var regex = /({"AccountHolderId":.*"}]})([,|(\]}})?]*$)/i;
    var jsonLine = line.match(regex);
    var jsonObject = JSON.parse(jsonLine[1]);

    switch (process.argv[3]) {
      case 'contact':
        extractContact(jsonObject);
        break;
      case 'address':
        extractAddress(jsonObject);
        break;
      case 'account':
        extractAccount(jsonObject);
        break;
      default:
        // return customer information
        extractCustomer(jsonObject);
        break;
    }
  })

function printHeader(dataType){
  switch (dataType) {
    case 'contact':
      contactHeader();
      break;
    case 'address':
      addressHeader();
      break;
    case 'account':
      accountHeader();
      break;
    default:
      // return customer information
      customerHeader();
  }
}

function contactHeader(){
  console.log(
    'AccountHolderId' + ',' +
    'TelNo' + ',' +
    'TypeId' + ',' +
    'PrimaryFlag' + ',' +
    'TelPtr' + ',' +
    'Superseded');
}

function extractContact(customer){
  for (var i=0; i<customer.Contact.length; i++){
    var contact = customer.Contact[i];
    console.log(
      customer.AccountHolderId + ',' +
      contact.DebtorTelNo_TelNo + ',' +
      contact.DebtorTelNo_TypeId + ',' +
      contact.DebtorTelNo_PrimaryFlag + ',' +
      contact.DebtorTelNo_TelPtr + ',' +
      contact.DebtorTelNo_Superseded);
  }
}

function addressHeader(){
  console.log(
    'AccountHolderId' + ',' +
    'AddressPtr' + ',' +
    'Line1' + ',' +
    'Line2' + ',' +
    'Line3' + ',' +
    'Line4' + ',' +
    'Line5' + ',' +
    'Addres_City' + ',' +
    'Country' + ',' +
    'PostCode' + ',' +
    'PrimaryFlag' + ',' +
    'Superseded');
}

function extractAddress(customer){

  for (var i=0; i<customer.Address.length; i++){
    var contact = customer.Address[i];
    // console.log(contact);
    // contact.forEach(function(key, value){
    //   console.log(value);
    // });

    console.log(
      customer.AccountHolderId + ',' +
      contact.Address_AddressPtr + ',' +
      contact.Address_Line1 + ',' +
      contact.Address_Line2 + ',' +
      contact.Address_Line3 + ',' +
      contact.Address_Line4 + ',' +
      contact.Address_Line5 + ',' +
      contact.Addres_City + ',' +
      contact.Address_Country + ',' +
      contact.Address_PostCode + ',' +
      contact.Address_PrimaryFlag + ',' +
      contact.Address_Superseded);
  }
}

function accountHeader(){
  console.log(
    'AccountHolderId' + ',' +
    'Debtor_DebtorId ' + ',' +
    'Debtor_Balance ' + ',' +
    'Debtor_AccountType' + ',' +
    'Client_ClientLetterName' + ',' +
    'Debtor_AccountNo' + ',' +
    'Debtor_AlternateAcc' + ',' +
    'Debtor_AutoActionCollectRateId' + ',' +
    'Debtor_AutoActionRateVersion' + ',' +
    'BrokenPromise' + ',' +
    'DebtorArrangement_NextPayDate' + ',' +
    'DebtorArrangement_InstalmentAmount' + ',' +
    'LastPaymentDate' + ',' +
    'LastPaymentAmount' + ',' +
    'LastPaymentAction' + ',' +
    'Strategy_StrategyBand' + ',' +
    'PropensityToPayScore' + ',' +
    'Debtor_DebtorStatusId' + ',' +
    'Debtor_MatterType' + ',' +
    'PurchaseDate' + ',' +
    'ArrangementPromises' + ',' +
    'ArrangementBrokenPromises' + ',' +
    'ArrangementLastBrokenPromise' + ',' +
    'ArrangementsRepayments' + ',' +
    'ArrangementBrokenRepayments' + ',' +
    'ArrangementLastBroken' + ',' +
    'ContactsLast4Months' + ',' +
    'ContactsLastType' + ',' +
    'ContactLastDate' + ',' +
    'DebtorEmploymentDetail_Employer' + ',' +
    'DebtorEmploymentDetail_Address' + ',' +
    'DebtorEmploymentDetasil_PostCode' + ',' +
    'DDFailedDate' + ',' +
    'BACSPaymentMID_MerchantId');
}

function extractAccount(customer){
  for (var i=0; i<customer.Account.length; i++){
    var contact = customer.Account[i];
    console.log(
      customer.AccountHolderId + ',' +
      contact.Debtor_DebtorId + ',' +
      contact.Debtor_Balance + ',' +
      contact.Debtor_AccountType + ',' +
      contact.Client_ClientLetterName + ',' +
      contact.Debtor_AccountNo + ',' +
      contact.Debtor_AlternateAcc + ',' +
      contact.Debtor_AutoActionCollectRateId + ',' +
      contact.Debtor_AutoActionRateVersion + ',' +
      contact.BrokenPromise + ',' +
      contact.DebtorArrangement_NextPayDate + ',' +
      contact.DebtorArrangement_InstalmentAmount + ',' +
      contact.LastPaymentDate + ',' +
      contact.LastPaymentAmount + ',' +
      contact.LastPaymentAction + ',' +
      contact.Strategy_StrategyBand + ',' +
      contact.PropensityToPayScore + ',' +
      contact.Debtor_DebtorStatusId + ',' +
      contact.Debtor_MatterType + ',' +
      contact.PurchaseDate + ',' +
      contact.ArrangementPromises + ',' +
      contact.ArrangementBrokenPromises + ',' +
      contact.ArrangementLastBrokenPromise + ',' +
      contact.ArrangementsRepayments + ',' +
      contact.ArrangementBrokenRepayments + ',' +
      contact.ArrangementLastBroken + ',' +
      contact.ContactsLast4Months + ',' +
      contact.ContactsLastType + ',' +
      contact.ContactLastDate + ',' +
      contact.DebtorEmploymentDetail_Employer + ',' +
      contact.DebtorEmploymentDetail_Address + ',' +
      contact.DebtorEmploymentDetasil_PostCode + ',' +
      contact.DDFailedDate + ',' +
      contact.BACSPaymentMID_MerchantId);
  }
}

function customerHeader(){
  console.log(
    'AccountHolderId' + ',' +
    'Debtor_DebtorTitle' + ',' +
    'Debtor_Forename' + ',' +
    'Debtor_Surname' + ',' +
    'Debtor_DateofBirth');
}

function extractCustomer(customer){
    console.log(
      customer.AccountHolderId + ',' +
      customer.Debtor_DebtorTitle + ',' +
      customer.Debtor_Forename + ',' +
      customer.Debtor_Surname + ',' +
      customer.Debtor_DateofBirth);
}
