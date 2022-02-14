import { render, screen } from '@testing-library/react'
import Searchbar from './components/searchbar/Searchbar';

test('renders search results title in movie row in home page', () => {
    render(<Searchbar />)
    const textElem = screen.queryByPlaceholderText(/enter a movie name.../i)
    expect(textElem)
})