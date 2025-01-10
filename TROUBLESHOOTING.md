# Troubleshooting Guide

## Common Issues and Solutions

### 1. Webhook Verification Fails

**Problem**: Meta webhook verification fails during setup.

**Solutions**:
- Ensure the Google Apps Script is deployed as a web app
- Check that the access is set to "Anyone"
- Verify the webhook URL is correct
- Try re-deploying the web app with a new version

### 2. Leads Not Being Recorded

**Problem**: Form submissions aren't appearing in the spreadsheet.

**Solutions**:
- Check the spreadsheet ID in the code matches your spreadsheet
- Verify the sheet name is exactly "Leads"
- Check script execution logs for errors
- Ensure the webhook is properly connected in Meta

### 3. Permission Errors

**Problem**: Script throws permission errors.

**Solutions**:
- Run the setupSheet() function manually first
- Ensure you're using the correct Google account
- Check spreadsheet sharing settings
- Re-authorize the script if prompted

### 4. Malformed Data

**Problem**: Data appears incorrect or incomplete in the spreadsheet.

**Solutions**:
- Check the form field mappings in Meta
- Verify the JSON parsing in the code
- Look for special characters that might cause issues
- Check the webhook payload format

### 5. Script Timeouts

**Problem**: Script execution times out with large volumes.

**Solutions**:
- Optimize the code for batch processing
- Implement queuing for high-volume periods
- Consider using batch updates instead of appendRow
- Split processing into smaller chunks

## Debugging Tips

1. Use Console Logging
```javascript
console.log('Received data:', JSON.stringify(data));
```

2. Check Execution Logs
- In Script Editor: View > Execution Log

3. Test Webhook Manually
- Use tools like Postman to send test requests

4. Monitor Quotas
- Check Google Apps Script quotas
- Monitor Meta webhook limits

## Getting Help

If you're still experiencing issues:

1. Check the execution logs in Google Apps Script
2. Review Meta's webhook documentation
3. Open an issue in the repository
4. Include relevant error messages and logs

## Performance Optimization

If handling large volumes of leads:

1. Use batch updates instead of single rows
2. Implement caching where appropriate
3. Set up error handling and retries
4. Consider implementing a queue system