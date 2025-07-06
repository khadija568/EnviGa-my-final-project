// HotelCertificate.tsx
import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function HotelCertificate() {
  const hotelName = "Eco Hotel";
  const currentYear = new Date().getFullYear();
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (certificateRef.current) {
      const element = certificateRef.current;
      const opt = {
        margin: 0,
        filename: "EnviGa_Certificate.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: "px", format: "a4", orientation: "landscape" },
      };

      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-white to-lime-50 flex flex-col items-center justify-center text-center text-emerald-900">
      <h1 className="text-3xl font-bold mb-6">Participation Certificate 🌿</h1>

      {/* شهادة */}
      <div
        ref={certificateRef}
        className="relative w-[900px] h-[600px] bg-white border-[12px] border-yellow-500 rounded-lg shadow-lg p-10 flex flex-col items-center justify-center bg-[url('/bg-pattern.png')] bg-cover bg-center"
      >
        <h2 className="text-4xl font-serif font-bold mb-4 text-yellow-700 tracking-wider">Certificate of Participation</h2>

        <p className="text-lg mb-4 font-light text-gray-700">This is awarded to</p>

        <h3 className="text-3xl font-bold text-emerald-800 mb-6 underline underline-offset-4 decoration-lime-600">
          {hotelName}
        </h3>

        <p className="text-md mb-6 text-gray-600 w-[75%] mx-auto leading-relaxed">
          In recognition of your outstanding efforts and commitment to environmental sustainability as an active participant in the <strong>EnviGa</strong> initiative.
        </p>

        <div className="flex justify-between w-full mt-8 px-10 text-left text-gray-600">
          <div>
            <p className="font-semibold">Issued by:</p>
            <p>EnviGa Association</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Issued:</p>
            <p>{currentYear}</p>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 text-sm text-gray-500 italic">www.enviga.org</div>
      </div>

      <button
        onClick={handleDownloadPDF}
        className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded transition"
      >
        Download as PDF
      </button>
    </div>
  );
}