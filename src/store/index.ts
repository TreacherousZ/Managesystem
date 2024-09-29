import { create } from 'zustand'
import { User } from '@/types/api'

export const useStore = create<{
	token: string
	userInfo: User.UserItem
	collapsed: boolean
	updateToken: (token: string) => void
	updateUserInfo: (userInfo: User.UserItem) => void
	updateCollapsed: () => void
}>(set => ({
	token: '',
	userInfo: {
		"_id": '',
		"userId": 0,
		"userName": '',
		"createId": 0,
		"deptId": '',
		"deptName": '',
		"job": '',
		"mobile": '',
		"role": 0,
		"roleList": '',
		"state": 0,
		"userEmail": '',
		"userImg": ''
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
