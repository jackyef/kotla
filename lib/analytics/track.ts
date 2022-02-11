export const trackEvent = (eventName: string) => {
  try {
    // @ts-expect-error
    gtag('event', eventName)
  } catch {
    // noop
  }
}
