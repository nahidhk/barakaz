import api from "./api.json";

export default async function uploadApi(formData) {
    try {
        const response = await fetch(api.baseUrl, {
            method: "POST",
            // ❌ Content-Type দিবি না (browser auto set করবে)
            body: formData
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}