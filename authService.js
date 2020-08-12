class AuthService {
    static willRedirect = (currentLocation, destination) => {
        console.log(`WillRedirect: from ${currentLocation} >> ${destination} :: ${currentLocation !== destination}`)
        if (currentLocation !== destination) {
            return {redirect: true, destination: destination}
        }
        return {redirect: false, destination: null}
    }

    static doRedirect = (currentLocation, destination) => {
        return this.willRedirect(currentLocation, destination)
    }

    static async watchUser(firebase, onSuccess, onFail) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("User:", user.email)
                onSuccess(user)
            } else {
                console.log("No user")
                onFail(user)
            }
        })
    }

    static logout = (e, firebase, onSuccess, onFail) => {
        e.preventDefault()
        firebase.auth().signOut().then(response => {
            onSuccess(response)
        }).catch(reason => {
            onFail(reason)
        })
    }
}
export default AuthService