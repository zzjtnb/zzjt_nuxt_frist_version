import Cookie from '../utils/cookie'

const TOKEN_KEY = "TOKEN_KEY"

export const state = () => ({
  token: '' || Cookie.getAttribute(TOKEN_KEY)
})
export const mutations = {
  SET_TOKEN: (state, value) => {
    state.token = value
    Cookie.setAttribute(TOKEN_KEY, value, 30)
  },
  REMOVE_TOKEN: (state) => {
    state.token = null
    Cookie.remove(TOKEN_KEY)
  }
}
export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({
    commit
  }, {
    app
  }) {
    // console.log(app);
    // if (req.session && req.session.authUser) {
    //   commit('SET_USER', req.session.authUser)
    // }
  },
  Authentication({
    commit
  }, accessToken) {
    api.verifyToken(accessToken).then((response) => {
      let result = response.data
      let githubUsername = store.state.configuration.githubUsername
      if (githubUsername == result['login']) {
        commit('SET_TOKEN', accessToken)
        console.log(store.state.common.redirect);
        if (store.state.common.redirect !== undefined) {
          router.push(store.state.common.redirect);
        } else {
          router.push('/')
        }
      } else {

      }
    }).catch(() => {

    })
  },
  Cancellation({
    commit
  }) {
    commit('REMOVE_TOKEN')
    location.reload();
  },
}
