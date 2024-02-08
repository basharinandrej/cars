import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider, AppRoutes } from "@app"
import {Container} from '@shared';
import './styles/index.sass'

const App = () => {
    return (
        <StoreProvider>
            <BrowserRouter>
                <Container>
                    <AppRoutes />
                </Container>
            </BrowserRouter>
        </StoreProvider>
    )
}

export default App