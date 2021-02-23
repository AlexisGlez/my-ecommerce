import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

import { Link } from '@app-shared/components/Link'
import { Config } from '@app-shared/Config'

interface BreadcrumbProps {
  page: 'login' | 'shipping' | 'payment' | 'checkout'
}

const shippingLink = {
  as: Link,
  href: Config.Routes.shipping(),
}

const paymentLink = {
  as: Link,
  href: Config.Routes.payment(),
}

const checkoutLink = {
  as: Link,
  href: Config.Routes.checkout(),
}

const disableLink = {
  opacity: 0.5,
  cursor: 'not-allowed',
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ page }) => {
  const paymentLinkProps = page === 'payment' || page === 'checkout' ? paymentLink : disableLink
  const checkoutLinkProps = page === 'checkout' ? checkoutLink : disableLink

  return (
    <ChakraBreadcrumb margin="0 auto" width="100%" spacing={{ base: '0.5rem', sm: 'auto' }}>
      <BreadcrumbItem isCurrentPage={page === 'login'} width={{ base: 'auto', sm: '20%' }}>
        <BreadcrumbLink>Sign In</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage={page === 'shipping'} width={{ base: 'auto', sm: '20%' }}>
        <BreadcrumbLink {...shippingLink}>Shipping</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage={page === 'payment'} width={{ base: 'auto', sm: '20%' }}>
        <BreadcrumbLink {...paymentLinkProps}>Payment</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage={page === 'checkout'} width={{ base: 'auto', sm: '20%' }}>
        <BreadcrumbLink {...checkoutLinkProps}>Checkout</BreadcrumbLink>
      </BreadcrumbItem>
    </ChakraBreadcrumb>
  )
}
