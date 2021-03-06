import logger from "../../CORE/services";

class AuthService {
    static willRedirect = (currentLocation, destination, exact=false) => {
        logger(`WillRedirect: from ${currentLocation} >> ${destination}, exact=${exact}`)
        let result;
        if (currentLocation.startsWith(destination)) {
            if (exact && (currentLocation !== destination)) {
                result = {redirect: true, destination: destination}
            } else {
                result = {redirect: false, destination: currentLocation}
            }
        } else {
            result = {redirect: true, destination: destination}
        }
        logger(`Result: ${result}`)
        return result
    }

    static doRedirect = (currentLocation, destination, exact) => {
        return this.willRedirect(currentLocation, destination, exact)
    }

    static async watchUser(firebase, onSuccess, onFail) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                logger("User:", user.email)
                onSuccess(user)
            } else {
                logger("No user")
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