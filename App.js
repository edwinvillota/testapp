import { createStackNavigator, createAppContainer } from 'react-navigation'

// Pages imports
import HomePage from './components/HomePage'
import NewPage from './components/NewPage'
import AboutPage from './components/AboutPage'

const AppNavigator = createStackNavigator({
  Home: { screen: HomePage },
  New: { screen: NewPage },
  About: { screen: AboutPage }
})

export default createAppContainer(AppNavigator)