# Google Sheets Lead Capture Setup
# Yeh karo step by step — 10 minute ka kaam hai

## Step 1: Google Sheet banao
1. sheets.google.com pe jao
2. New Sheet banao — naam do: "ShopMERN Leads"
3. Row 1 mein yeh headers daalo (A1 se):
   A1: Timestamp
   B1: Naam
   C1: Mobile
   D1: Shehar
   E1: Business Type
   F1: Requirement
   G1: Budget
   H1: Source

## Step 2: Apps Script banao
1. Sheet mein jao → Extensions → Apps Script
2. Poora purana code delete karo
3. Yeh code paste karo:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.name || '',
      data.mobile || '',
      data.city || '',
      data.businessType || '',
      data.requirement || '',
      data.budget || '',
      data.source || 'Landing Page'
    ]);
    
    // Optional: Email notification
    // MailApp.sendEmail('aapka@email.com', 'New Lead: ' + data.name, 
    //   'Name: ' + data.name + '\nMobile: ' + data.mobile + '\nCity: ' + data.city);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('ShopMERN Lead Capture Active');
}
```

## Step 3: Deploy karein
1. "Deploy" button click karein → "New Deployment"
2. Type: "Web app" select karein
3. Execute as: "Me" 
4. Who has access: "Anyone" (zaroori hai!)
5. Deploy click karein → Permissions allow karein
6. URL copy karein — yeh aapka GOOGLE_SCRIPT_URL hai

## Step 4: LandingPage.js mein URL daalo
File: frontend/src/pages/LandingPage.js
Line 4 mein:
```
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycda8VwxbGTbLi1uX0N5HVsqCGNNHCCYObp9WTOQRKdiP-cicjS1WhhgCfU8crvbbdLQ/exec';
```
Apna actual URL yahan paste karein.

## Step 5: WhatsApp number update karein
LandingPage.js mein "918104969906" dhundho aur apna number daalo.
Format: 91XXXXXXXXXX (country code + number, no spaces)

## ✅ Test kaise karein
1. Landing page kholo: localhost:3000/get-website
2. Form bharo aur submit karo
3. Google Sheet check karo — data aa jaana chahiye!

## Email Notification (Optional)
Apps Script mein yeh uncomment karo aur apna email daalo:
MailApp.sendEmail('aapka@email.com', ...)
Har naye lead pe aapko email aayega!
