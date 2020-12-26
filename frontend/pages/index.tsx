import React from 'react'
import { Link } from '@app-shared/components/Link'

export default function Index() {
  return (
    <>
      <h1>Hello World</h1>
      <Link href="/about">Go to the about page</Link>
    </>
  )
}
