import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import styles from './search.module.scss'

interface SearchProps {
  onClick: () => void
}

export const Search: React.FC<SearchProps> = ({ onClick }) => {
  return (
      <div className={styles.search}>
        <input type="search" id="search-dropdown"
               className={styles.search__input}
               placeholder="Client search..." required />
          <button type="submit"
                  className={styles.search__icon}
                  onClick={onClick}>
            <MagnifyingGlassIcon className='w-6 h-6'/>
            <span className="sr-only">Search</span>
          </button>
      </div>
  )
}
