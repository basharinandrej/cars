import React from 'react'
import { StoreProvider } from "@app"
import { ListingDetails, FilterListingDetails } from '@features'
import {Container} from '@shared';
import './styles/index.sass'

const App = () => {
    return (
        <StoreProvider>
            <Container>
                <>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <FilterListingDetails/>
                    <ListingDetails/>
                </>
            </Container>
        </StoreProvider>
    )
}

export default App