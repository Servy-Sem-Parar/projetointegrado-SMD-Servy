import { useEffect, useState } from "react";
import { View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import { storage } from "../../Tools/storage";

export function TurmaPage({navigation}: {navigation: any}) {
    const [turma, setTurma] = useState<Record<string, unknown>>({});
    const [backPage, setBackPage] = useState("HomePage");

    useEffect(()=>{
        (async function() {
            const turma = await storage.getItem("turma") as string;
            const backPage = await storage.getItem("backPage");
            const turmaData = JSON.parse(turma) as Record<string, unknown>;
            setTurma(turmaData);
            if(backPage){
                setBackPage(backPage);
            }
        })();
    }, [])

    return (
        <Layout title={turma.name as string} backPage={backPage} showBackButtonBar={true} navigation={navigation} hideBar={true}>
            <View></View>
        </Layout>
    )
}