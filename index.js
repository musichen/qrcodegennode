const QRCode = require("qrcode");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

// Create the 'qrcodes' folder if it doesn't exist
const qrFolder = path.join(__dirname, "qrcodes");
if (!fs.existsSync(qrFolder)) {
  fs.mkdirSync(qrFolder);
}

// Prompting the user to choose the type of QR code
async function generateQRCode() {
  const { qrType } = await inquirer.prompt([
    {
      type: "list",
      name: "qrType",
      message: "What type of QR code do you want to generate?",
      choices: ["url", "whatsapp", "wifi", "vcontact"],
    },
  ]);

  let data;

  // Based on the choice, ask for relevant input
  switch (qrType) {
    case "url":
      const { url } = await inquirer.prompt([
        { type: "input", name: "url", message: "Enter the URL:" },
      ]);
      data = url;
      break;

    case "whatsapp":
      const { phone } = await inquirer.prompt([
        {
          type: "input",
          name: "phone",
          message: "Enter WhatsApp phone number (with country code):",
        },
      ]);
      data = `https://wa.me/${phone}`;
      break;

    case "wifi":
      const { ssid, password, encryption } = await inquirer.prompt([
        { type: "input", name: "ssid", message: "Enter Wi-Fi SSID (name):" },
        { type: "input", name: "password", message: "Enter Wi-Fi password:" },
        {
          type: "list",
          name: "encryption",
          message: "Choose encryption type:",
          choices: ["WPA", "WEP", "nopass"],
        },
      ]);
      data = `WIFI:S:${ssid};T:${encryption};P:${password};;`;
      break;

    case "vcontact":
      const { name, phoneVcard, email } = await inquirer.prompt([
        { type: "input", name: "name", message: "Enter Name:" },
        { type: "input", name: "phoneVcard", message: "Enter Phone Number:" },
        { type: "input", name: "email", message: "Enter Email:" },
      ]);
      data = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phoneVcard}\nEMAIL:${email}\nEND:VCARD`;
      break;

    default:
      console.log("Unknown type!");
      return;
  }

  // File name for the QR code
  const filename = `${qrType}-${Date.now()}.png`;
  const filepath = path.join(qrFolder, filename);

  // Generate the QR code and save as PNG
  QRCode.toFile(filepath, data, function (err) {
    if (err) {
      console.log("Error generating QR code:", err);
    } else {
      console.log(`QR code saved to: ${filepath}`);
    }
  });
}

generateQRCode();
