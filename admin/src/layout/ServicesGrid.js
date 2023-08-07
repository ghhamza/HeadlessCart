import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  rem,
} from '@mantine/core'
import {
  IconReceipt2,
  IconBox,
  IconCategory,
  IconAdjustmentsAlt,
  IconVersions,
} from '@tabler/icons-react'

const apps = [
  {
    title: 'Products',
    routes: [
      {title: 'Products', icon: IconBox, color: 'violet'},
      {title: 'Categories', icon: IconCategory, color: 'indigo'},
      {title: 'Attributes', icon: IconAdjustmentsAlt, color: 'blue'},
      {title: 'Variants', icon: IconVersions, color: 'green'},
      {title: 'Pricelists', icon: IconReceipt2, color: 'green'},
    ],
  },
]

const useStyles = createStyles((theme) => ({
  container: {
    height: '100vh',
    padding: 10,
  },
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: rem(90),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.05)',
    },
  },
}))

export default function ServicesGrid() {
  const {classes, theme} = useStyles()

  return (
    <div className={classes.container}>
      {
        apps.map(app => (
          <>
            <Card mt="md" className={classes.card}>
              <Text className={classes.title} mb={4}>{app.title}</Text>
              <SimpleGrid cols={5}>
                {app.routes.map((item) => (
                  <UnstyledButton key={item.title} className={classes.item}>
                    <item.icon color={theme.colors[item.color][6]} size="2rem"/>
                    <Text size="xs" m={2}>
                      {item.title}
                    </Text>
                  </UnstyledButton>
                ))
                }
              </SimpleGrid>
            </Card>
          </>
        ))
      }
    </div>
  )
}