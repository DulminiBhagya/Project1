import QRCode from 'qrcode';

/**
 * Generate a QR Code
 * @param {string} text - The data to encode in the QR code.
 * @returns {Promise<string>} - A promise that resolves to the QR code image URL.
 */
export const generateQRCode = async (text) => {
    try {
        const qrCodeImage = await QRCode.toDataURL(text);
        return qrCodeImage;
    } catch (error) {
        console.error('Failed to generate QR Code:', error.message);
        throw new Error('QR Code generation failed');
    }
};

/**
 * Generate a QR Code and display it in the terminal (optional for debugging)
 * @param {string} text - The data to encode in the QR code.
 */
export const displayQRCodeInTerminal = (text) => {
    const qrCodeTerminal = require('node-qrcode-terminal');
    qrCodeTerminal.generate(text, { small: true });
};
