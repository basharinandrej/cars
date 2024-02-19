import { createRoot } from 'react-dom/client'
import {App, StoreProvider} from '@app'

const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(
    <StoreProvider>
        <App />
    </StoreProvider>
)
