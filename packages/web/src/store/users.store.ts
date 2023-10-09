import { StateCreator } from 'zustand'

export interface User {
  id: number
  displayName: string
  profileId: string
}

export type UserSlice = {
  users: User[]
  addUser: (user: User) => void
  editUser: (user: User) => void
  deleteUser: (id: number) => void
}

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  users: [],
  addUser: (user) =>
    set(() => {
      return {
        users: [
          ...get().users,
          {
            id: Date.now(),
            displayName: user.displayName,
            profileId: user.profileId,
          },
        ],
      }
    }),
  editUser: (user) =>
    set(() => ({
      users: get().users.map((current) =>
        current.id === user.id
          ? {
              ...user,
              displayName: user.displayName,
              profileId: user.profileId,
            }
          : current
      ),
    })),
  deleteUser: (id) =>
    set(() => {
      return {
        users: get().users.filter((user) => user.id !== id),
      }
    }),
})
