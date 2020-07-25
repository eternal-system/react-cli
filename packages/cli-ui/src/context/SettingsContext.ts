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
  }
}

export const SettingsContext = createContext<SettingsContextProps>({
  darkTheme: false,
  locale: 'en',
  selectedPath: [],
  changeTheme: noop,
  changeLocale: noop,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changeSelectedPath: (path: string[]) => {},
  socket: {
    on (status: string, noop: any) {
      return { status, noop }
    },
    off (status: string) {
      return { status }
    }
  }
})
