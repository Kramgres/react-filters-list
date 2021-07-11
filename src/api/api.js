import axios from "axios";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const commentsAPI = {
    getComments(){
        return instance.get(`comments`).then(response => {
            return response.data
        })
    }
}