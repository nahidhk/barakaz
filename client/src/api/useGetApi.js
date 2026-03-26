
// import api from './api.json';

// export function useGetApi(tableName) {


//     //  if (!tableName) return;

        
//            fetch(api.baseUrl, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     type: "get",
//                     table: "catagory",
//                     key: "abc123"
//                 })
//             })
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//             })
//             .catch(err => {
//                 console.error("Error fetching data:", err);
//             });


// }


import { useEffect, useState } from "react";
import api from './api.json';

export function useGetApi(tableName) {
    const [jsonData, setJsonData] = useState([]);

    const fetchData = async () => {
        if (!tableName) return;

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
        }
    };

    useEffect(() => {
        fetchData();
    }, [tableName]);

    const refetch = () => {
        fetchData();
    };

    return { jsonData, refetch };
}