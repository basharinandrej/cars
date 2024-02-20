import { createRoot } from 'react-dom/client'
import {App, StoreProvider} from '@app'
import { BrowserRouter } from 'react-router-dom'

const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(
    <StoreProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreProvider>
)
