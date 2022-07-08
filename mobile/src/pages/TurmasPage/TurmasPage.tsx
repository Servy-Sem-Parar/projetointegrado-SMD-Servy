import { Text, View } from 'react-native';
import { Layout } from '../../components/Layout/Layout';

export function TurmasPage({navigation}: {navigation: any}) {
    return (
        <Layout title='Turmas' navigation={navigation}>
            <Text>Turmas</Text>
        </Layout>
    )
}