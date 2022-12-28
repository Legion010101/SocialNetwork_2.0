import {create} from 'react-test-renderer'
import {StatusWithHook} from './StatusWithHook'
import {render, screen} from '@testing-library/react'

describe('Profile status Component', () => {
  test('Status from props should be in the status', () => {
    render(<StatusWithHook statusProps={'123'} />)
    expect(screen.getByText('123')).toBeInTheDocument()
  })
  test('after create status in the span should be displayed', () => {
    const component = create(<StatusWithHook statusProps={'123'} />)
    const root = component.root
    let span = root.findAllByType('span')
    expect(span.length).toBe(1)
  })
})
