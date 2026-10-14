# Scrinium — Design System & Style Guide

## Identidad y Concepto
- Estuche digital inteligente para humanistas y filólogos clásicos.
- Experiencia editorial, táctil y de códice clásico (pergamino, tinta, oro).

## Tokens de Color (Variables CSS aplicadas como inline styles)
- --parchment: #F5EDD6 → Fondo principal de todas las pantallas y lienzos.
- --cream: #FAF6EE → Fondos de tarjetas, inputs, modales y drawers.
- --ink-charcoal: #1C1C1E → Texto principal, iconos, botones CTA primarios.
- --gold-accent: #B8924A → Bordes decorativos, divisores finos, highlights activos.
- --sepia-medium: #8B7355 → Texto secundario, metadatos, etiquetas de apoyo.
- --sepia-light: #D4C5A9 → Bordes suaves, separadores, estados inactivos.

## Tipografía y Jerarquía
- Logo Scrinium: Georgia itálica, tamaño 22-24px.
- Títulos display: Georgia, Garamond, serif — peso 400, tracking amplio.
- Cuerpo de texto: Georgia, serif — 1rem / 1.05rem (16px), line-height 1.7.
- Verso bilingüe: Georgia, serif — 14-15px por columna.
- UI Labels, Badges y Tabs: Sistema sans-serif (Tailwind default) — 11-12px.

## Espaciados, Radios y Layout
- Padding de pantalla: px-5 py-4 (20px horizontal / 16px vertical).
- Gap entre cards: gap-4 (16px uniforme).
- Radio base (--radius): 0.625rem (10px).
- Radio de cards y modales: rounded-lg (8px).
- Radio de botones CTA: rounded-sm (2-4px).
- Radio de chips/categorías: rounded-full.

## Reglas de Componentes y Autolayouts
- TopBar: Row horizontal (logo-botón + título + acciones). El logo "Scrinium" es SIEMPRE un `<button>` que retorna a HomeScreen (onGoHome).
- CategoryPills: Row horizontal con scroll, chips con estados activo/inactivo (rounded-full).
- BookCard: Column vertical (imagen cover → autor → título → badge de idioma).
- BookGrid: Grid de 2 columnas con gap-4 dentro de ScrollArea.
- BottomNavBar: Row fijo al fondo, 4 tabs (ícono + label de 11-12px).
- ImportMenu: Modal/drawer centrado con Column de opciones separadas por dividers #D4C5A9.
- BilingualRow: Row horizontal alineado verso a verso con número de línea a la izquierda.
- AudioControls: Column centrado (wave visualizer → track info → slider progreso → Row de controles).
- OCRProgress: Column centrado (header + barra de progreso animada + métricas).