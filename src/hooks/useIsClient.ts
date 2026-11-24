import { useSyncExternalStore } from 'react'

const noop = () => () => {}

/** false while hydrating prerendered HTML (and on the server), true afterwards. */
export const useIsClient = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
