import {MemoryRouter as Router} from 'react-router-dom'
import {MantineProvider, AppShell} from '@mantine/core'
import AppNavbar from './layout/Navbar'
import AppHeader from './layout/Header'
import Main from './layout/Main'

export default function App() {
  return (
    <Router>
      <MantineProvider withGlobalStyles withNormalizeCSS>
          <AppShell
            padding={0}
            navbar={<AppNavbar/>}
            header={<AppHeader/>}
            styles={(theme) => ({
              root: {
                overflow: 'hidden',
              },
              main: {
                backgroundColor: 'white',
                margin: 0,
              },
            })}
          >
            <Main/>
          </AppShell>
      </MantineProvider>
    </Router>
  )
}
