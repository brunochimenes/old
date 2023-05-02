import React, { useState } from 'react';
import { 
    StatusBar, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { api } from '../../../services/api';

import { 
    Container, 
    Header,
    Steps, 
    Title, 
    SubTitle,
    Form,
    FormTitle, 
    Footer 
} from './styles';

import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

interface Params {
    user: {
        name: string; 
        email: string; 
        driverLicense: string
    }
}

export function SignUpSecondStep() {
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();

    const { user } = route.params as Params;

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    async function handleRegister() {
        if(!password || !passwordConfirm){
            return Alert.alert('Informe a senha e a confirmação.')
        }

        if(!password != !passwordConfirm){
            return Alert.alert('Senhas não são iguais.');
        }

        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password,
        })
        .then(() => {
            navigation.navigate('Confirmation', {
                title: 'Conta criada!',
                message: `Agora é só fazer o login\ne aproveitar.`,
                nextScreenRoute: 'SignIn'
            });
        })
        .catch((error) => {
            console.log(error);
            Alert.alert('Opa', 'Não foi possível cadastrar');
        });
    }

    function handleBack(){
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar 
                        barStyle='dark-content'
                        backgroundColor='transparent'
                        translucent
                    />

                    <Header>
                        <BackButton onPress={handleBack} />

                        <Steps>
                            <Bullet />
                        </Steps>
                    </Header>

                    <Title>
                        Crie sua{'\n'}conta
                    </Title>

                    <SubTitle>
                        Faça seu cadastro de{'\n'} 
                        forma rápida e fácil.
                    </SubTitle>

                    <Form>
                        <FormTitle>2. Senha</FormTitle>

                        <PasswordInput 
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />

                        <PasswordInput 
                            iconName='lock'
                            placeholder='Repetir senha'
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />
                    </Form>

                    <Footer>
                        <Button 
                            title='Cadastrar'
                            color={theme.colors.success}
                            onPress={handleRegister}
                            enabled={true}
                            loading={false}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};
