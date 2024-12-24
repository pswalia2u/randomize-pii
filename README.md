https://buymeacoffee.com/pswalia2ug

# PII Randomizer for AI Prompts

This Chrome extension helps protect your privacy when using AI prompt websites like ChatGPT, Bard, Claude, etc. It automatically detects and replaces Personally Identifiable Information (PII) in the text you paste into the extension's popup, allowing you to generate sanitized text for use in your prompts.

## Features

*   **Automatic PII Detection:** Identifies common PII types such as email addresses, phone numbers, AWS keys, IP addresses, SSNs, and credit card numbers.
*   **Data Replacement:** Replaces detected PII with randomly generated fake data, ensuring your sensitive information is not exposed.
*   **Highlighted Text:** Highlights detected PII in the input text for easy identification.
*   **Popup Interface:** Provides a simple and user-friendly popup interface where you can paste your text and view the sanitized results.
*   **Real-time Analysis:** Automatically analyzes and sanitizes text as you type or paste it into the extension's popup.

## Installation

1.  Download or clone this repository.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable "Developer mode" in the top right corner.
4.  Click "Load unpacked" and select the directory where you saved the extension files.

## How to Use

1.  Click the extension icon in your Chrome toolbar.
2.  Paste the text you want to sanitize into the input text area.
3.  The extension will automatically analyze the text and display the following:
    *   **Detected Items:** A list of the detected PII types and the number of instances found.
    *   **Highlighted Text:** The input text with detected PII highlighted.
    *   **Sanitized Text:** The input text with PII replaced by fake data.
4.  You can then copy the sanitized text and use it in your AI prompts.

## Supported PII Types

*   Email Addresses
*   Phone Numbers
*   AWS Access Keys
*   AWS Secret Keys (Potential)
*   IP Addresses
*   Social Security Numbers (SSNs)
*   Credit Card Numbers

