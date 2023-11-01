import { NextRouter } from "next/router";
import axios from 'axios';

export const authenticateUser = async (router: NextRouter, credentials: any, url: string) => {
    const response = await axios.post(
        url,
        credentials
    );

    const { accessToken } = response.data;

    // Store the tokens in localStorage or secure cookie for later use
    localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem("refreshToken", refreshToken);
    router.push("/contacts");
    console.log(response)
    return accessToken
}