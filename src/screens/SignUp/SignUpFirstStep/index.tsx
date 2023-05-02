import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
    StatusBar, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
} from 'react-native';
import * as Yup from 'yup';

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
import { Input } from '../../../components/Input';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet'; 

export function SignUpFirstStep() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string()
                    .required('CNH é obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                name: Yup.string()
                    .required('Nome é obrigatório')
            });

            const data = { name, email, driverLicense };
            await schema.validate(data);

            navigation.navigate('SignUpSecondStep', { user: data });
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                Alert.alert('Opa', error.message);
            }else {
                Alert.alert(
                    'Erro na autenticação', 
                    'Ocorreu um erro ao fazer login, verifique as credenciais'
                )
            }
        }
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
                        <FormTitle>1. Dados</FormTitle>

                        <Input 
                            iconName='user'
                            placeholder='Nome'
                            keyboardType='email-address'
                            onChangeText={setName}
                            value={name}
                        />

                        <Input 
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            onChangeText={setEmail}
                            value={email}
                        />

                        <Input 
                            iconName='credit-card'
                            placeholder='CNH'
                            keyboardType='numeric'
                            onChangeText={setDriverLicense}
                            value={driverLicense}
                        />
                    </Form>

                    <Footer>
                        <Button 
                            title='Próximo'
                            onPress={handleNextStep}
                            enabled={true}
                            loading={false}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};
