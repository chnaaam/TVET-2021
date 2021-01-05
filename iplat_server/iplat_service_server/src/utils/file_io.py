import os

def read_sensing_data(dir, device_id, sensor_id, start_time):
    print(start_time)
    path = os.path.join(
        dir,
        device_id,
        sensor_id,
        start_time
    ) + ".dat"

    file_buffer = []

    with open(path, 'r', encoding='utf-8') as fp:
        while True:
            line = fp.readline()

            if not line:
                break

            if "SPS" in line:
                continue

            if "BPS" in line:
                continue

            line = line.strip()
            line = line.replace('\n', '')

            file_buffer.append(line)

    data_buffer = []
    index_buffer = []
    for i in range(2, len(file_buffer)):
        temp = file_buffer[i].split(' ')
        print(len(temp))
        index_buffer.append(temp[0])
        data_buffer.append(temp[1])

    return {
        "TIMESTAMP": file_buffer[0],
        "DATA": data_buffer,
        "INDEX": index_buffer
    }

def create_dir(path):
    try:
        os.makedirs(path)
    except Exception as e:
        print(e)

if __name__ == "__main__":
    print(read_sensing_data("D:\Projects\IoT-Makers\IoT-Makers-Socket-Server", "1234", "11", "11", "2020070520212394"))
