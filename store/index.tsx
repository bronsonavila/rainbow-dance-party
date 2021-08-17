import { createContext, PropsWithChildren, useContext, useReducer } from 'react'

interface AppState {
  cellSize: number
  colorRange: number
  columns: number
  isAutoIncrementing: boolean
  isMobileDevice: boolean | null
  iterations: number
  multiplier: number | string
  rows: number
  showBorders: boolean
  showMobileSettings: boolean
  step: string
}

const initialState: AppState = {
  cellSize: 16,
  colorRange: 360,
  columns: 16,
  isAutoIncrementing: false,
  isMobileDevice: null,
  iterations: 8,
  multiplier: 2.333,
  rows: 16,
  showBorders: true,
  showMobileSettings: false,
  step: '0.001',
}

const reducer = (state: AppState, dispatch: { [key: string]: unknown }) => {
  const [key, value] = Object.entries(dispatch)[0]
  return {
    ...state,
    [key]: value,
  }
}

const StoreContext = createContext(undefined as any)

export const StoreProvider = (props: React.PropsWithChildren<{}>) => {
  const [state, setState] = useReducer(reducer, initialState)
  return <StoreContext.Provider value={{ state, setState }} {...props} />
}

export const useStore = () => useContext(StoreContext)
