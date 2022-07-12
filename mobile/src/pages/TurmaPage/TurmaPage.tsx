import moment from "moment";
import { useEffect, useState } from "react";
import { RefreshControl, View, Text, Linking, TouchableOpacity } from "react-native";
import { Layout, openLoader } from "../../components/Layout/Layout";
import { AulaInfo, MaterialInfo, TurmaInfo } from "../../Tools/commons.types";
import { storage } from "../../Tools/storage";
import { getAulas } from '../../Tools/commons.requester';
import { Calendar } from "../../components/Calendar/Calendar";
import { AulasModal } from "../../components/AulasModal/AulasModal";
import styles from "./TurmaPageStyles";
import { getMateriais, getTurma } from "./requester";

export function TurmaPage({ navigation, route }: { navigation: any, route: any }) {
    const { turmaId } = route.params
    const [turma, setTurma] = useState<TurmaInfo>()
    const [refreshing, setRefreshing] = useState(false);
    const [aulas, setAulas] = useState<AulaInfo[]>([]);
    const [materiais, setMateriais] = useState<MaterialInfo[]>([]);
    const [dateModal, setDateModal] = useState<Date>();
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (!turma || refreshing) {
            buscaTurma()
        }
    }, [turma, refreshing])

    useEffect(() => {
        buscaTurma()
    }, [turmaId])

    useEffect(() => {
        if (turma) {
            const turmasId: string[] = [turma._id] || [];
            const dateStart = moment(date).startOf("month").toDate().toISOString()
            const dateEnd = moment(date).endOf("month").toDate().toISOString()
            getAulas(turmasId, dateStart, dateEnd).then(setAulas)
            getMateriais(turma._id).then((materiais) => setMateriais(materiais as MaterialInfo[]))
        }
    }, [turma, date])

    const buscaTurma = () => {
        openLoader();
        getTurma(turmaId).then((data) => {
            setTurma(data)
            setRefreshing(false);
        })
    }

    const renderAulas = () => {
        return (
            <View>
                <Calendar
                    date={date}
                    aulas={aulas}
                    onClickDayCallback={setDateModal}
                    onChangeDateCallback={(date: Date) => setDate(date)}
                />
                <AulasModal date={dateModal} setDate={setDateModal} aulas={aulas} />
            </View>
        )
    }

    const renderTurma = () => {
        return (
            <View style={{marginBottom: 20}}>
                <Text style={styles.pageTitle}>Dados da turma</Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Nome: </Text>
                    <Text style={styles.dataContent}>{turma?.name}</Text>
                </Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Professoras: </Text>
                    <Text style={styles.dataContent}>{turma?.teachers?.map(t => t.name)?.join(", ")}</Text>
                </Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Descrição: </Text>
                    <Text style={styles.dataContent}>{turma?.description}</Text>
                </Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Informações adicionais: </Text>
                    <Text style={styles.dataContent}>{turma?.informations}</Text>
                </Text>
            </View>
        )
    }

    const renderMateriais = () => {
        return (
            <View style={{marginTop: 20}}>
                <Text style={styles.pageTitle}>Materiais de apoio</Text>
                {materiais.length === 0 && <Text style={styles.noDataLabel}>Nenhum material disponível</Text>}
                {
                    materiais.map(material => {
                        return (
                            <TouchableOpacity
                                style={[styles.materialCard, { backgroundColor: turma ? turma.color as string : "" }]}
                                key={material._id}
                                onPress={() => { Linking.openURL(material.link).then(() => { }) }}
                            >
                                <Text style={styles.materialDataName}><Text style={styles.materialDataContent}>{`Nome: `}</Text>{material.name}</Text>
                                <Text style={styles.materialDataName}><Text style={styles.materialDataContent}>{`Data: `}</Text>{material.date}</Text>
                                <Text style={styles.materialDataName}><Text style={styles.materialDataContent}>{`Link: `}</Text>{material.link}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    return (
        <Layout
            title={turma ? turma.name as string : ""}
            showBackButtonBar={true}
            navigation={navigation} hideBar={true}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => setRefreshing(true)}
                />
            }
        >
            <View style={{ marginBottom: 20 }}>
                {renderTurma()}
                {renderAulas()}
                {renderMateriais()}
            </View>
        </Layout>
    )
}