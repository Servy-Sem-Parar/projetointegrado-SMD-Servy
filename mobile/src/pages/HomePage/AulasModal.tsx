import React from "react"
import { Linking, Text, TouchableOpacity, View } from "react-native"
import styles from "./AulasModalStyles"
import moment from "moment"
import { ScrollView } from "react-native-gesture-handler"
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons"
import { AulaInfo } from "../../Tools/commons.types"

type AulasModalProps = {
    date?: Date,
    setDate: (date?: Date) => void,
    aulas: AulaInfo[]
}

export const AulasModal = ({ date, setDate, aulas }: AulasModalProps) => {
    
    const filteredAulas = aulas.filter(aula => moment(aula.date).format("DD/MM/YYYY") === moment(date).format("DD/MM/YYYY"))
    
    const openAula = (aula: AulaInfo) => {
        Linking.openURL(aula.link).then(() => {})
    }

    return (
        <Modal
            isVisible={!!date}
            onBackdropPress={() => {
                setDate(undefined)
            }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <ScrollView style={styles.container}>
                <View style={styles.dateTextContainer}>
                    <Text style={styles.dateTextDay}>
                        {moment(date).format("DD")}
                    </Text>
                    <Text style={styles.dateTextWeek}>
                        {moment(date).format("dddd")}
                    </Text>
                </View>
                <View style={styles.aulasContainer}>
                    {filteredAulas.map(aula => (
                        <TouchableOpacity
                            key={aula._id}
                            style={styles.aulaContainer}
                            onPress={() => openAula(aula)}
                        >
                            <View style={[styles.aulaBola, { backgroundColor: aula.turma.color }]} />
                            <View style={styles.aulaTextContainer}>
                                <Text style={styles.aulaTitle}>
                                    {aula.title}
                                </Text>
                                <Text style={styles.aulaTurma}>
                                    {aula.turma.name}
                                </Text>
                                <Text style={styles.aulaHorario}>
                                    {moment(aula.date).format("HH:mm")}
                                    &nbsp;-
                                    &nbsp;{aula.duration} horas
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                    <Icon name="close" size={25} onPress={() => setDate(undefined)}/>
                </View>
            </ScrollView>
        </Modal>
    )
}