/*
  This is the response that is received:
  ---------------------------------------

<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
     <VerifyEmailResponse xmlns="http://ws.cdyne.com/">
       <VerifyEmailResult>
         <ResponseText>Mail Server will accept email</ResponseText>
         <ResponseCode>3</ResponseCode>
         <LastMailServer>in.mx.linuxsystems.be</LastMailServer>
         <GoodEmail>true</GoodEmail>
       </VerifyEmailResult>
     </VerifyEmailResponse>
   </soap:Body>
</soap:Envelope>

<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
<ns2:setCustomerAccountNumberResponse xmlns:ns2="http://www.telrock.com/tas">
<return>Account number updated for customer 4</return>
</ns2:setCustomerAccountNumberResponse>
</soap:Body>
</soap:Envelope>
*/

// E4X needs to get rid of the <xml> header for security reasons...
// See also: bug 336551, https://bugzilla.mozilla.org/show_bug.cgi?id=336551
//
// XML return does not contain header so don't need this line
// responseXml = responseXml.replace(/^<\?xml\s+version\s*=\s*(["'])[^\1]+\1[^?]*\?>/, "");
var response = new XML(responseXml);

// Determine the namespace of the SOAP Envelope:
//
var soap = response.namespace();

// Specify the namespace of the verify email response:
//
var ws = response.*.*.namespace(); // OR: new Namespace("http://ws.cdyne.com/");

// Set this namespace as a default to make parsing the response easier:
//
default xml namespace = ws

// Grab the body inside the SOAP response:
//
var responseBody = response.soap::Body;

// Use the following format to parse the response body, the payload of the SOAP response:
//
// var memberElement = responseBody.someElement;
// var memberAttribute = responseBody.@someAttribute;
//
var responseText = responseBody;

responseBody.removeNamespace(ws);
responseBody.removeNamespace(soap);

var xmlns = new Namespace("http://ws.cdyne.com/");
responseBody.removeNamespace(xmlns);

if (statusCode == 200){
  Alert(responseText.toXMLString());
}
else {
  // expect statusCode == 50
  Alert("setCustomerAccountNumber failed!");
}
