import React, { useEffect, useState } from 'react';
import { getAllTurmas, getAulas } from './requester';
import "./Home.css";
import { ClassCard } from '../../components/ClassCard/ClassCard';
import { Calendar } from '../../components/Calendar/Calendar';
import { formatDateToSend } from '../../Tools/formatDateToSend';
import { WeekBoard } from '../../components/WeekBoard/WeekBoard';
import moment from 'moment';

const startMonth = new Date().getMonth();
const startYear = new Date().getFullYear();
const userPermission = JSON.parse(localStorage.getItem("user") as string)?.role;

function Home() {
  const [turmas, setTurmas] = useState<Record<string, unknown>[]>([]);
  const [aulas, setAulas] = useState<Record<string, unknown>[]>([]);
  const [date] = useState(new Date(startYear, startMonth, 1));

  useEffect(()=>{
    getAllTurmas().then(turmas=>{
      setTurmas(turmas);
    })
  }, [])

  useEffect(()=>{
    const turmasIds = turmas.map((turma)=>{
      return turma.id as string;
    })

    if(userPermission === "admin") {
      const dateStart = formatDateToSend(startYear, startMonth+1, 1, "00:00:00");
      const dateEnd = formatDateToSend(startYear, startMonth+1, new Date(startYear, startMonth+1, 0).getDate(), "23:59:59");
      
      if(turmas.length > 0){
        getAulas(turmasIds, dateStart, dateEnd).then(aulas=>{
          const formatedAulas: Record<string, unknown>[] = [];
          aulas.forEach(aula=>{
            const day = parseInt((aula.date as string).substr(8,2));
            aula.day = day;
            formatedAulas.push(aula);
          })
          setAulas(formatedAulas);
        })
      }
    } else {
      const dateStart = formatDateToSend(startYear, startMonth+1, moment().startOf('week').toDate().getDate(), "00:00:00");
      const dateEnd = formatDateToSend(startYear, startMonth+1, moment().endOf('week').toDate().getDate(), "23:59:59");
      
      if(turmas.length > 0){
        getAulas(turmasIds, dateStart, dateEnd).then(aulas=>{
          const formatedAulas = aulas.map(aula=>{
            aula.day = parseInt((aula.date as string).substr(8,2));
            return aula;
          })
          setAulas(formatedAulas);
        })
      }
    }
  }, [turmas])

  return (
    <div style={{
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }}>
      <div className='list-page-title' style={{marginBottom: "20px"}}>Turmas</div>
      <div className="turmas-container">
        {
          turmas.map(turma=>{
            return (
              <ClassCard
                id={turma.id as string}
                name={turma.name as string}
                color={turma.color as string}
                icon={turma.icon as string}
              />
            )
          })
        }
      </div>
      { userPermission === "admin" ? 
          <Calendar
            date={date}
            aulas={aulas}
          />
        :
          <WeekBoard
            aulas={aulas}
          />
      }
    </div>
  );
}

export default Home;