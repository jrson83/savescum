import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  type PlayStationSlice,
  createPlayStationSlice,
} from './playstation.store'
import { type UserSlice, createUserSlice } from './users.store'

export type AppStore = PlayStationSlice & UserSlice

export const useAppStore = create<AppStore>()(
  persist(
    (...rest) => ({
      ...createPlayStationSlice(...rest),
      ...createUserSlice(...rest),
    }),
    {
      name: 'savescumstore',
    }
  )
)
