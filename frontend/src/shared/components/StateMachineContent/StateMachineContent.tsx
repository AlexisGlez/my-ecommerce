import { Spinner } from '@app-shared/components/Spinner'
import { ErrorMessage } from '@app-shared/components/ErrorMessage'

interface StateMachineContentProps {
  state: State
  error: string | null
}

export const StateMachineContent: React.FC<StateMachineContentProps> = ({
  state,
  error,
  children,
}) => {
  if (state === 'error') {
    return <ErrorMessage message={error} />
  } else if (state === 'loading') {
    return <Spinner />
  }

  return children as React.ReactElement
}
