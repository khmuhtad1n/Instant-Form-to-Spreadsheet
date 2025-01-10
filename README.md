# Meta Lead Forms to Google Sheets Integration

Automatically capture and store Meta (Facebook) Instant Form leads in Google Sheets using Google Apps Script. This integration provides a free solution to automatically collect leads from your Meta Lead Forms.

## Features

- Real-time lead capture from Meta Instant Forms
- Automatic storage in Google Sheets
- Captures comprehensive lead data including:
  - Form submission timestamp
  - Form and Lead IDs
  - Campaign, Ad Group, and Page information
  - All form field responses
- Free to use (only requires Google account)
- No third-party services needed

## Setup Instructions

### 1. Google Sheets Setup

1. Create a new Google Spreadsheet
2. Note down the Spreadsheet ID from the URL (the part between /d/ and /edit)
3. Create a sheet named "Leads" (will be created automatically by the setup script)

### 2. Google Apps Script Setup

1. In your Google Spreadsheet, go to Tools > Script editor
2. Copy and paste the code from `Code.gs`
3. Replace `ENTER_YOUR_SPREADSHEET_ID` with your actual spreadsheet ID
4. Run the `setupSheet()` function to initialize the headers
5. Deploy as web app:
   - Click Deploy > New deployment
   - Choose "Web app" as deployment type
   - Set access to "Anyone"
   - Copy the provided web app URL

### 3. Meta Lead Forms Setup

1. Go to Facebook Business Settings
2. Navigate to Leads Access
3. Add a new webhook
4. Enter the Google Apps Script web app URL
5. Complete webhook verification
6. Select the pages and forms to connect

## Implementation Details

The integration uses Google Apps Script to create a webhook endpoint that receives lead data from Meta. When a new lead is submitted:

1. Meta sends the lead data to your Google Apps Script webhook
2. The script processes and formats the data
3. Data is automatically appended to your Google Sheet
4. A success/error response is sent back to Meta

## Data Structure

The script creates the following columns in your spreadsheet:

| Column | Description |
|--------|-------------|
| Timestamp | When the lead was received by the script |
| Form ID | Meta Lead Form identifier |
| Lead ID | Unique lead identifier |
| Created Time | When the lead was created in Meta |
| Page ID | Facebook Page identifier |
| Ad Group ID | Associated ad group |
| Campaign ID | Associated campaign |
| Platform | Source platform |
| Form Data | JSON string containing all form fields |

## Troubleshooting

See `TROUBLESHOOTING.md` for common issues and solutions.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
