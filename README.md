# Jamia Nooria Gulshan-e-Zahra — Website

Official website for **Jamia Nooria Gulshan-e-Zahra** (جامعہ نوریہ گلشن زہراء), an Islamic educational institution for Muslim girls in Sibrampur, Uttar Dinajpur, West Bengal, India.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About Us |
| `academics.html` | Academics & Syllabus |
| `facilities.html` | Campus Facilities |
| `gallery.html` | Photo & Video Gallery |
| `support.html` | Donate & Contact |

## View Locally

Open `index.html` in any browser. For best results (avoids CORS issues), serve locally:

```bash
python -m http.server 8080
# Visit http://localhost:8080
```

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g., `jamia-nooria-website`)
2. Push all files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git remote add origin https://github.com/YOUR_USERNAME/jamia-nooria-website.git
   git push -u origin main
   ```
3. Go to **Settings → Pages**
4. Under **Source**, select **Deploy from a branch** → `main` → `/ (root)` → Save
5. Your site will be live at: `https://YOUR_USERNAME.github.io/jamia-nooria-website/`

The `.nojekyll` file in the root ensures GitHub Pages does not process the site through Jekyll.

## Technology

- HTML5, CSS3, vanilla JavaScript, jQuery 3.7.1
- Google Fonts: Amiri, Poppins
- Font Awesome 6.5 icons
- No build tools, no frameworks, no backend

## Contact

**Jamia Nooria Gulshan-e-Zahra**
Village Sibrampur, PO Galia, PS Chakulia, Dist Uttar Dinajpur, WB 733209
📞 +91 8170090117 | +91 7384969192
✉ jamianooriagulshanezahra@gmail.com
