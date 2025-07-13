// src/components/PublicationListPage.jsx

import React from 'react';
import { usePublications } from '../hooks/usePublications';
import { useNavigate } from 'react-router-dom';
import { publicationService } from '../services/publicationService';

export default function PublicationListPage() {
  const { publications, loading } = usePublications();
 
  const navigate = useNavigate();
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

  if (loading) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
      <p className="text-blue-600 font-medium text-lg">Memuat...</p>
    </div>
  );
}

  const handleDelete = async (id) => {
    const confirm = window.confirm("Apakah Anda yakin ingin menghapus publikasi ini?");
    if (!confirm) return;

    try {
      await publicationService.deletePublication(id);
      alert("Publikasi berhasil dihapus.");
      window.location.reload();
    } catch (err) {
      alert("Gagal menghapus publikasi: " + err.message);
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Daftar Publikasi BPS Provinsi Jawa Timur</h1>
        <p className="text-gray-500 mt-1">Sumber data publikasi terkini</p>
      </header>
      <div className="relative overflow-x-auto shadow-xl rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-slate-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-center w-16">No</th>
              <th scope="col" className="px-6 py-3 text-center w-110">Judul</th>
              <th scope="col" className="px-6 py-3 text-center w-50">Tanggal Rilis</th>
              <th scope="col" className="px-6 py-3 text-center">Sampul</th>
              <th scope="col" className="px-6 py-3 text-center w-70">Aksi</th>
              {/* <th scope="col" className="px-6 py-3 text-center">Lihat Detail Publikasi</th> */}
            </tr>
          </thead>
          <tbody>
            {publications.map((pub, idx) => (
              <tr key={pub.id} className="bg-white border-b hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 font-medium text-gray-900 text-center">{idx + 1}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">{pub.title}</td>
                <td className="px-6 py-4 text-gray-800 text-center">{formatDate(pub.releaseDate)}</td>
                <td className="px-6 py-4 flex justify-center items-center">
                  <img
                    src={pub.coverUrl}
                    alt={`Sampul ${pub.title}`}
                    className="h-24 w-auto object-cover rounded shadow-md"
                    onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x140/cccccc/ffffff?text=Error'; }}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                  <button
                    className="w-14 h-6 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold cursor-pointer"
                    onClick={() => navigate(`/publications/${pub.id}`)}
                  >
                    Lihat
                  </button>
                  <button
                    className="w-14 h-6 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs font-semibold cursor-pointer"
                    onClick={() => navigate(`/publications/edit/${pub.id}`)}
                  >
                     Edit 
                  </button>
                  <button
                    className="w-14 h-6 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold cursor-pointer"
                    onClick={() => handleDelete(pub.id)}
                  >
                    Hapus
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}