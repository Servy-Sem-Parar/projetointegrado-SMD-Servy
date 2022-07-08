import { Text, View } from 'react-native';
import { Layout } from '../../components/Layout/Layout';

export function HomePage({navigation}: {navigation: any}) {
    return (
        <Layout title='Início' navigation={navigation}>
            <Text>Home</Text>
        </Layout>
    )
}