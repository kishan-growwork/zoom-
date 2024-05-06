import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin'
import { useState } from 'react'
import SocialButton from './SocialButton'
import { icons } from '../constants'

export default function GoogleLogin() {
    GoogleSignin.configure({
        scopes: ['email', 'openid', 'profile'],
        webClientId:
            '723432648509-2tav0udni7ccnd5c4uinnkcbd1hd1oni.apps.googleusercontent.com',
        iosClientId:
            '723432648509-1k5p7ofjid3g3jfdua2rdkruti8m1nt8.apps.googleusercontent.com',
    })
    const [user, setUser] = useState()

    const handleClickSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            //   setState({ userInfo });
            setUser(userInfo)
            console.info('-------------------------------')
            console.info('userInfo => ', userInfo)
            console.info('-------------------------------')
        } catch (err) {
            console.info('----------------------------');
            console.info('err =>', err);
            console.info('----------------------------');
        }
    }

    return (
        <>
            <SocialButton
                icon={icons.google}
                onPress={() => handleClickSignIn()}
            />
        </>
    )
}
