# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Boiler Plate consists

- Tailwind css configured.

# incase if you are using any other css library follow below commands

Follow the steps below to completely remove Tailwind CSS, PostCSS, and Autoprefixer from your React Vite project.

---

## 1. Uninstall Tailwind CSS, PostCSS, and Autoprefixer

Run the following command in your terminal to remove the packages:

- 1. npm uninstall tailwindcss postcss autoprefixer
- 2. You can delete them manually or use the terminal command : rm tailwind.config.js postcss.config.js
- 3. Remove Tailwind Directives from index.css

# Run Server

- cd src

- run this command: json-server --watch database.json --port 3000
