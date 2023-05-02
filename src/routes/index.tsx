import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { Load } from "../components/Load";

export function Routes() {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {user.id ? <AppTabRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}
