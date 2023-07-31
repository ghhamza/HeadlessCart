import {
  createStyles,
  Text,
  Group,
  ActionIcon,
  NativeSelect,
  Tooltip,
  Box,
  NavLink,
  rem,
} from '@mantine/core'
import {
  IconBox,
  IconPlus,
  IconChevronRight,
} from '@tabler/icons'
import {useEffect, useState} from 'react'

const useStyles = createStyles((theme) => ({

  collections: {
    paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

}))

export default function Collections({config, onSelectDimension}) {
  const {classes} = useStyles()
  const [value, setValue] = useState('together')
  const [collectionLinks, setCollectionLinks] = useState([])
  const [dimension, setDimension] = useState(null)

  useEffect(function () {
    const collections = config.filter(c => c.source === value)[0]
      .dimensions
      .map((dim) => (
        <NavLink
          key={dim.model}
          active={dim.model === dimension?.model}
          onClick={() => {
            setDimension(dim)
            onSelectDimension(dim)
          }}
          label={dim.name}
          icon={<IconBox size="1rem" stroke={1.5}/>}
          rightSection={<IconChevronRight size="0.8rem" stroke={1.5}/>}
        />
      ))
    setCollectionLinks(collections)
  }, [value, dimension])

  return (
    <>
      <Group className={classes.collectionsHeader} position="apart">
        <Text size="xs" weight={500} color="dimmed">
          Data Sources
        </Text>
      </Group>
      <div className={classes.collections}>
        <NativeSelect
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          data={config.map(c => ({value: c.source, label: c.name}))}
          withAsterisk
        />
      </div>
      <Group className={classes.collectionsHeader} position="apart">
        <Text size="xs" weight={500} color="dimmed">
          Dimensions
        </Text>
        <Tooltip label="Create collection" withArrow position="right">
          <ActionIcon disabled variant="default" size={18}>
            <IconPlus size="0.8rem" stroke={1.5}/>
          </ActionIcon>
        </Tooltip>
      </Group>
      <Box w={240}>
        {collectionLinks}
      </Box>
    </>
  )
}