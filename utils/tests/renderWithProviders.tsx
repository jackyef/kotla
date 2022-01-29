import { KotlaProvider } from '@/contexts/Kotla'
import { render } from '@testing-library/react'

export const renderWithProviders = (component: JSX.Element) => {
  return render(<KotlaProvider>{component}</KotlaProvider>)
}
