import ReactDOM from 'react-dom/client';
import './styles/index.sass'
import Container from './shared/ui/container/container';
import {ListingDetails} from './features/index'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Container>
    <ListingDetails />
  </Container>
);
