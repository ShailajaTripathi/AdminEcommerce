import Routing from './config/routing'
import { useEffect } from 'react'
import i18n from './components/LanguageTranslator/i18n'

function App() {
    useEffect(() => {
        const ln = localStorage.getItem('language')
        if (ln) {
            i18n.changeLanguage(ln)
        } else {
            i18n.changeLanguage('en')
        }
    }, [])
    return <Routing />
}

export default App
