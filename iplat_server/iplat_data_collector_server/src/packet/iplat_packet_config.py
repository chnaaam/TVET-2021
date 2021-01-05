class IPlatPacketConfig:
    # Start of frame
    SOF = 0xAA

    # Request a connection
    REQC = 0x10

    # Up to v1.4
    COLLECTING = 0x20
    SCOL = 0x00 # Start Collecting - this packet type is used at active collecting mode
    ECOS = 0x01 # End Collecting - this packet type is used at active collecting mode

    # Send Data
    DATA = 0x30 # Base
    DATF = 0x00 # Fast Mode
    DATB = 0x01 # Byte Mode
    DATH = 0x02 # Half-word Mode
    DATW = 0x04 # Word Mode
    DATK = 0x0F # Block Mode

    LIVE = 0xA0 # Liveness checking

    CONTROL = 0xF0
    ACK = 0x00  # Response ACK
    NACK = 0x01  # Response NAK

    # Function
    HIGH_BIT_MASK = 0xF0
    LOW_BIT_MASK = 0x0F