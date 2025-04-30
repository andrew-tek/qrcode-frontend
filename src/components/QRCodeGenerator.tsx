import React, { useState } from "react";

const QRCodeGenerator: React.FC = () => {
  const [input, setInput] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQRCode = async () => {
    try {
      const response = await fetch("http://localhost:8080/generate-qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: input }),
      });

      if (response.ok) {
        const data = await response.json();
        const base64Image = data.image;
        const imageUrl = `data:image/png;base64,${base64Image}`;
        setQrCodeUrl(imageUrl);
      } else {
        console.error("Failed to generate QR code");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div>
      <h3>Enter Text to Generate QR Code:</h3>
      <input
        type="text"
        placeholder="Enter text or URL"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeUrl && (
        <div>
          <h3>Generated QR Code:</h3>
          <img src={qrCodeUrl} alt="Generated QR Code" />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
