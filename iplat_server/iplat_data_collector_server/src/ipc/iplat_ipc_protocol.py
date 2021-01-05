from src.packet.iplat_packet_config import IPlatPacketConfig as IPC

class IPlatIpcProtocol:
    def __init__(self, mode, data):
        self.sensors = []
        self.buffer = []
        self.mode = mode

        # Fast mode - DATA(1B)
        if mode == IPC.DATF:
            self.buffer = [data.decode()]

        # Byte mode - SID1(4B) + DATA1(1B) + SID2(4B) + DATA2(1B) +SID3(4B) + DATA3(1B)
        elif mode == IPC.DATB:
            for i in range(0, len(data), 5):
                self.sensors.append(data[i: i + 4].decode())
                self.buffer.append({data[i : i + 4].decode(): data[i + 4]})

        # Half-word mode - SID1(4B) + DATA11(1B) + DATA12(1B)
        #                   + SID2(4B) + DATA21(1B) + DATA22(1B)
        #                   + SID3(4B) + DATA31(1B) + DATA32(1B)
        elif mode == IPC.DATH:
            for i in range(0, len(data), 6):
                self.sensors.append(data[i: i + 4].decode())
                self.buffer.append({data[i: i + 4].decode(): data[i + 4: i + 6].decode()})

        # Word mode - SID1(4B) + DATA11(1B) + DATA12(1B) + DATA11(1B) + DATA12(1B) + DATA13(1B) + DATA14(1B)
        #                   + SID2(4B) + DATA21(1B) + DATA22(1B) + DATA23(1B) + DATA24(1B)
        #                   + SID3(4B) + DATA31(1B) + DATA32(1B) + DATA33(1B) + DATA34(1B)
        elif mode == IPC.DATW:
            for i in range(0, len(data), 8):
                self.sensors.append(data[i: i + 4].decode())
                self.buffer.append({data[i: i + 4].decode(): data[i + 4: i + 8].decode()})

        # Block mode - SID(4B) + DATA1(1B) + DATA2(1B) + DATA1(1B) + DATA2(1B) + DATA3(1B) + DATA4(1B) + ...
        elif mode == IPC.DATK:
            self.sensors.append(data[:4].decode())
            self.buffer.append({data[:4].decode(): data[4:].decode()})

    def decode(self, sid):
        if self.mode == IPC.DATF:
            return self.buffer

        # elif self.mode == IPC.DATK:
        #     result = []
        #     for b in self.buffer:
        #         result.append(b[sid])
        #
        else:
            result = []
            for b in self.buffer:
                result.append(b[sid])
            return result