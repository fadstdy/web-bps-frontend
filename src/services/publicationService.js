// src/services/publicationService.js
import apiClient from '../api/axios';

export const publicationService = {

    async addPublication(newPublication) {
        try {
            const response = await apiClient.post('/publikasi',
                newPublication);
            return response.data;
        } catch (error) {
            throw new Error('Gagal menambahkan data: ' +
                error.response?.data?.message || 'Terjadi kesalahan');
        }
    },

    async getPublications() {
        try {
            const response = await apiClient.get('/publikasi');
            return response.data;
        } catch (error) {
            throw new Error('Gagal mengambil data: ' +
                error.response?.data?.message || 'Terjadi kesalahan');
        }
    },

    async updatePublication(updatedPublication) {
        try {
            let coverUrl = updatedPublication.coverUrl;

            // Kalau ada file baru diunggah, upload dulu ke Cloudinary
            if (updatedPublication.coverFile) {
                coverUrl = await uploadImageToCloudinary(updatedPublication.coverFile);
            }

            const payload = {
                title: updatedPublication.title,
                releaseDate: updatedPublication.releaseDate,
                description: updatedPublication.description,
                coverUrl: coverUrl,
            };

            const response = await apiClient.put(`/publikasi/${updatedPublication.id}`, payload);
            return response.data.data;

        } catch (error) {
            throw new Error('Gagal mengedit data: ' +
                error.response?.data?.message || 'Terjadi kesalahan');
        }
    },

    async deletePublication(id) {
        try {
            const response = await apiClient.delete(`/publikasi/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Gagal menghapus data: ' +
                error.response?.data?.message || 'Terjadi kesalahan');
        }
    }
}

export async function uploadImageToCloudinary(file) {
    const formData = new FormData();
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    if (!uploadPreset || !cloudName) {
        throw new Error('Cloudinary config missing: cek VITE_CLOUDINARY_UPLOAD_PRESET dan VITE_CLOUDINARY_CLOUD_NAME di.env');
    }
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('Upload gagal');
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        throw new Error('Gagal upload ke Cloudinary: ' + error.message);
    }
}