# Registro de Desarrollo - Proyecto Scrinium
**Fecha:** 14 de Octubre, 2026  
**Fase:** Resolución de Conflictos, Instalación de Dependencias y Servidor Dev

---

## 1. Objetivos de la Sesión
- Resolver el conflicto de compatibilidad entre la sintaxis de alias de `pnpm` exportada por Figma y el gestor de paquetes `npm`.
- Desvincular la ejecución cruzada entre el runtime de Windows y la terminal nativa de Ubuntu (WSL).
- Instalar exitosamente la arquitectura de dependencias (`React`, `Vite`, `TypeScript`, `Tailwind CSS`, `Radix UI`).
- Desplegar el servidor de desarrollo local para verificar la renderización gráfica del proyecto.

---

## 2. Diagnóstico y Problemas Resueltos

### A. Incompatibilidad de Aliases en `package.json`
* **Incidencia:** El archivo `package.json` contenía sintaxis duplicada de versiones propia de `pnpm` (ej. `"@emotion/react@11.14.0": "npm:@emotion/react@11.14.0"`), lo que provocaba el error `EINVALIDPACKAGENAME` al ejecutar `npm install`.
* **Solución:** Se depuró manualmente el `package.json` removiendo las referencias cruzadas de aliases y unificando las dependencias en la sintaxis estándar de `npm`.

### B. Conflicto de Rutas UNC y Ejecutables entre Windows y WSL
* **Incidencia:** `npm` estaba llamando al binario de Node.js instalado en la partición de Windows (`C:\...`), generando errores de permisos (`EPERM`) y bloqueos por rutas de red compartidas (`\\wsl.localhost\`).
* **Solución:** Se instaló Node.js y `npm` de forma nativa dentro del entorno Linux Ubuntu (`sudo apt install nodejs npm`), aislando completamente la ejecución dentro del espacio de usuario de WSL.

---

## 3. Comandos de Instalación y Despliegue

```bash
# 1. Limpieza de cachés y bloqueos previos
rm -rf node_modules package-lock.json pnpm-workspace.yaml pnpm-lock.yaml

# 2. Instalación nativa de dependencias
npm install

# 3. Puesta en marcha del servidor local
npm run dev
```

---

## 4. Resultados Alcanzados
- **Servidor Dev:** Operativo en `http://localhost:5173/` montado sobre Vite.
- **Interfaz Gráfica:** Confirmada la correcta carga visual de la maquetación de Scrinium en el navegador.
- **Estructura Interna (`src/`):** Confirmada la presencia de componentes principales (`App.tsx`, `main.tsx`, `/components`, `/styles`).