import axios from "axios"

function useAdminHook() {

    const getCategoriesData = async () => {
        try {
            const res = await axios.get('/api/categories?type=subject');
            console.log(res, '***')

        } catch (error) {
            console.log(error)
        }
    }

    return { getCategoriesData };
}

export default useAdminHook