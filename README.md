# The Forge - Super App de Productividad 🚀

The Forge es un prototipo funcional de una "Super App" diseñada para maximizar el enfoque y la productividad de desarrolladores y profesionales. Combina de forma fluida y en una sola interfaz cohesiva las herramientas esenciales para organizar el trabajo y mantener el estado de "flow".

## ✨ Características Principales

1. **Tablero Kanban Inteligente (Drag & Drop)**
   - Organiza tus tareas en columnas: `To Do`, `In Progress`, y `Done`.
   - Soporte completo para funcionalidad de arrastrar y soltar utilizando `@dnd-kit/core`.

2. **Pomodoro Timer Integrado**
   - Temporizador clásico de 25 minutos de enfoque (Focus) y 5 minutos de descanso (Break).
   - Inicia sesiones de enfoque directamente enlazadas a tus tareas en curso.

3. **Sistema de Gamificación (XP y Niveles)**
   - ¡Tu tiempo vale experiencia! Completa con éxito ciclos de Pomodoro sin interrupciones para ganar Puntos de Experiencia (XP).
   - Sube de nivel automáticamente (100 XP por nivel) y observa el progreso en la barra de energía estilo Neón.
   - Espacio reservado para un "Avatar" que evolucionará con el uso (actualmente en fase placeholder).

## 🛠️ Stack Tecnológico

- **Frontend Framework:** React 18 + TypeScript
- **Bundler:** Vite
- **Estilos:** Tailwind CSS v4 (Nativo de Vite) con `clsx` y `tailwind-merge` para clases dinámicas.
- **Gestión de Estado:** `Zustand` (con middleware de persistencia en `LocalStorage` para no perder la información al recargar).
- **Drag and Drop:** `@dnd-kit/core` y `@dnd-kit/sortable`.
- **Iconos:** `lucide-react`.

## 🎨 Diseño y UX

La aplicación ha sido diseñada con una estética **"Dark Mode" profesional**, utilizando una paleta profunda de grises (`zinc`) con acentos agresivos y cyberpunk en colores **Esmeralda y Fucsia**.
Se rige por una disposición asimétrica de 3 columnas para evitar saturar la pantalla con información:
- Columna 1: Utilidades rápidas (Snippet manager preparado).
- Columna 2: Centro de comando (Kanban).
- Columna 3: Zen Mode / Estado (Pomodoro y Avatar).

## 🚀 Instalación y Uso Local

1. Clona este repositorio:
   ```bash
   git clone https://github.com/we132/Productividad.git
   ```

2. Entra al directorio del proyecto (si este se encuentra en una subcarpeta, por ejemplo `the-forge`):
   ```bash
   cd the-forge
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Corre el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la aplicación.

## 🚧 Próximos Pasos (Roadmap)
- [ ] Construir la lógica para el **Snippet Manager** (Caja de Herramientas lateral).
- [ ] Implementar los assets en Pixel Art y la mecánica "The Code Smith" para el nivel del Avatar.
- [ ] Habilitar atajos de teclado para controlar el temporizador (ej. Space para Play/Pause).

---
*Construido con enfoque y café.* ☕
