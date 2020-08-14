class AuthService {
    static willRedirect = (currentLocation, destination, exact=false) => {
        console.log(`WillRedirect: from ${currentLocation} >> ${destination}, exact=${exact}`)
        if (currentLocation.startsWith(destination)) {
            if (exact && (currentLocation !== destination)) {
                return {redirect: true, destination: destination}
            } else {
                return {redirect: false, destination: currentLocation}
            }
        }
        return {redirect: true, destination: destination}
    }

    static doRedirect = (currentLocation, destination, exact) => {
        return this.willRedirect(currentLocation, destination, exact)
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