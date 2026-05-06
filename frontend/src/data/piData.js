// Raspberry Pi 3 Model B data

export const specs = [
  { label: "SoC", value: "Broadcom BCM2837" },
  { label: "CPU", value: "Quad-core ARM Cortex-A53 @ 1.2 GHz (64-bit)" },
  { label: "RAM", value: "1 GB LPDDR2" },
  { label: "Wireless", value: "802.11n Wi-Fi + Bluetooth 4.1 BLE" },
  { label: "USB", value: "4× USB 2.0" },
  { label: "Video", value: "Full-size HDMI, MIPI DSI" },
  { label: "GPIO", value: "40-pin header" },
  { label: "Network", value: "10/100 Mbps Ethernet" },
  { label: "Storage", value: "microSD (push-pull)" },
  { label: "Price", value: "$35 USD" },
];

export const history = [
  {
    date: "Feb 29, 2016",
    title: "Pi 3 Model B Released",
    desc: "The first Raspberry Pi with built-in Wi-Fi and Bluetooth.",
  },
  {
    date: "64-bit Era",
    title: "First 64-bit Raspberry Pi",
    desc: "BCM2837 brought the ARM Cortex-A53 64-bit core to the lineup.",
  },
  {
    date: "Successor",
    title: "Replaced Pi 2 Model B",
    desc: "Same form factor, dramatically better performance + wireless.",
  },
  {
    date: "Legacy",
    title: "9M+ units sold",
    desc: "One of the best-selling SBCs of all time.",
  },
];

export const implementations = [
  {
    title: "RetroPie Gaming Console",
    tag: "GAMING",
    desc: "Emulate classic consoles from NES to PlayStation.",
  },
  {
    title: "Home Assistant Hub",
    tag: "IOT",
    desc: "Central brain for your smart home automation.",
  },
  {
    title: "Kodi Media Center",
    tag: "MEDIA",
    desc: "Stream 1080p video to any HDMI display.",
  },
  {
    title: "Robotics & Vision",
    tag: "MAKER",
    desc: "Drive motors, cameras and sensors via GPIO + CSI.",
  },
  {
    title: "Pi-hole Ad Blocker",
    tag: "NETWORK",
    desc: "Network-wide DNS-based ad and tracker blocking.",
  },
];

// Key board components with metadata for hotspots & info modals
export const components = {
  cpu: {
    name: "Broadcom BCM2837 SoC",
    tag: "PROCESSOR",
    desc: "Quad-core 64-bit ARM Cortex-A53 running at 1.2 GHz with VideoCore IV GPU. The heart of the Pi 3.",
  },
  gpio: {
    name: "40-pin GPIO Header",
    tag: "INTERFACE",
    desc: "General Purpose Input/Output — 26 programmable pins + power & ground. Drive LEDs, read sensors, communicate via I²C, SPI & UART.",
  },
  usb: {
    name: "4× USB 2.0 Ports",
    tag: "PERIPHERAL",
    desc: "Connect keyboards, mice, storage, webcams or USB hubs. Shares bandwidth with the onboard Ethernet.",
  },
  ethernet: {
    name: "10/100 Ethernet",
    tag: "NETWORK",
    desc: "RJ45 port — wired networking via the LAN9514 USB-to-Ethernet bridge.",
  },
  hdmi: {
    name: "Full-size HDMI",
    tag: "VIDEO",
    desc: "Drive displays up to 1920×1200 @ 60 Hz with audio.",
  },
  microsd: {
    name: "microSD Slot",
    tag: "STORAGE",
    desc: "Push-pull slot for the OS (Raspberry Pi OS, Ubuntu, LibreELEC, etc.).",
  },
  wifi: {
    name: "Wi-Fi + Bluetooth 4.1",
    tag: "WIRELESS",
    desc: "Broadcom BCM43438 chip with 2.4 GHz 802.11n Wi-Fi and Bluetooth 4.1 BLE.",
  },
  power: {
    name: "microUSB Power In",
    tag: "POWER",
    desc: "5 V / 2.5 A recommended supply. Powers the entire board and downstream USB devices.",
  },
  audio: {
    name: "3.5 mm A/V Jack",
    tag: "AUDIO",
    desc: "Combined analog audio output and composite video (TRRS).",
  },
};
