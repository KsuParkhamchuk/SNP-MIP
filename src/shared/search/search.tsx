import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import styles from './search.module.scss'
import { ChangeEvent, useState } from 'react'

interface SearchProps {
  onSearchClick: (searchQuery: string) => void
}

export const Search: React.FC<SearchProps> = ({ onSearchClick }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
      <div className={styles.search}>
        <input type="search" id="search-dropdown"
               className={styles.search__input}
               placeholder="Client search..."
               required
               onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value) }}
        />
          <button type="submit"
                  className={styles.search__icon}
                  onClick={() => { onSearchClick(searchQuery) }}
                  >
            <MagnifyingGlassIcon className='w-6 h-6'/>
            <span className="sr-only">Search</span>
          </button>
      </div>
  )
}
