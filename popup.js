const fakeData = {
  email: () => `user${Math.floor(Math.random() * 1000)}@example.com`,
  phone: () =>
    `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(
      Math.floor(Math.random() * 9000) + 1000
    )}`,
  awsAccessKey: () => {
    let key = "AKIA";
    for (let i = 0; i < 16; i++) {
      key += Math.random() > 0.5 ? String.fromCharCode(Math.floor(Math.random() * 26) + 65) : String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
    return key;
  },
  awsSecretKey: () => {
    let secret = "";
    for (let i = 0; i < 40; i++) {
      const charCode = Math.floor(Math.random() * 62);
      if (charCode < 26) {
        secret += String.fromCharCode(charCode + 65); // Uppercase letters
      } else if (charCode < 52) {
        secret += String.fromCharCode(charCode - 26 + 97); // Lowercase letters
      } else if (charCode < 62) {
        secret += String.fromCharCode(charCode - 52 + 48); // Numbers
      } else {
        secret += charCode === 62 ? "+" : "/"; // Plus and slash symbols
      }
    }
    return secret;
  },
  ipAddress: () =>
    `${Math.floor(Math.random() * 256)}.${Math.floor(
      Math.random() * 256
    )}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
  ssn: () =>
    `${String(Math.floor(Math.random() * 900) + 100)}-${String(
      Math.floor(Math.random() * 90) + 10
    )}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
  creditCard: () => {
    let cardNumber = "";
    // Generate the first 15 digits randomly
    for (let i = 0; i < 15; i++) {
      cardNumber += Math.floor(Math.random() * 10);
    }

    // Calculate the check digit using Luhn algorithm (optional for more realistic generation)
    let sum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
      const digit = parseInt(cardNumber[i]);
      if (i % 2 === 1) {
        digit *= 2;
      }
      sum += digit % 10 + Math.floor(digit / 10);
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    cardNumber += checkDigit;

    // Format the card number with dashes
    return `${cardNumber.slice(0, 4)}-${cardNumber.slice(4, 8)}-${cardNumber.slice(8, 12)}-${cardNumber.slice(12, 16)}`;
  },
};

const patterns = {
  email: {
    regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    label: "Email Address",
    className: "bg-yellow-200",
  },
  phone: {
    regex: /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    label: "Phone Number",
    className: "bg-green-200",
  },
  awsAccessKey: {
    regex: /AKIA[0-9A-Z]{16}/g,
    label: "AWS Access Key",
    className: "bg-red-200",
  },
  awsSecretKey: {
    regex: /[0-9a-zA-Z/+]{40}/g,
    label: "Potential AWS Secret Key",
    className: "bg-red-200",
  },
  ipAddress: {
    regex: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g,
    label: "IP Address",
    className: "bg-blue-200",
  },
  ssn: {
    regex: /\b\d{3}[-.]?\d{2}[-.]?\d{4}\b/g,
    label: "SSN",
    className: "bg-purple-200",
  },
  creditCard: {
    regex: /\b(?:\d[ -]*?){13,16}\b/g,
    label: "Credit Card Number",
    className: "bg-pink-200",
  },
};

function analyzeText(text) {
  let detected = [];
  let sanitized = text;
  let highlighted = text;
  let allMatches = [];

  Object.entries(patterns).forEach(([key, pattern]) => {
    const matches = [...text.matchAll(pattern.regex)];
    if (matches.length > 0) {
      detected.push({
        type: pattern.label,
        count: matches.length,
        examples: matches.map((m) => m[0]).slice(0, 2),
        className: pattern.className,
      });
      matches.forEach((match) => {
        sanitized = sanitized.replace(match[0], fakeData[key]());
        allMatches.push({
          text: match[0],
          index: match.index,
          length: match[0].length,
          className: pattern.className,
        });
      });
    }
  });

  allMatches.sort((a, b) => b.index - a.index);
  allMatches.forEach((match) => {
    const before = highlighted.slice(0, match.index);
    const after = highlighted.slice(match.index + match.length);
    highlighted =
      before + `<span class="highlighted" style="background-color: ${match.className.split('-')[1] + '.' + match.className.split('-')[2]};">${match.text}</span>` + after;
  });

    document.getElementById("detected-items-display").innerHTML = detected.map(item => `<p><span class="inline-block w-4 h-4 rounded mr-2" style="background-color: ${item.className.split('-')[1] + '.' + item.className.split('-')[2]};"></span>${item.type}: ${item.count} instance(s) found</p>`).join('');
  document.getElementById("highlighted-text").innerHTML = highlighted; // Correct: Use innerHTML
  document.getElementById("sanitized-text").textContent = sanitized; // Correct: Use textContent
}

const inputTextArea = document.getElementById("input-text");

inputTextArea.addEventListener("input", () => {
  const inputText = inputTextArea.value;
  analyzeText(inputText);
});

// Analyze initial content if any on popup open
analyzeText(inputTextArea.value);