import { FC, ReactNode, useState, useEffect } from "react";
import {Page404} from '@pages'



export const ErrorBoundary: FC<Props> = ({
    children
}) => {
    const [error, setError] = useState<Error>(null);
  
    useEffect(() => {
        const handleErrors = (err: unknown) => {
            if(err instanceof Error) setError(err)
        };

        window.addEventListener('error', handleErrors);
        return () => {
            window.removeEventListener('error', handleErrors);
        };
    }, []);
  
    if (error) {
        return  <Page404 error={error.message}/>;
    }

    return children
}

interface Props {
    children: ReactNode
}