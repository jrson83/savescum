import * as api from '@/api'
import type { PlayStation } from '@/types'
import { StateCreator } from 'zustand'

export type PlayStationSlice = {
  consoles: PlayStation[]
  addConsole: (console: PlayStation) => void
  editConsole: (console: PlayStation) => void
  deleteConsole: (id: number) => void
  fetchProfiles: (console: PlayStation) => Promise<void>
}

const initialPlayStationState: PlayStation[] = [
  {
    id: 1,
    title: 'PlayStation 4',
    ip: '192.168.178.39',
    port: 21,
    user: '',
    password: '',
    users: [],
    requestType: 'browser',
  },
  {
    id: 2,
    title: 'PlayStation 5',
    ip: '192.168.56.2',
    port: 1337,
    user: 'anonymous',
    password: '',
    users: [],
    requestType: 'browser',
  },
]

export const createPlayStationSlice: StateCreator<PlayStationSlice> = (
  set,
  get
) => ({
  consoles: initialPlayStationState,
  fetchProfiles: async (console) => {
    await api.listProfiles(console).then((data) =>
      set(() => ({
        consoles: get().consoles.map((current) =>
          current.id === console.id
            ? {
                ...current,
                users: data.profiles,
              }
            : current
        ),
      }))
    )
  },
  addConsole: (console) =>
    set(() => {
      return {
        consoles: [
          ...get().consoles,
          {
            id: Date.now(),
            title: console.title,
            ip: console.ip,
            port: console.port,
            user: console.user,
            password: console.password,
            users: [],
            requestType: 'browser',
          },
        ],
      }
    }),
  editConsole: (console) =>
    set(() => ({
      consoles: get().consoles.map((current) =>
        current.id === console.id
          ? {
              ...current,
              title: console.title,
              ip: console.ip,
              port: console.port,
              user: console.user,
              password: console.password,
              users: [],
              requestType: 'browser',
            }
          : current
      ),
    })),
  deleteConsole: (id) =>
    set(() => {
      return {
        consoles: get().consoles.filter((console) => console.id !== id),
      }
    }),
})
