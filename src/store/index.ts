import { create } from 'zustand'
import { User } from '@/types/api'

export const useStore = create<{
	token: string
	userInfo: {
		userEmail: string
		userName: string
	}
	collapsed: boolean
	updateToken: (token: string) => void
	updateUserInfo: (userInfo: User.UserItem) => void
	updateCollapsed: () => void
}>(set => ({
	token: '',
	userInfo: {
		userEmail: '',
		userName: ''
	},
	collapsed: false,
	updateToken: (token: string) => set({ token }),
	updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
	updateCollapsed: () => set(state => {
		return {
			collapsed: !state.collapsed
		}
	})
}))
