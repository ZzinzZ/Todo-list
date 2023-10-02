'use client'
import React, { useEffect } from 'react';
import axios from "axios";

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 5000,
});

export default function Data() {
    useEffect(() => {
        api.get('/todos')
            .then((response) => {
                const data = response.data.todos;
                localStorage.setItem('DataApi', JSON.stringify(data));
            })
            .catch(error => console.log(error));
    }, []);
}
