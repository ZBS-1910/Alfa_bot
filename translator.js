const translate = require('google-translate-api-x');

// ✅ List of supported language codes
const supportedLangs = [
    "af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs", "bg", "ca", "ceb", "ny", "zh-cn", "zh-tw", "co",
    "hr", "cs", "da", "nl", "en", "eo", "et", "tl", "fi", "fr", "fy", "gl", "ka", "de", "el", "gu", "ht", "ha", "haw",
    "iw", "hi", "hmn", "hu", "is", "ig", "id", "ga", "it", "ja", "jw", "kn", "kk", "km", "ko", "ku", "ky", "lo", "la",
    "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn", "my", "ne", "no", "or", "ps", "fa", "pl", "pt",
    "pa", "ro", "ru", "sm", "gd", "sr", "st", "sn", "sd", "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tg", "ta",
    "te", "th", "tr", "uk", "ur", "uz", "vi", "cy", "xh", "yi", "yo", "zu"
];

async function translateText(text, fromLang = 'auto', toLang = 'en') {
    try {
        // ✅ Check if the `toLang` is valid
        if (!supportedLangs.includes(toLang)) {
            return `❌ Error: Unsupported language code '${toLang}'. Use valid ISO 639-1 codes.`;
        }

        // ✅ Call Google Translate API
        const result = await translate(text, { from: fromLang, to: toLang });
        return result.text;
    } catch (error) {
        console.error('❌ Translation Error:', error);
        return '⚠ Translation failed. Please try again later.';
    }
}

module.exports = translateText;
