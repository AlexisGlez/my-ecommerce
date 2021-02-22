import { useState, useRef, useEffect } from 'react'
import {
  chakra,
  Flex,
  Spacer,
  IconButton,
  Icon,
  useColorMode,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useViewportScroll } from 'framer-motion'
import { FaMoon, FaSun, FaShoppingCart, FaUser, FaChevronDown } from 'react-icons/fa'

import { Config } from '@app-shared/Config'
import { Link } from '@app-shared/components/Link'
import { UserStore } from '@app-stores/UserStore'

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const bg = useColorModeValue('white', 'gray.800')
  const shadow = useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)')

  const [y, setY] = useState(0)
  const { scrollY } = useViewportScroll()
  useEffect(() => scrollY.onChange(() => setY(scrollY.get())), [scrollY])

  const ref = useRef<HTMLHeadingElement>(null)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const currentUser = UserStore.useCurrentUser()
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [setIsMounted])

  return (
    <chakra.header
      ref={ref}
      boxShadow={y > height ? `0 1px 2px 0 ${shadow}` : undefined}
      transition="box-shadow 0.2s"
      pos="fixed"
      top="0"
      zIndex="1"
      bg={bg}
      left="0"
      right="0"
      width="full"
    >
      <chakra.nav maxW="7xl" py="1.5rem" px="1rem" mx="auto">
        <Flex alignItems="center">
          <Link
            href={Config.Routes.home()}
            fontWeight="semibold"
            fontSize="lg"
            textTransform="uppercase"
          >
            My-Ecommerce
          </Link>
          <Spacer />
          <Flex alignItems="center">
            <Link href={Config.Routes.cart()}>
              <Icon as={FaShoppingCart} mr="0.5rem" /> Cart
            </Link>
            {isMounted && currentUser ? (
              <Menu>
                <MenuButton as={Button} ml="1rem" rightIcon={<FaChevronDown />}>
                  {currentUser.name}
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link href={Config.Routes.profile()} width="100%">
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={UserStore.logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link href={Config.Routes.login()} ml="1rem">
                <Icon as={FaUser} mr="0.5rem" /> Sign In
              </Link>
            )}
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${colorMode} mode`}
              variant="ghost"
              color="current"
              ml={{ base: '0', md: '3' }}
              onClick={toggleColorMode}
              icon={<SwitchIcon />}
            />
          </Flex>
        </Flex>
      </chakra.nav>
    </chakra.header>
  )
}
