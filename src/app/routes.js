import Home from 'pages/Home'
import Experience from 'pages/Experience'
import NotFound from 'pages/NotFound'

export default {
  opts: {},
  routes: [
    {
      name: 'home',
      paths: {
        all: '/'
      },
      component: Home
    },
    {
      name: 'experience',
      paths: {
        all: '/experience'
      },
      component: Experience
    },
    {
      name: 'notfound',
      paths: {
        all: '*'
      },
      component: NotFound
    }
  ]
}
