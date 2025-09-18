TRtx Gaming Website
====================

Simple static landing page for TRtx Gaming with a looping neon animation on the site title.

Tech
----
- Plain HTML, CSS, and JavaScript
- Google Fonts: Orbitron
- Deployed with GitHub Pages

Local Setup
-----------
1. Open `index.html` in your browser, or serve the folder:
   - Python: `python -m http.server 8080`
   - Node: `npx serve .`

Customize
---------
- Change colors, font sizes, or animation in `styles.css`.
- Update the title text in `index.html`.

Deployment (GitHub Pages)
-------------------------
This repo includes a GitHub Actions workflow that publishes the site on every push to `main`.

Steps:
1. Push to GitHub and set the default branch to `main`.
2. In your GitHub repo: Settings → Pages → Build and deployment → Source: GitHub Actions.
3. The workflow `.github/workflows/pages.yml` will deploy automatically.

License
-------
Released under the MIT License. See `LICENSE` for details.


