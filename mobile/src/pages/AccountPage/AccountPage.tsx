import { Text, View } from 'react-native';
import { Layout } from '../../components/Layout/Layout';

export function AccountPage({navigation}: {navigation: any}) {
    return (
        <Layout title='Meu Perfil' activeTab={"profile"} navigation={navigation}>
            <Text>Account</Text>
        </Layout>
    )
}