import DataUriParser from 'datauri/parser.js';

import path from "path";

// getting file uri
const getDataUri = (file) =>{
    const parser = new DataUriParser();
    const extensionName = path.extname(file?.originalname || '').toString();
    return parser.format(extensionName,file.buffer);
}

export default getDataUri; 