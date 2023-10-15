import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

export function useIPFS() {

    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001/api/v0",
        headers: {
        authorization,
        },
    })

    const uploadFileIPFS = async (file:any) => {
        const result = await ipfs.add(file)
        return result
    }

    return { uploadFileIPFS }

}
