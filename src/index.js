import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import { Leva } from 'leva'

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay />
    <Leva collapsed />
  </>
)