/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react'

function noop () {}

interface SettingsContextProps {
  darkTheme: boolean | null;
  locale: string | null;
  selectedPath: string[];
  changeTheme(): void,
  changeLocale(): void,
  changeSelectedPath(path: string[]): void,
  socket: {
    on(status: string, noop: any): void,
    off(status: string): void;
    send(status: object): void;
  }
}

export const SettingsContext = createContext<SettingsContextProps>({
  darkTheme: false,
  locale: 'en',
  selectedPath: [],
  changeTheme: noop,
  changeLocale: noop,
  changeSelectedPath: (path) => {},
  socket: {
    on (status, noop) {},
    off (status) {},
    send (status) {}
  }
})
