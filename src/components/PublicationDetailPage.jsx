// src/pages/PublicationDetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';

export default function PublicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { publications } = usePublications();

  const publication = publications.find(pub => pub.id === Number(id));

  // Fungsi untuk format tanggal ke bahasa Indonesia
  const formatDate = (dateString) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  if (!publication) {
    return (
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">Publikasi yang Anda cari tidak tersedia.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Kembali
          </button>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gambar sampul di kiri */}
        <div className="md:col-span-1">
          {publication.coverUrl && (
            <img
              src={publication.coverUrl}
              alt="Sampul"
              className="w-full rounded shadow"
            />
          )}
        </div>

        {/* Detail publikasi di kanan */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-sky-700">{publication.title}</h2>
          <p><strong>Tanggal Rilis:</strong> {formatDate(publication.releaseDate)}</p>
          <p><strong>Deskripsi:</strong></p>
          <p className="text-black-700 whitespace-pre-wrap text-justify">{publication.description}</p>
          
          
          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded cursor-pointer transition"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}