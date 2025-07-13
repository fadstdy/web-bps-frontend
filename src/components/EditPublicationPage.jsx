import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';
import { uploadImageToCloudinary } from '../services/publicationService';

export default function EditPublicationPage() {
    const { publications, editPublication } = usePublications();
    const { id } = useParams();
    const navigate = useNavigate();

    const publication = publications.find(pub => pub.id === Number(id));

    const [formData, setFormData] = useState({
        title: '',
        releaseDate: '',
        description: '',
        coverFile: null,
        currentCoverUrl: ''
    });

    useEffect(() => {
        if (publication) {
            setFormData({
                title: publication.title || '',
                releaseDate: publication.releaseDate || '',
                description: publication.description || '',
                coverFile: null,
                currentCoverUrl: publication.coverUrl || ''
            });
        }
    }, [publication]);

    if (!publication) {
        return <p className="text-center text-red-600 mt-10">Publikasi tidak ditemukan.</p>;
    }

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                coverFile: file,
                currentCoverUrl: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, releaseDate, description, coverFile, currentCoverUrl } = formData;

        if (!title || !releaseDate) {
            alert('Judul dan Tanggal Rilis harus diisi!');
            return;
        }

        let coverUrl = currentCoverUrl;

        if (coverFile) {
            try {
                coverUrl = await uploadImageToCloudinary(coverFile);
            } catch (err) {
                alert('Gagal upload gambar ke Cloudinary');
                return;
            }
        }

        const updatedPublication = {
            ...publication,
            title,
            releaseDate,
            description,
            coverUrl
        };

        editPublication(updatedPublication);
        navigate('/publications');
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Publikasi</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                    />
                </div>

                <div>
                    <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Rilis</label>
                    <input
                        type="date"
                        id="releaseDate"
                        value={formData.releaseDate}
                        onChange={(e) => handleChange('releaseDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
                    />
                </div>

                <div>
                    <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-1">Sampul (Gambar)</label>
                    <input
                        type="file"
                        id="cover"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    {formData.currentCoverUrl && (
                        <img
                            src={formData.currentCoverUrl}
                            alt="Preview Sampul"
                            className="mt-3 h-40 object-cover rounded shadow-md"
                        />
                    )}
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-md transition cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-md transition cursor-pointer"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    );
}
