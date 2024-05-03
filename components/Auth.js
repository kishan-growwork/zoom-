import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import { useState } from 'react'

export default function GoogleLogin() {
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId:
            '723432648509-2tav0udni7ccnd5c4uinnkcbd1hd1oni.apps.googleusercontent.com',
        iosClientId:
            '723432648509-1k5p7ofjid3g3jfdua2rdkruti8m1nt8.apps.googleusercontent.com',
    })
    const [user, setUser] = useState()
    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={async () => {
                try {
                    await GoogleSignin.hasPlayServices()
                    const userInfo = await GoogleSignin.signIn()
                    //   setState({ userInfo });
                    setUser(userInfo)
                    console.info('-------------------------------')
                    console.info('userInfo => ', userInfo)
                    console.info('-------------------------------')
                } catch (error) {
                    console.info('-------------------------------')
                    console.info('error => ', error)
                    console.info('-------------------------------')
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                        // user cancelled the login flow
                    } else if (error.code === statusCodes.IN_PROGRESS) {
                        // operation (e.g. sign in) is in progress already
                    } else if (
                        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
                    ) {
                        // play services not available or outdated
                    } else {
                        // some other error happened
                    }
                }
            }}
            //   disabled={this.state.isSigninInProgress}
        />
    )
}
