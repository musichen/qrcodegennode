# qrcodegennode

Simple Node.js-based QR Code Generator. It prompts for a QR type, collects the fields for that type, and saves a high-resolution PNG (1000px, error correction level H) into the `qrcodes/` folder.

## Requirements

- Node.js 18.7.0
- inquirer 8.2.6
- qrcode 1.5.4
- Yarn 1.22.19 (or npm)

## Install

```bash
yarn install
# or
npm install
```

## Usage

```bash
yarn start
# or
npm start
```

Then choose a QR code type:

- **url** - enter a URL, encoded as-is
- **whatsapp** - enter a phone number with country code, encoded as a `https://wa.me/<number>` link
- **wifi** - enter SSID, password, and encryption (`WPA`, `WEP`, or `nopass`), encoded in the standard `WIFI:` format
- **vcontact** - enter name, phone, and email, encoded as a vCard 3.0 contact

The generated file is named `<type>-<timestamp>.png` inside `qrcodes/`, for example `qrcodes/url-1720000000000.png`. The folder is created automatically on first run.

## License

ISC. See `license` in `package.json`.
