// src/components/Footer.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
export default function Footer() {
    const location = useLocation();
    if (location.pathname === "/login") {
        return null;
    }

    return (
        <footer className="text-center py-8">
            <p className="text-gray-500 text-sm">
                Created by Fadzilla Kusuma Ningrum (222313071@stis.ac.id)
            </p>
        </footer>
    );
}