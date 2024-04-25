import { all, takeEvery, put } from 'redux-saga/effects'
// import axios from "axios"
import actions from './actions'
import { loginAPI, registerUserAPI, verifyOTPAPI } from '../../api/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { storeData } from '../../helper'

export function* WATCH_SIGN_IN(action) {
    console.info('----------------------------');
    console.info('action =>', action);
    console.info('----------------------------');
    try {
        const resp = yield loginAPI(action.payload)
        yield put({
            type: actions.SET_AUTH_STATE,
            payload: { user: resp?.data?.otp },
        })
    } catch (err) {
        console.info('--------------------')
        console.info('err => ', err)
        console.info('--------------------')
    }
}

export function* WATCH_VERIFY_OTP(action) {
    try {
        const resp = yield verifyOTPAPI(action.payload)

        if (resp?.data?.token) {
            console.info('----------------------------');
            console.info('resp?.data =>', resp?.data);
            console.info('----------------------------');
            console.info('----------------------------');
            console.info('resp?.data?.token =>', resp?.data?.token);
            console.info('----------------------------');
            storeData('token', resp?.data?.token)
        }

        yield put({
            type: actions.SET_AUTH_STATE,
            payload: { user: resp?.data?.user },
        })
    } catch (err) {
        console.info('--------------------')
        console.info('err => ', err)
        console.info('--------------------')
    }
}

export function* WATCH_REGISTER_USER(action) {
    try {
        const resp = yield registerUserAPI(action.payload)

        yield put({
            type: actions.SET_AUTH_STATE,
            payload: { user: resp?.data?.user },
        })
    } catch (err) {
        console.info('--------------------')
        console.info('err => ', err)
        console.info('--------------------')
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actions.SET_NUMBER, WATCH_SIGN_IN)])
    yield all([takeEvery(actions.VERIFY_OTP, WATCH_VERIFY_OTP)])
    yield all([takeEvery(actions.REGISTER_USER, WATCH_REGISTER_USER)])
}
