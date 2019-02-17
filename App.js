import { createStackNavigator, createAppContainer } from 'react-navigation'

// Pages imports
import HomePage from './components/HomePage'
import NewPage from './components/NewPage'
import AboutPage from './components/AboutPage'
import EjecutionPage from './components/EjecutionPage'

const AppNavigator = createStackNavigator({
  Home: { screen: HomePage },
  New: { screen: NewPage },
  About: { screen: AboutPage },
  Ejecution: { screen: EjecutionPage }
})

export default createAppContainer(AppNavigator)