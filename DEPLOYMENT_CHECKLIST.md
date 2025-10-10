# 🚨 BLANK PAGE FIX - Environment Variables Missing

## Why Your Site is Blank:

Your app tries to connect to Supabase on load, but **Netlify doesn't have the environment variables**, so the app crashes silently with a blank white page.

## ✅ SOLUTION: Add Environment Variables to Netlify

### Step-by-Step Instructions:

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Find your site in the list

2. **Open Site Settings**
   - Click on your site name
   - Click "Site settings" in the top menu
   - Click "Environment variables" in the left sidebar

3. **Add These Variables** (click "Add a variable" for each):

```
Variable Name: VITE_SUPABASE_URL
Value: https://neywpwtpbdvaecvdvnco.supabase.co

Variable Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5leXdwd3RwYmR2YWVjdmR2bmNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NDU4OTAsImV4cCI6MjA3NTQyMTg5MH0.kOemJcAyZgJyzvwuke1Q1btbsAG6A3WTs90WJva3By8

Variable Name: VITE_SUPABASE_PROJECT_ID
Value: zwmaufrxgmwoaurjconh

Variable Name: VITE_SUPABASE_PUBLISHABLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3bWF1ZnJ4Z213b2F1cmpjb25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MjQxOTcsImV4cCI6MjA3NTEwMDE5N30.Iqn0gDiXm232hwGGVF2qbQiEm_gQd5qdOOJX5Hd0d6o

Variable Name: VITE_PAYPAL_CLIENT_ID
Value: AYw4r-z8caM1MHVhYClk7s-i5kNf1W3J2pWQqCmcFaP6Mh6s_S6qZeWnIF3_lyetMe42MabKlOvx0ZqD

Variable Name: RESEND_API_KEY
Value: re_USB4mTSP_GBpzjabwUuxzCX5Fpg6oy9XK
```

4. **Trigger a New Deploy**
   - After adding all variables, go to "Deploys" tab
   - Click "Trigger deploy" → "Clear cache and deploy site"
   - Wait 2-3 minutes for the build to complete

5. **Check Your Site**
   - Visit your domain again
   - Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac) to hard refresh
   - Your site should now load properly!

## Alternative: Check Browser Console

If the site is still blank after adding environment variables:

1. **Open Developer Tools** (F12 or right-click → Inspect)
2. **Go to Console tab**
3. **Look for red error messages**
4. **Share the error message** so I can help fix it

## What Happens After Adding Variables:

✅ Supabase will connect properly
✅ Database queries will work
✅ Your pages will load
✅ Forms will submit
✅ Payment features will work

---

**Important:** Environment variables are ONLY read during the build process. You MUST redeploy after adding them!
