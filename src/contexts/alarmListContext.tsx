import { ReactNode, createContext, useEffect, useState } from 'react'

interface AlarmType {
  color: string
  customer: string
  date: string
  id: number
  last_send_api: string
  monitorado?: string
  number: string
  provider: string
  qtde: number
  timeoff: number
}

interface AlarmListContextType {
  alarmList: AlarmType[]
  getAlarmList: () => object
}

interface AlarmListProviderProps {
  children: ReactNode
}

export const AlarmListContext = createContext({} as AlarmListContextType)

export function AlarmListProvider({ children }: AlarmListProviderProps) {
  const [alarmList, setAlarmList] = useState<AlarmType[]>([])

  const URL = import.meta.env.VITE_API_URL

  async function getAlarmList() {
    const response = await fetch(`${URL}listAlarms`)
    const data = await response.json()

    setAlarmList(data)
  }

  useEffect(() => {
    getAlarmList()
  }, [])

  return (
    <AlarmListContext.Provider value={{ alarmList, getAlarmList }}>
      {children}
    </AlarmListContext.Provider>
  )
}
