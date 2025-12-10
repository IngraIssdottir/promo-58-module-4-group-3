# Proyecto — Estructura y Documentación

## 🧩 Punto de entrada y configuración

- **Entrada principal:** `src/main.jsx`
  Renderiza el componente raíz de la aplicación.

- **HTML base:** `index.html`

- **Configuración de Vite:** `vite.config.js`

- **Scripts y dependencias:** `package.json`

- **Linter:** `eslint.config.js`


---

## 🗂️ Estructura relevante del proyecto

### **App raíz**
`src/components/App.jsx`

- Mantiene el estado principal `data` mediante `useState`.
- Expone la función **`changeData`** para actualizar el estado desde el formulario.
- Incluye (comentados) los handlers para subida de imágenes:
  - `handlePhoto`
  - `handleImage`

---

## 📝 Entrada de usuario y edición

### **Formulario**
`src/components/Create/Form.jsx`

- Recibe la prop `changeData` desde App para actualizar `data`.
- Construido con componentes reutilizables.

#### **Input reutilizable**
`src/components/Create/InputGroupText.jsx`
Input simple controlado, recibe las props:
- `name`
- `id`
- `placeholder`
- `type`

#### **Botón de subida**
`src/components/Create/ButtonsGroup.jsx`
Componente con:
- `<label>` para estilizar
- `<input type="file">` oculto
Los handlers están comentados a la espera de activación.

---

## 🖼️ Vista previa / presentación

### **Preview**
`src/components/Create/Preview.jsx`
- Muestra la imagen del proyecto y la tarjeta final en tiempo real.

### **Card**
`src/components/Create/Card.jsx`
Renderiza la tarjeta con los datos del estado:
- nombre
- slogan
- autor
- trabajo
- descripción
- tecnologías
- enlaces (demo / repo)
- imágenes
Cuando un campo  está vacío, utiliza **valores por defecto**.

---

## 🎨 Layout

- **Header:** `src/components/Layout/Header.jsx`
  Logo y marca.

- **Hero:** `src/components/Layout/Hero.jsx`
  Texto principal y call-to-action.

- **Footer:** `src/components/Layout/Footer.jsx`
  Imagen del patrocinador.

---

## 🎨 Estilos (SCSS)

Estilos organizados por componente en:

- `src/styles/App.scss`
- `src/styles/Form.scss`
- `src/styles/Preview.scss`
- `src/styles/Header.scss`
- `src/styles/Hero.scss`
- `src/styles/Footer.scss`

