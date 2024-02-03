import React from 'react'
import { StoreProvider } from "@app"
import { ListingDetails } from '@features'
import {Container} from '@shared';


const App = () => {
    return (
        <StoreProvider>
            <Container>
                <ListingDetails/>
            </Container>
        </StoreProvider>
    )
}

export default App