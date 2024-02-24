// components/FileUploader.js
import React, { useState, useRef } from 'react';
import { v5 as uuidv5 } from 'uuid';
import axios from 'axios';
import { Button } from './ui/button'; // Adjust the import path as necessary

const FileUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
        if (event.target.files.length > 0) {
            uploadAndProcessFiles(event.target.files);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const uploadAndProcessFiles = async () => {
        const NAMESPACE = 'https://r2r-service-ojpswilu4a-uc.a.run.app'; // Replace with your namespace URL or DNS
        for (let file of selectedFiles) {
            const filePath = `examples/academy/${file.name}`;
            console.log(`Uploading and processing file: ${filePath}`);

            const documentId = uuidv5(filePath, uuidv5.DNS);
            const metadata = {
                user_id: "user_id_0", // Replace with actual user ID
                chunk_prefix: "YourTitleHere", // Replace or dynamically set your title
            };
            const settings = {}; // Define any settings if needed

            // Assuming you have an endpoint to handle the file upload and processing
            const formData = new FormData();
            formData.append("documentId", documentId);
            formData.append("file", file);
            formData.append("metadata", JSON.stringify(metadata));
            formData.append("settings", JSON.stringify(settings));

            try {
                const response = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Upload response:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div>
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the file input
                ref={fileInputRef}
            />
            <Button onClick={triggerFileInput} variant="default" size="default">
                Upload and Process Files
            </Button>
        </div>
    );
};

export default FileUploader;