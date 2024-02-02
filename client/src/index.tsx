import 'module-alias/register'
import ReactDOM from 'react-dom/client'
import './styles/index.sass'
import Container from './shared/ui/container/container'
import {ListingDetails} from '../src/features'
import {StoreProvider} from './app/providers'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <StoreProvider>
    <Container>
      <ListingDetails />
    </Container>
  </StoreProvider>
)
