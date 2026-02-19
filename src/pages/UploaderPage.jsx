import React, { useState } from 'react';
import { API_BASE_URL } from '../utils/api';

/**
 * Uploader page allows uploading files to the API.
 */
export default function UploaderPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setStatus(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_BASE_URL}/uploader`, {
        method: 'POST',
        body: formData,
      });
      const text = await res.text();
      setStatus(text || 'Uploaded.');
    } catch (err) {
      setStatus('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Uploader</h2>
      <input
        type="file"
        className="w-full mb-3 text-sm"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`w-full py-2 rounded ${
          loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {status && (
        <p className="mt-3 text-sm text-center">{status}</p>
      )}
    </div>
  );
}