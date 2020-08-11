class AuthService {
    willRedirect = (destination) => {
        if (window.location.pathname !== destination) {
            return {redirect: true, destination: destination}
        }
        return {redirect: false, destination: null}
    }

    doRedirect = (destination) => {
        return this.willRedirect(destination)
    }

    static async getUser(firebase, onSuccess, onFail) {
        await firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("User : ", user)
                onSuccess(user)
            } else {
                console.log("No user")
                onFail(user)
            }
        })
    }

    logout = (e, firebase, onSuccess, onFail) => {
        e.preventDefault()
        firebase.auth().signOut().then(response => {
            onSuccess(response)
        }).catch(reason => {
            onFail(reason)
        })
    }
}
export default AuthService