import moment from "moment";
import { useEffect, useState } from "react";
import { RefreshControl, View, Text, Linking, TouchableOpacity } from "react-native";
import { Layout, openLoader } from "../../components/Layout/Layout";
import { AulaInfo, MaterialInfo } from "../../Tools/commons.types";
import { storage } from "../../Tools/storage";
import { getAulas } from '../../Tools/commons.requester';
import { Calendar } from "../../components/Calendar/Calendar";
import { AulasModal } from "../../components/AulasModal/AulasModal";
import styles from "./TurmaPageStyles";
import { getMateriais } from "./requester";

export function TurmaPage({navigation}: {navigation: any}) {
    const [turma, setTurma] = useState<Record<string, unknown>>();
    const [backPage, setBackPage] = useState("HomePage");
    const [refreshing, setRefreshing] = useState(false);
    const [aulas, setAulas] = useState<AulaInfo[]>([]);
    const [materiais, setMateriais] = useState<MaterialInfo[]>([]);
    const [dateModal, setDateModal] = useState<Date>();
    const [date, setDate] = useState(new Date());

    useEffect(()=>{
        if (!turma || refreshing) {
            (async function() {
                openLoader();
                const turma = await storage.getItem("turma") as string;
                const backPage = await storage.getItem("backPage");
                const turmaData = JSON.parse(turma) as Record<string, unknown>;
                turmaData.professoras = "";
                if(turmaData.teachers) {
                    const teachers = turmaData.teachers as Record<string, unknown>[]
                    teachers.forEach((professora, index)=>{
                        if(index === 0) {
                            turmaData.professoras = professora.name;
                        } else if(index === teachers.length-1) {
                            turmaData.professoras = (turmaData.professoras as string) + " e " + professora.name;
                        } else {
                            turmaData.professoras = (turmaData.professoras as string) + ", " + professora.name;
                        }
                    })
                }
                setRefreshing(false);
                setTurma(turmaData);
                if(backPage){
                    setBackPage(backPage);
                }
            })();
        }
    }, [refreshing])

    useEffect(() => {
        if (turma) {
            const turmasId: string[] = [turma._id as string] || [];
            const dateStart = moment(date).startOf("month").toDate().toISOString()
            const dateEnd = moment(date).endOf("month").toDate().toISOString()
            getAulas(turmasId, dateStart, dateEnd).then(setAulas)
            getMateriais(turma._id as string).then((materiais)=>setMateriais(materiais as MaterialInfo[]))
        }
    }, [turma, date])

    const renderAulas = () => {
        return (
            <View>
                <Calendar
                    date={date}
                    aulas={aulas}
                    onClickDayCallback={setDateModal}
                    onChangeDateCallback={(date: Date) =>setDate(date)}
                />
                <AulasModal date={dateModal} setDate={setDateModal} aulas={aulas}/>
            </View>
        )
    }

    const renderTurma = () => {
        return (
            <View>
                <Text style={styles.pageTitle}>Dados da turma</Text>
                <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Nome: </Text>
                    <Text style={styles.dataContent}>{(turma && turma.name) ? turma.name as string : ""}</Text>
                </Text> 
                {(turma && turma.professoras && (turma.professoras as string).length > 0) && <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Professoras: </Text>
                    <Text style={styles.dataContent}>{(turma && turma.professoras) ? turma.professoras as string : ""}</Text>
                </Text>}
                {(turma && turma.description) && <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Descrição: </Text>
                    <Text style={styles.dataContent}>{(turma && turma.description) ? turma.description as string : ""}</Text>
                </Text> } 
                {(turma && turma.informations) && <Text style={styles.dataLine}>
                    <Text style={styles.dataName}>Informações adicionais: </Text>
                    <Text style={styles.dataContent}>{(turma && turma.informations) ? turma.informations as string : ""}</Text>
                </Text>}  
            </View>
        )
    }

    const renderMateriais = ()=>{
        return(
            <View>
                <Text style={styles.pageTitle}>Materiais de apoio</Text>
                {
                    materiais.map(material=>{
                        return (
                            <TouchableOpacity
                                style={[styles.materialCard, {backgroundColor: turma ? turma.color as string : ""}]} 
                                key={material._id}
                                onPress={()=>{Linking.openURL(material.link).then(() => {})}}
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
            backPage={backPage} showBackButtonBar={true} 
            navigation={navigation} hideBar={true}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => setRefreshing(true)}
                />
            }
        >
            <View style={{marginBottom: 20}}>
                {renderTurma()}
                {renderAulas()}
                {renderMateriais()}
            </View>
        </Layout>
    )
}