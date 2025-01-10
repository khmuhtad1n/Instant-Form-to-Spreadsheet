/**
 * Meta Lead Forms to Google Sheets Integration
 * This script creates a webhook endpoint to receive Meta Lead Form submissions
 * and automatically stores them in a Google Spreadsheet.
 */

// Configuration
const CONFIG = {
  SPREADSHEET_ID: 'ENTER_YOUR_SPREADSHEET_ID',
  SHEET_NAME: 'Leads'
};

/**
 * Handles POST requests from Meta webhook
 * @param {Object} e - Event object containing POST data
 * @return {TextOutput} JSON response indicating success or failure
 */
function doPost(e) {
  try {
    // Open spreadsheet and target sheet
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    
    // Parse incoming webhook data
    const data = JSON.parse(e.postData.contents);
    
    // Format lead data for spreadsheet
    const leadData = [
      new Date(),           // Current timestamp
      data.form_id,         // Meta Form ID
      data.leadgen_id,      // Lead ID
      data.created_time,    // Creation timestamp
      data.page_id,         // Facebook Page ID
      data.adgroup_id,      // Ad Group ID
      data.campaign_id,     // Campaign ID
      data.platform,        // Platform
      JSON.stringify(data.field_data) // Form field data
    ];
    
    // Append data to spreadsheet
    sheet.appendRow(leadData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Lead successfully stored'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Log error for debugging
    console.error('Error processing lead:', error);
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sets up the spreadsheet with required headers
 * Run this function once before using the webhook
 */
function setupSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);
  
  // Define column headers
  const headers = [
    'Timestamp',
    'Form ID',
    'Lead ID',
    'Created Time',
    'Page ID',
    'Ad Group ID',
    'Campaign ID',
    'Platform',
    'Form Data'
  ];
  
  // Set headers in first row
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#f3f3f3');
    
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}

/**
 * Optional: Add custom triggers
 * Example: Daily summary email
 */
function setupTriggers() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create daily summary trigger
  ScriptApp.newTrigger('sendDailySummary')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
}

/**
 * Optional: Send daily summary email
 * Customize this function based on your needs
 */
function sendDailySummary() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  // Get yesterday's leads
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Count new leads
  // Add your summary logic here
  
  // Send email
  // Uncomment and customize this section
  /*
  MailApp.sendEmail({
    to: "your-email@domain.com",
    subject: "Daily Leads Summary",
    body: "Your summary message here"
  });
  */
}