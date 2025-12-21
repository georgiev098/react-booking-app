import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {

  /* LIGHT MODE */
  &,&.light-mode {
    /* Greys (modern, soft, neutral) */
    --color-grey-0: #ffffff;
    --color-grey-50: #f8fafc;
    --color-grey-100: #f1f5f9;
    --color-grey-200: #e2e8f0;
    --color-grey-300: #cbd5e1;
    --color-grey-400: #94a3b8;
    --color-grey-500: #64748b;
    --color-grey-600: #475569;
    --color-grey-700: #334155;
    --color-grey-800: #1e293b;
    --color-grey-900: #0f172a;

    /* Accent colors (modern blue / violet blend) */
    --color-blue-100: #dbeafe;
    --color-blue-700: #1d4ed8;

    --color-green-100: #dcfce7;
    --color-green-700: #15803d;

    --color-yellow-100: #fef9c3;
    --color-yellow-700: #a16207;

    --color-silver-100: #e2e8f0;
    --color-silver-700: #334155;

    --color-indigo-100: #e0e7ff;
    --color-indigo-700: #5546dd;

    /* Reds (kept similar but softened) */
    --color-red-100: #fee2e2;
    --color-red-700: #dc2626;
    --color-red-800: #b91c1c;

    --backdrop-color: rgba(255, 255, 255, 0.55);

    /* Modern shadows */
    --shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
    --shadow-lg: 
      0 12px 28px rgba(0,0,0,0.12),
      0 4px 8px rgba(0,0,0,0.04);

    /* Image tuning */
    --image-grayscale: 0;
    --image-opacity: 100%;

    /* Glass backgrounds */
    --glass-bg: rgba(255, 255, 255, 0.6);
    --glass-blur: 10px;

    --table-bg: var(--color-grey-0);
    --table-header-bg: var(--color-grey-100);
    --table-border: var(--color-grey-200);
    --table-header-color: var(--color-grey-700);
    --table-row-hover: var(--color-grey-50);
  }

  /* DARK MODE */
  &.dark-mode {
    /* Softer charcoal greys (premium dark mode) */
    --color-grey-0: #0d1117;
    --color-grey-50: #161b22;
    --color-grey-100: #1d212f;
    --color-grey-200: #27303f;
    --color-grey-300: #2f3a4d;
    --color-grey-400: #475569;
    --color-grey-500: #64748b;
    --color-grey-600: #94a3b8;
    --color-grey-700: #cbd5e1;
    --color-grey-800: #e2e8f0;
    --color-grey-900: #f1f5f9;

    /* Accents flipped for readability */
    --color-blue-100: #1e3a8a;
    --color-blue-700: #bfdbfe;

    --color-green-100: #166534;
    --color-green-700: #bbf7d0;

    --color-yellow-100: #854d0e;
    --color-yellow-700: #fef9c3;

    --color-silver-100: #2f3a4d;
    --color-silver-700: #e2e8f0;

    --color-indigo-100: #3730a3;
    --color-indigo-700: #c7d2fe;

    --color-red-100: #fee2e2;
    --color-red-700: #ef4444;
    --color-red-800: #dc2626;

    --backdrop-color: rgba(0, 0, 0, 0.25);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
    --shadow-lg: 
      0 12px 28px rgba(0,0,0,0.4),
      0 4px 8px rgba(0,0,0,0.2);

    --image-grayscale: 10%;
    --image-opacity: 92%;

    /* Glass for dark */
    --glass-bg: rgba(255, 255, 255, 0.08);
    --glass-blur: 10px;

  --table-bg: var(--color-grey-50);
    --table-header-bg: var(--color-grey-100);  /* slightly lighter than bg */
    --table-border: var(--color-grey-200);
    --table-header-color: var(--color-grey-900);
    --table-row-hover: var(--color-grey-100);
  }

  /* Brand colors (modernized indigo/blue mix) */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #5546dd; /* slight violet shift */
  --color-brand-800: #4338ca;
  --color-brand-900: #312e81;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
}

/* Base resets */
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background-color 0.3s, border 0.3s, color 0.2s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

/* Inputs */
input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

/* Typography */
a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

/* Images with dark mode tuning */
img {
  max-width: 100%;
  filter: grayscale(var(--image-grayscale))
          opacity(var(--image-opacity));
}
`;

export default GlobalStyles;
