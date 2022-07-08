import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Calendar } from '../../components/Calendar/Calendar';
import { Layout } from '../../components/Layout/Layout';
import { useAuth } from '../../context/Auth';
import { nameToIcon } from '../../Tools/icons';
import styles from "./HomePageStyles";
import { getAulas, getUser } from './requester';

type UserInfo = {
    _id: string,
    turmas: TurmaInfo[]
}

type TurmaInfo = {
    _id: string,
    name: string,
    color: string,
    disciplina: {
        icon: string,
    }
}

export function HomePage({ navigation }: { navigation: any }) {

    const { authData } = useAuth()
    const [date, setDate] = useState(new Date())
    const [userInfo, setUserInfo] = useState<UserInfo>()
    const [refreshing, setRefreshing] = useState(false)
    const [aulas, setAulas] = useState([])

    useEffect(() => {
        if (!userInfo || refreshing){
            const userId = authData?._id
            if (userId){
                getUser(userId).then((result) => {
                    setUserInfo(result)
                    setRefreshing(false)
                })
            }
        }
    }, [refreshing, userInfo])

    useEffect(() => {
        if (userInfo){
            const turmas = userInfo.turmas || []
            const turmasId = turmas.map(t => t._id)
            const dateStart = moment().startOf("month").toDate().toISOString()
            const dateEnd = moment().endOf("month").toDate().toISOString()
            getAulas(turmasId, dateStart, dateEnd).then(setAulas)
        }
    }, [userInfo])

    const renderTurmas = () => {
        const turmas = userInfo?.turmas || []
        const renderTurma = (turma: TurmaInfo) => {
            return (
                <View
                    key={turma._id}
                    style={styles.turmaContainer}
                >
                    <TouchableOpacity style={[styles.turmaBox, {backgroundColor: turma.color}]}>
                        {React.cloneElement(nameToIcon(turma.disciplina.icon), {style: styles.turmaIcon})}
                    </TouchableOpacity>
                    <Text style={styles.turmaText}>
                        {turma.name}
                    </Text>
                </View>
            )
        }
        return (
            <View>
                <View style={styles.turmaTextContainer}>
                    <Text style={styles.turmasText}>Turmas</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("TurmasPage")}>
                        <Text style={styles.turmasSubText}>Ver mais</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView 
                    horizontal
                    style={styles.turmasContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    {turmas.map(renderTurma)}
                </ScrollView>
            </View>
        )
    }

    const renderAulas = () => {
        return (
            <View>
                <Calendar date={date} aulas={aulas} />
            </View>
        )
    }

    return (
        <Layout
            title='Início'
            navigation={navigation}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => setRefreshing(true)}
                />
            }
        >
            {renderTurmas()}
            {renderAulas()}
        </Layout>
    )
}