# Ibrar Yousafzai — Portfolio (portal-based, admin-editable)

A Next.js portfolio site where every section (hero text, about, skills, projects,
certifications, events, socials, SEO) is stored in MongoDB and editable from a
password-protected `/admin` dashboard — no code changes needed to update content.

**Stack (100% free tier):**
- Next.js (App Router) — the website + API
- MongoDB Atlas — free 512MB cluster for content
- Vercel — free hosting, deploys automatically from GitHub
- GitHub — free code hosting + version history

---

## 1. Get a free MongoDB database (5 min)

1. Go to https://www.mongodb.com/cloud/atlas/register and sign up (free, no credit card needed for the free tier).
2. Create a new **free (M0) cluster** — any provider/region is fine, pick one close to you.
3. Under **Database Access**, create a database user with a username and password (save these).
4. Under **Network Access**, click **Add IP Address** → **Allow access from anywhere** (`0.0.0.0/0`). This is required because Vercel's servers don't have a fixed IP.
5. Click **Connect** on your cluster → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Add a database name to it before the `?`, e.g. `.../ibrar-portfolio?retryWrites=true...`. Keep this string safe — it's your `MONGODB_URI`.

## 2. Put the code on GitHub (2 min)

1. Create a new empty repository on https://github.com/new (e.g. `ibrar-portfolio`). Don't add a README/license there — this project already has one.
2. In this project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ibrar-portfolio.git
   git push -u origin main
   ```

## 3. Deploy to Vercel (5 min)

1. Go to https://vercel.com/new and sign in with GitHub.
2. Import the `ibrar-portfolio` repository.
3. Before clicking Deploy, open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `MONGODB_URI` | the connection string from step 1 |
   | `ADMIN_USERNAME` | a username you'll use to log into `/admin` |
   | `ADMIN_PASSWORD` | a strong password |
   | `JWT_SECRET` | any long random string (e.g. generate one at https://generate-secret.vercel.app/32) |

4. Click **Deploy**. In a minute or two your site is live at `https://ibrar-portfolio.vercel.app` (or your custom domain if you attach one under Project Settings → Domains).

Every time you push to `main` on GitHub, Vercel redeploys automatically.

## 4. Seed the database with starting content (optional, recommended)

This fills in your real bio, skills, and the two current projects so the site isn't
empty on day one.

1. Locally, copy `.env.local.example` to `.env.local` and paste in your real `MONGODB_URI`.
2. Run:
   ```bash
   npm install
   npm run seed
   ```
3. Refresh your live site — the content should now appear. (Events are intentionally left empty; add real ones from the admin dashboard.)

## 5. Log in and edit content

Go to `https://your-site.vercel.app/admin/login` and sign in with the
`ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in step 3. From the dashboard you can:

- **Site content** — hero text, about, skills, community, contact links, SEO
- **Projects** — add/edit/delete case studies, tags, status, and real outcomes
- **Certifications** — grouped by issuer
- **Events** — workshops, hackathons, community events, with certificate images

Changes save straight to MongoDB and appear on the live site immediately
(no redeploy needed for content — only code changes require a redeploy).

---

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in real values
npm run dev
```
Visit http://localhost:3000 for the site and http://localhost:3000/admin/login for the dashboard.

## Project structure

```
app/
  page.js                 → public homepage (reads from MongoDB server-side)
  admin/login/            → admin sign-in
  admin/dashboard/        → protected admin pages (settings, projects, certifications, events)
  api/                    → REST endpoints the admin dashboard and homepage call
components/               → public site sections (Hero, About, Skills, Projects, ...)
components/admin/         → admin dashboard shell/sidebar
models/                   → MongoDB schemas (Project, Certification, Event, SiteSettings, Visitor)
lib/mongodb.js            → DB connection helper
lib/auth.js               → admin session (JWT) helper
middleware.js              → protects /admin/dashboard pages and write API calls
scripts/seed.js            → one-time script to pre-fill real starting content
```

## Notes & next steps

- **Admin auth** is intentionally simple (one username/password pair from environment
  variables), matching what you asked for. If you ever want per-user accounts or
  social login, that's a bigger addition — ask and it can be layered in later.
- **Images** (certificate photos, project thumbnails) are referenced by URL for now —
  upload them to a free image host (e.g. Cloudinary's free tier, or even a GitHub repo)
  and paste the URL into the admin form. Direct file upload from the dashboard can be
  added later as a phase-2 feature.
- **The AI chatbot** ("Talk to Ibrar's AI") you asked to add later: the data model
  already separates content cleanly (bio, skills, projects), so a future chatbot can
  be trained/prompted on this same MongoDB data without restructuring anything.
- If a production build ever fails specifically on **font fetching** in a locked-down
  network, it's a network-access issue in that environment, not a code bug — the fonts
  load automatically on Vercel and any normal internet connection.
