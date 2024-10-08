import { Auth } from 'aws-amplify';
import { Storage } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { logDownload } from '../utils/logging'; // Adjust the path as needed

const LegalComponent = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [retry, setRetry] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch the authenticated user
    const fetchUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserId(user.username);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const handleDownload = async (result: Blob) => {
    const url = URL.createObjectURL(result);
    setDownloadUrl(url);

    // Log the download action
    if (userId) {
      await logDownload('your-file-key', userId);
    }
  };

  const initiateDownload = async () => {
    try {
      // Fetch metadata first
      const metadata = await Storage.head('your-file-key');
      console.log('Metadata:', metadata);

      // Download file from S3
      const file = await Storage.get('your-file-key', { download: true });
      if (file.Body instanceof Blob) {
        await handleDownload(file.Body);
      } else {
        throw new Error("Unable to download file");
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleRetry = () => {
    setRetry(!retry); // Force retry by toggling
    initiateDownload();
  };

  return (
    <div>
      <button onClick={initiateDownload}>Download File</button>
      {downloadUrl && (
        <a href={downloadUrl} download="filename.ext">
          Click here if download doesn't start automatically
        </a>
      )}
      <button onClick={handleRetry}>Retry Download</button>
    </div>
  );
};

export default LegalComponent;
