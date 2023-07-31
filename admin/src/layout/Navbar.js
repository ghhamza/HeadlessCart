import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {createStyles, Navbar, UnstyledButton, Tooltip} from '@mantine/core'
import {
  IconDatabaseExport,
  IconDatabaseImport,
} from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
  },

  aside: {
    flex: '0 0 80px',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 5px',
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  mainLink: {
    width: 44,
    height: 44,
    marginBottom: 2,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({variant: 'light', color: theme.primaryColor})
        .color,
    },
  },
}))

const mainLinks = [
  {icon: IconDatabaseExport, label: 'Data Source', path: '/data-source', hasSubNavigation: true},
  {icon: IconDatabaseImport, label: 'Data Target', path: '/data-target', hasSubNavigation: false},
]


export default function AppNavbar() {
  const {classes, cx} = useStyles()
  const navigate = useNavigate()
  const [active, setActive] = useState('Releases')

  const mainLinksComp = mainLinks.map((link, index) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      key={`tooltip_${index}`}
    >
      <UnstyledButton
        onClick={() => {
          setActive(link.label)
          navigate(link.path)
        }}
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]: link.label === active,
        })}
      >
        <link.icon stroke={1.5}/>
      </UnstyledButton>
    </Tooltip>
  ))

  return (
    <Navbar width={{sm: 80}}>
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside}>
          <div>{mainLinksComp}</div>
        </div>
      </Navbar.Section>
    </Navbar>
  )
}
