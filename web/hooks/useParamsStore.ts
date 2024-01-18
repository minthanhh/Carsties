import { create } from 'zustand'

type State = {
    pageNumber: number
    pageSize: number
    pageCount: number
    searchTerm: string
    orderBy: string
    searchValue: string
    filterBy: string
    seller?: string
    winner?: string
}

type Actions = {
    setParams: (params: Partial<State>) => void
    setSearchValue: (value: string) => void
    reset: () => void
}

const initialState: State = {
    pageNumber: 1,
    pageSize: 12,
    pageCount: 1,
    searchTerm: '',
    searchValue: '',
    orderBy: 'make',
    filterBy: 'live',
    seller: undefined,
    winner: undefined,
}

export const useParamsStore = create<State & Actions>()((set) => ({
    ...initialState,
    setParams: (newParams: Partial<State>) => {
        set((state) => {
            console.log({ ...state, ...newParams, pageNumber: 1 })
            if (!newParams.pageNumber) return { ...state, ...newParams, pageNumber: 1 }
            return { ...state, pageNumber: newParams.pageNumber }
        })
    },
    setSearchValue: (value: string) => {
        set({ searchValue: value })
    },
    reset: () => set(initialState),
}))
