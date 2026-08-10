import api from '../utils/axios'

const getCurrentUser = async () => {
    try {
        const { data } = await api.get('/api/me');
        return data;
        console.log(data)
    } catch (error) {
        console.error('Error fetching current user:', error);
        return [];
    }
}

export default getCurrentUser; 