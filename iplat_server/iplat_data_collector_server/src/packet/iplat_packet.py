from src.packet.iplat_packet_config import IPlatPacketConfig as IPC
from src.ipc.iplat_ipc_protocol import IPlatIpcProtocol as IIP

class IPlatPacket:

    @classmethod
    def encode(cls, packet_type, *args):
        if packet_type == IPC.CONTROL:
            return cls.encode_reply(cls, type=args[0], err_code=args[1])

    @classmethod
    def decode(cls, packet):
        if not packet:
            # TODO : Error Check

            return

        if not cls.check_sof(cls, sof=packet[0]):
            # TODO : Error Check

            return

        packet_type, data_length, payload = cls.decode_packet(cls, packet)

        masked_pt = packet_type & IPC.HIGH_BIT_MASK

        if masked_pt == IPC.REQC:
            return cls.decode_reqc(cls, payload=payload[:data_length])

        elif masked_pt == IPC.DATA:
            return cls.decode_data(cls, packet_type=packet_type, payload=payload)

        elif masked_pt == IPC.COLLECTING:
             # TODO : Up to v1.4
            pass

        else:
            # TODO : 패킷이 잘못된 경우
            pass

    def encode_reply(self, type="ACK", err_code=None):
        # Packet : Start of Frame | Packet Type | Data Length | Data

        if type == "ACK":
            packet = bytearray(3)
            packet[0] = IPC.SOF
            packet[1] = IPC.CONTROL | IPC.ACK
            packet[2] = 1
        else:
            packet = bytearray(3)
            packet[0] = IPC.SOF
            packet[1] = IPC.NACK
            packet[2] = 1
            packet[3] = err_code

        return packet

    def decode_packet(self, packet):
        packet_type = packet[1]
        data_length = packet[2]
        payload = packet[3:]

        # TODO : payload에 데이터가 없는 경우
        return packet_type, int(data_length), payload

    def check_sof(self, sof) -> bool:
        if sof is IPC.SOF:
            return True

        return False

    def decode_reqc(self, payload: list) -> list:
        # payload : DID(4B) + SID(4B) + SPS(1B) + BPS(1B) + ...
        device_info = {"did": payload[:4].decode(), "sensors": []}

        for i in range(4, len(payload[4:]), 6):
            sid = payload[i : i + 4].decode()
            sps = int(payload[i + 4]) - 48  # ASCII
            bps = int(payload[i + 5]) - 48  # ASCII

            device_info["sensors"].append({
                "sid": sid,
                "sps": sps,
                "bps": bps
            })

        return device_info

    def decode_data(self, packet_type, payload) -> list:
        iip = IIP(mode=packet_type & 0x0F, data=payload)
        return iip

        # # 1. Fast Mode - DATA(1B)
        # if packet_type == IPC.DATA | IPC.DATF:
        #     # Return : [DATA]
        #     data["mode"] = "fast"
        #     data["buffer"] = [payload]
        #
        # # 2. Byte Mode - SID(4B) + DATA(1B)
        # elif packet_type == IPC.DATA | IPC.DATB:
        #     # Return : [{"sid":sid, "data":data}]
        #     data["mode"] = "byte"
        #     data["buffer"] = [{"sid": payload[:4], "data": ord(payload[4])}]
        #
        # # 3. Half Word Mode - SID1(4B) + DATA1(1B) + SID2(4B) + DATA2(1B) + SID3(4B) + DATA3(1B)
        # elif packet_type == IPC.DATA | IPC.DATH:
        #     # Return : [{"sid":sid1, "data":data1}, {"sid":sid2, "data":data2}, {"sid":sid3, "data":data3}]
        #     # Max Sensor : 3
        #     data["mode"] = "word"
        #     for idx in range(0, len(payload), 5):
        #         data.append({
        #             "sid": payload[idx: idx + 4],
        #             "data": payload[idx + 4: idx + 5]
        #         })
        #
        # # 3. Byte(Multi Sensor) - SID1(4B) + DATA1(1B) + SID2(4B) + DATA2(1B) + SID3(4B) + DATA3(1B)
        # elif packet_type == IPC.DATA | IPC.DATH:
        # # Return : [{"sid":sid1, "data":data1}, {"sid":sid2, "data":data2}, {"sid":sid3, "data":data3}]
        # # Max Sensor : 3
        # data["mode"] = "word"
        # for idx in range(0, len(payload), 5):
        #     data.append({
        #         "sid": payload[idx: idx + 4],
        #         "data": payload[idx + 4: idx + 5]
        #     })
        #
        # # 4. Block Mode - SID + DATA1 + DATA2 + DATA3 + ... + DATAn
        # elif packet_type == IPC.DATA | IPC.DATK:
        #     # Return : [{"sid":sid, "data":datas - list()}]
        #     sid = payload[:4]
        #
        #     buffer = {"sid": sid, "data": []}
        #
        #     for idx in range(4, len_sensors):
        #         buffer["data"].append(payload[idx])
        #
        #     data.append(buffer)

        return ipc_protocol