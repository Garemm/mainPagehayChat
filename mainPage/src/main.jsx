import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
const isPreview = window.location.pathname.startsWith('/preview/')

if (isPreview) {
  document.body.classList.add('preview-mode')
  document.documentElement.classList.add('preview-mode')
}

const render = async () => {
  if (isPreview) {
    const mod = await import('./components/BusinessWebPreview.jsx')
    const Preview = mod.default
    root.render(
      <React.StrictMode>
        <Preview />
      </React.StrictMode>
    )
    return
  }

  const mod = await import('./App.jsx')
  const App = mod.default
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

render().catch((err) => {
  console.error('Error rendering app:', err)
  document.body.style.backgroundColor = '#FFFFFF'
  document.body.style.color = '#111111'
  root.render(
    <div style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Error cargando la página</h1>
      <p>{String(err?.message || err)}</p>
    </div>
  )
})
