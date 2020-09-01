import React, { useState, useEffect } from 'react'
import UserProvider from '../APIFetch'

export function useFetchData(updated) {
    const [userData, setUserData] = useState({})
    const [picture, setPicture] = useState('')
    const [loading, setLoading] = useState(true)

    async function fetchData() {
        if (localStorage.getItem('accessToken') !== "null") {
            let payload = JSON.parse(atob(localStorage.getItem('accessToken').split(".")[1]));
            const dataResult = await UserProvider.getUser(`user/profile/${payload.id}`, false, localStorage.getItem('accessToken'));
            if (dataResult.success) {
                setUserData(dataResult.user)

                if (dataResult.user.picture) {
                    setPicture(await fetchPicture(dataResult.user.picture))
                } else {
                    console.log(dataResult.error)
                    setLoading(true)
                }
                setLoading(false)
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [updated])
    return [userData, picture, loading]
}

const fetchPicture = async(fileName) => {
    let picture = ''
    const pictureResult = await UserProvider.getUser(`user/picture/${fileName}/upload`, false, localStorage.getItem('accessToken'));
    if (pictureResult.success) {
        if (pictureResult.success) {
            const base64Flag = 'data:image/jpeg;base64,';
            picture = base64Flag + pictureResult.file
        } else {
            console.log(pictureResult.error)
        }
    }
    return picture
}

export function useValidToken() {
    const [token, setToken] = useState(localStorage.getItem('accessToken'))
    useEffect(() => {
        (async function() {
            if (localStorage.getItem('accessToken') !== 'null') {
                let payload = JSON.parse(atob(localStorage.getItem('accessToken').split(".")[1]));
                const dataResult = await UserProvider.getUser(`verifytoken`, false, localStorage.getItem('accessToken'));
                if (!dataResult.success) {
                    setToken('null')
                    localStorage.setItem('accessToken', null)
                    localStorage.setItem('refreshToken', null)
                }
            }
        })()
    }, [localStorage.getItem('accessToken')])
    return token
}