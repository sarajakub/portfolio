# Supabase Guestbook Setup Instructions

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign up with GitHub (recommended) or email

## Step 2: Create a New Project

1. Click "New Project"
2. Choose your organization (or create one)
3. Fill in:
   - **Project Name**: `portfolio-guestbook` (or whatever you like)
   - **Database Password**: (save this somewhere safe!)
   - **Region**: Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

## Step 3: Create the Guestbook Table

1. In your Supabase dashboard, click "Table Editor" in the left sidebar
2. Click "Create a new table"
3. Configure the table:
   - **Name**: `guestbook`
   - **Description**: Stores visitor notes
4. Add these columns (some are auto-created):
   
   | Column Name | Type | Default Value | Primary | Required |
   |------------|------|---------------|---------|----------|
   | id | int8 | Auto-generated | ✅ | ✅ |
   | created_at | timestamptz | now() | | ✅ |
   | name | text | | | ✅ |
   | message | text | | | ✅ |

5. **Enable Row Level Security (RLS)**:
   - Toggle "Enable RLS" to ON
   
6. Click "Save"

## Step 4: Set Up Security Policies

1. In Table Editor, click on the `guestbook` table
2. Click "RLS" or go to "Authentication" → "Policies"
3. Add two policies:

### Policy 1: Allow Public Read
- Click "New Policy"
- Choose "Create a policy from scratch"
- **Policy Name**: `Enable read access for all users`
- **Allowed operation**: SELECT
- **Target roles**: public
- **USING expression**: `true`
- Click "Review" then "Save policy"

### Policy 2: Allow Public Insert
- Click "New Policy"
- Choose "Create a policy from scratch"
- **Policy Name**: `Enable insert for all users`
- **Allowed operation**: INSERT
- **Target roles**: public
- **WITH CHECK expression**: `true`
- Click "Review" then "Save policy"

## Step 5: Get Your API Keys

1. Click "Settings" (gear icon) in the left sidebar
2. Click "API" under Project Settings
3. You'll see two important values:

   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

4. Copy both of these!

## Step 6: Add Keys to Your Project

### Option A: Using Environment Variables (Recommended)

1. Create a file called `.env.local` in your project root:
   ```bash
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. Add `.env.local` to your `.gitignore` (should already be there)

3. Restart your dev server: `npm start`

### Option B: Direct in Code (Less secure, but simpler)

1. Open `src/supabaseClient.js`
2. Replace the placeholder values:
   ```javascript
   const supabaseUrl = 'https://your-project.supabase.co';
   const supabaseAnonKey = 'your-anon-key-here';
   ```

⚠️ **Note**: The `anon` key is safe to expose publicly - it's designed for client-side use. Your RLS policies protect your data.

## Step 7: Test Locally

1. Run `npm start`
2. Navigate to `/guestbook`
3. Try submitting a note
4. Check your Supabase dashboard → Table Editor → guestbook to see if it appears

## Step 8: Deploy

Once everything works locally:

```bash
npm run deploy
```

Your guestbook is now live! 🎉

## Troubleshooting

### Notes aren't appearing
- Check browser console for errors
- Verify your API keys are correct
- Make sure RLS policies are enabled and correct

### Can't submit notes
- Check that INSERT policy exists and allows public access
- Verify the table columns match exactly (name, message, created_at)

### "Failed to post note" error
- Open browser DevTools → Console
- Look for the specific Supabase error
- Most common: RLS policy blocking inserts

## Optional Enhancements

### Add Moderation
- Change the INSERT policy to require authentication
- Create an admin interface to approve notes
- Add a `published` boolean column

### Add Emoji Reactions
- Create a `reactions` table
- Link to guestbook notes with foreign key
- Add reaction buttons to each note

### Prevent Spam
- Add rate limiting (Supabase has built-in options)
- Require email verification
- Add a simple captcha

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
