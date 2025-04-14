# Halachik Poultry Farm Investment Website

## Form Setup Instructions

The contact form on this website is configured to:
1. Save submissions to a CSV file
2. Send email notifications to the admin
3. Redirect users to a thank-you page after submission

### Configuration Steps

1. **Update Admin Email**:
   - Open `index.html` and find the form with `id="whitelist-form"`
   - Replace `your-email@example.com` in the `action` attribute with your actual email address
   - Also update the same email in the `script.js` file in the `initFormSubmission` function

2. **Domain Configuration**:
   - If you're hosting the site on a custom domain, update the `_next` hidden field value in the form
   - Replace `yourdomain.com` with your actual domain
   - The JavaScript will attempt to do this automatically, but it's good to set it manually as well

3. **Optional: Configure CC Email**:
   - If you want to send a copy of submissions to another email, update the `_cc` hidden field

4. **Optional: Customize Auto-Response**:
   - You can customize the auto-response message sent to users by editing the `_autoresponse` hidden field

### How It Works

1. When a user submits the form, the data is sent to FormSubmit.co
2. FormSubmit processes the submission and:
   - Saves the data to a CSV file (accessible from your FormSubmit dashboard)
   - Sends an email notification to the admin email
   - Redirects the user to the thank-you page
   - Sends an auto-response to the user

3. The CSV file will contain all form submissions and can be downloaded from your FormSubmit dashboard

### First-Time Submission

When you receive your first form submission, FormSubmit will send a confirmation email to the admin email address. You'll need to confirm this email to activate the form processing.

### Testing

To test the form:
1. Fill out the form with test data
2. Submit the form
3. Check your email for the confirmation message from FormSubmit
4. Follow the instructions to confirm your email
5. Submit the form again to see the full functionality

### Customization

- You can customize the email template by editing the `admin-notification.html` file
- You can customize the thank-you page by editing the `thank-you.html` file
\`\`\`

These changes will make the form fully functional with:
1. Form submissions saved to a CSV file
2. Email notifications sent to the admin
3. A thank-you page for users after submission
4. Proper validation and processing state during submission

Remember to replace "your-email@example.com" with the actual admin email address before deploying the site.
