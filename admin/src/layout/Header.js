import {
  createStyles,
  Header,
  Drawer,
  Button,
} from '@mantine/core'
import {useDisclosure} from '@mantine/hooks'
import ServicesGrid from './ServicesGrid'


const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
  drawer: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
}))

export default function HeaderSearch() {
  const {classes} = useStyles()
  const [opened, {open, close}] = useDisclosure(false)

  return (
    <>
      <Drawer padding={0} size="lg" withCloseButton={false} opened={opened} onClose={close}>
        <ServicesGrid/>
      </Drawer>
      <Header height={40} className={classes.header}><Button onClick={open}>Open Drawer</Button></Header>
    </>
  )
}
