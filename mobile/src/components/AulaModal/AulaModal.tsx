import React, { useState } from "react"
import { Linking, Text, TouchableOpacity, View } from "react-native"
import styles from "./AulaModalStyles"
import moment from "moment"
import { ScrollView } from "react-native-gesture-handler"
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons"
import { AulaInfo } from "../../Tools/commons.types"

type AulaModalProps = {
    aula?: AulaInfo,
    setAula: (aula?: AulaInfo) => void,
}

export const AulaModal = ({ aula, setAula }: AulaModalProps) => {

    const openAula = () => {
        if (aula?.link) {
            Linking.openURL(aula.link).then(() => { })
        }
    }

    const renderMateriais = () => {
        return (
            <View style={{ marginTop: 5 }}>
                {
                    aula?.materiais.map(material => {
                        return (
                            <TouchableOpacity
                                style={[styles.materialCard, { backgroundColor: aula.turma.color }]}
                                key={material._id}
                                onPress={() => { Linking.openURL(material.link).then(() => { }) }}
                            >
                                <Text style={styles.materialDataName}>
                                    <Text style={styles.materialDataContent}>{`Nome: `}</Text>
                                    {material.name}
                                </Text>
                                <Text style={styles.materialDataName}>
                                    <Text style={styles.materialDataContent}>{`Link: `}</Text>
                                    {material.link}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    return (
        <Modal
            isVisible={!!aula}
            onBackdropPress={() => {
                setAula(undefined)
            }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <ScrollView style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Icon name="close" size={25} onPress={() => setAula(undefined)} />
                </View>
                <View style={styles.aulaTitleContainer}>
                    <View style={[styles.aulaBola, { backgroundColor: aula?.turma.color }]} />
                    <Text style={styles.aulaTitle}>
                        {aula?.title}
                    </Text>
                </View>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Descrição:</Text>
                    &nbsp;
                    <Text style={styles.dataContent}>{aula?.description || "Sem descrição"}</Text>
                </Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Data:</Text>
                    &nbsp;
                    <Text style={styles.dataContent}>{moment(aula?.date).format("DD/MM/YYYY")}</Text>
                </Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Horário:</Text>
                    &nbsp;
                    <Text style={styles.dataContent}>{moment(aula?.date).format("HH:mm")}</Text>
                </Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Duração:</Text>
                    &nbsp;
                    <Text style={styles.dataContent}>{aula?.duration} horas</Text>
                </Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Link:</Text>
                    &nbsp;
                    <Text style={[styles.dataContent, styles.dataLink]} onPress={openAula}>{aula?.link}</Text>
                </Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Materiais:</Text>
                    &nbsp;
                </Text>
                {renderMateriais()}
            </ScrollView>
        </Modal>
    )
}