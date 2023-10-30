import api from '@/helpers/api';
import { NextRouter } from 'next/router';
export const createOrUpdateContact = async (router: NextRouter, credentials: any, url: string, method: "put" | "post") => {
    const response = await api[method](
        url,
        credentials
    );
    router.push("/contacts");
    return response

}