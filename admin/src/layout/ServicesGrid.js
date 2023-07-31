import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  rem,
} from '@mantine/core'
import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
  IconReceiptRefund,
  IconReceipt,
  IconReceiptTax,
  IconReport,
  IconCashBanknote,
  IconCoin,
} from '@tabler/icons-react'

const mockdata = [
  {title: 'Credit cards', icon: IconCreditCard, color: 'violet'},
  {title: 'Banks nearby', icon: IconBuildingBank, color: 'indigo'},
  {title: 'Transfers', icon: IconRepeat, color: 'blue'},
  {title: 'Refunds', icon: IconReceiptRefund, color: 'green'},
  {title: 'Receipts', icon: IconReceipt, color: 'teal'},
  {title: 'Taxes', icon: IconReceiptTax, color: 'cyan'},
  {title: 'Reports', icon: IconReport, color: 'pink'},
  {title: 'Payments', icon: IconCoin, color: 'red'},
  {title: 'Cashback', icon: IconCashBanknote, color: 'orange'},
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

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size="2rem"/>
      <Text size="xs" m={2}>
        {item.title}
      </Text>
    </UnstyledButton>
  ))

  return (
    <div className={classes.container}>
      {
        ['Products', 'Contacts', 'Orders', 'Config'].map(service => (
          <>
            <Card mt="md" className={classes.card}>
              <Text className={classes.title} mb={4}>{service}</Text>
              <SimpleGrid cols={5}>
                {items}
              </SimpleGrid>
            </Card>
          </>
        ))
      }
    </div>
  )
}