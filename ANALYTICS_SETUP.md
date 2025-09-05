# Google Analytics Setup Guide

## Step 1: Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Create an account name (e.g., "Nehemiah Technologies")
4. Set up a property for your website
5. Choose "Web" as the platform

## Step 2: Get Your Measurement ID
1. After creating the property, you'll get a Measurement ID
2. It looks like: `G-XXXXXXXXXX`
3. Copy this ID

## Step 3: Update Your Website
Replace `GA_MEASUREMENT_ID` in your index.html file with your actual Measurement ID:

```html
<!-- Find this line in your index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

<!-- Replace with your actual ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
```

And also replace it in the configuration:
```javascript
gtag('config', 'GA_MEASUREMENT_ID');
// Replace with:
gtag('config', 'G-YOUR-ACTUAL-ID');
```

## Step 4: Test Analytics
1. Save your changes
2. Visit your website
3. Check Google Analytics Real-Time reports
4. You should see your visit appear

## What Analytics Will Track
✅ Page views and user sessions
✅ Button clicks (CTAs, navigation)
✅ Form submissions
✅ User demographics and behavior
✅ Traffic sources (Google, direct, social media)
✅ Most popular pages and content

## Custom Events Being Tracked
- Navigation clicks
- CTA button clicks
- Form submissions
- Blog visits
- Contact attempts

Your analytics are now set up to track user engagement and help optimize your website performance!
