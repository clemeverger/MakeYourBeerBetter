export default async function getData(){    
    const hops_response = await fetch("data/hops.json").then(response => response.json());
    const malts_response = await fetch("data/malts.json").then(response => response.json());
    const yeasts_response = await fetch("data/yeasts.json").then(response => response.json());
    
    const DATA = {
        hops: await hops_response.data,
        malts: await malts_response.data,
        yeasts: await yeasts_response.data
    }
    return DATA;
}
