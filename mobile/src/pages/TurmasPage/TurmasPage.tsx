import React from 'react';
import { useEffect, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Layout } from '../../components/Layout/Layout';
import { useAuth } from '../../context/Auth';
import { getUser } from '../../Tools/commons.requester';
import { TurmaInfo, UserInfo } from '../../Tools/commons.types';
import { nameToIcon } from '../../Tools/icons';
import styles from "./TurmasPageStyles";

export function TurmasPage({ navigation }: { navigation: any }) {

    const { authData } = useAuth()
    const [userInfo, setUserInfo] = useState<UserInfo>()
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        if (!userInfo || refreshing) {
            const userId = authData?._id
            if (userId) {
                getUser(userId).then((result) => {
                    setUserInfo(result)
                    setRefreshing(false)
                })
            }
        }
    }, [refreshing, userInfo])

    const renderTurma = (turma: TurmaInfo) => {
        return (
            <TouchableOpacity
                key={turma._id}
                style={[styles.turmaContainer, { backgroundColor: turma.color }]}
            >
                <View>
                    {React.cloneElement(nameToIcon(turma.disciplina.icon), { style: styles.turmaIcon })}
                </View>
                <View>
                    <Text style={styles.turmaName}>
                        {turma.name}
                    </Text>
                    <Text style={styles.turmaProfessora}>
                        Professoras:
                        &nbsp;
                        {turma.teachers[0].name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Layout
            title='Turmas'
            navigation={navigation}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => setRefreshing(true)}
                />
            }
        >
            <Text style={styles.turmasText}>Minhas turmas</Text>
            <View style={styles.turmasContainer}>
                {userInfo?.turmas?.map(renderTurma)}
            </View>
        </Layout>
    )
}