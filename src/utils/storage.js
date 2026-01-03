const STORAGE_KEY = 'portfolio-tracker-data'

export const getPortfolioFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Fout bij laden portfolio:', error)
    return []
  }
}

export const savePortfolioToStorage = (portfolio) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio))
  } catch (error) {
    console.error('Fout bij opslaan portfolio:', error)
  }
}

