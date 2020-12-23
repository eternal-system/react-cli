import { createContext } from 'react'

function noop () {}

interface SettingsContextProps {
  darkTheme: boolean | null;
  locale: string | null;
  selectedPath: string[];
  changeTheme(): void,
  changeLocale(): void,
  changeSelectedPath(path: string[]): void,
  socket: SocketIOClient.Socket
}

export const SettingsContext = createContext<SettingsContextProps>({
  darkTheme: false,
  locale: 'en',
  selectedPath: [],
  changeTheme: noop,
  changeLocale: noop,
  changeSelectedPath: noop,
  socket: {
    on: noop,
    off: noop,
    send: noop
  } as unknown as SocketIOClient.Socket
})
