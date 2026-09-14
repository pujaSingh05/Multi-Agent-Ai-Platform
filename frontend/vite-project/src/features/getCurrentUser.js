import api from "../../utils/axios"

const getCurrentUser = async () => {

    try {
        const { data } = await api.get("/api/me")
        return data
    } catch (error) {
        console.log({ error }, "getCurrentUser error")
        return null
    }
}

export default getCurrentUser