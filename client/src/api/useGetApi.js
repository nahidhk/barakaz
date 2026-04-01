import { useEffect, useState } from "react";
import api from "./api.json";

export function useGetApi(tableName) {
    const [jsonData, setJsonData] = useState([]);
    const [error, setError] = useState(false);   
    const [loading, setLoading] = useState(false); 

    const fetchData = async () => {
        if (!tableName) return;

        setLoading(true);
        setError(false);

        try {
            const response = await fetch(api.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "get",
                    table: tableName,
                    key: api.apikey
                })
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            setJsonData(data.data || data);

        } catch (err) {
            console.error("API Error:", err);
            setError(true); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tableName]);

    return { jsonData, error, loading, refetch: fetchData };
}