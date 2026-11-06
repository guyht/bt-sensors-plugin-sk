const GoveeSensor = require("./Govee/GoveeSensor");

/**
 * Govee H5179 temperature/humidity sensor (advertisement-only, no GATT).
 *
 * Replaces the standalone noble-based signalk-govee-plugin: noble scans on a
 * raw HCI socket, which fights bluetoothd for control of the controller's
 * scan state and (on the TP-Link UB500 / RTL8761B) wedges scanning for every
 * BLE sensor. Reading the H5179 through this plugin keeps bluetoothd the
 * single BLE master. Parsing is ported 1:1 from that plugin.
 *
 * ManufacturerData key 0x8801, 9-byte payload (verified live):
 *   ec 00 01 01 | fa 05 | 4c 1d | 00
 *   [0..3] fixed  [4..5] temp    [6..7] humidity  [8] battery
 *   temp     int16LE / 100  (°C)
 *   humidity uint16LE / 100 (%)
 *   battery  uint8 (%)
 */
class GoveeH5179 extends GoveeSensor {
    static getIDRegex() {
        return /^Govee_H5179_[a-fA-F0-9]{4}$/
    }
    static DATA_ID = 0x8801

    // The base GoveeSensor identify() requires the ec88 UUID to be the FIRST
    // advertised UUID; the H5179 lists Device Information first. Match on the
    // device name alone.
    static async identify(device) {
        const name = await this.getDeviceProp(device, "Name")
        if (name && name.match(this.getIDRegex()))
            return this
        return null
    }

    initSchema() {
        super.initSchema()
        this.addDefaultParam("zone")

        this.addDefaultPath("temp", "environment.temperature")
            .read = (buffer) => {
                if (!buffer || buffer.length < 6) return null
                return 273.15 + (buffer.readInt16LE(4) / 100)
            }

        this.addDefaultPath("humidity", "environment.humidity")
            .read = (buffer) => {
                if (!buffer || buffer.length < 8) return null
                return buffer.readUInt16LE(6) / 10000
            }

        const battery = this.addDefaultPath("battery", "sensors.batteryStrength")
        battery.read = (buffer) => {
            if (!buffer || buffer.length < 9) return null
            return buffer.readUInt8(8) / 100
        }
    }
}
module.exports = GoveeH5179
