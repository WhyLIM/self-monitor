import psutil
import platform
from cpuinfo import get_cpu_info
import GPUtil

def get_system_info():
    # 基本操作系统信息
    system = platform.system()
    node = platform.node()
    release = platform.release()
    version = platform.version()
    machine = platform.machine()
    processor = platform.processor()

    # CPU 型号和频率信息
    cpu_info = get_cpu_info()
    cpu_model = cpu_info['brand_raw']  # 获取 CPU 型号
    cpu_arch = cpu_info['arch']        # 获取 CPU 架构
    cpu_count = psutil.cpu_count(logical=True)  # 获取逻辑核心数
    cpu_freq = psutil.cpu_freq()       # 获取 CPU 当前频率

    # 内存信息
    memory = psutil.virtual_memory()
    total_memory = memory.total / (1024**3)  # 总内存，单位：GB
    memory_percent = memory.percent          # 内存使用率

    # 磁盘信息
    disk = psutil.disk_usage('/')
    total_disk = disk.total / (1024**3)      # 总磁盘空间，单位：GB
    disk_percent = disk.percent              # 磁盘使用率

    # GPU 信息
    gpus = GPUtil.getGPUs()
    gpu_info_list = []
    for gpu in gpus:
        gpu_info = {
            "GPU 名称": gpu.name,
            "总显存 (GB)": f"{gpu.memoryTotal / 1024:.2f}",
            "已用显存 (GB)": f"{gpu.memoryUsed / 1024:.2f}",
            "显存使用率 (%)": f"{gpu.memoryUtil * 100:.1f}",
            "GPU 使用率 (%)": f"{gpu.load * 100:.1f}",
            "温度 (°C)": gpu.temperature
        }
        gpu_info_list.append(gpu_info)

    # 打印系统信息
    print("=== 系统基本信息 ===")
    print(f"系统: {system}")
    print(f"主机名: {node}")
    print(f"版本: {release} ({version})")
    print(f"架构: {machine}")
    print(f"处理器: {processor}")

    print("\n=== CPU 信息 ===")
    print(f"CPU 型号: {cpu_model}")
    print(f"CPU 架构: {cpu_arch}")
    print(f"逻辑核心数: {cpu_count}")
    print(f"CPU 频率: {cpu_freq.current:.2f} MHz")

    print("\n=== 内存信息 ===")
    print(f"总内存: {total_memory:.2f} GB")
    print(f"内存使用率: {memory_percent}%")

    print("\n=== 磁盘信息 ===")
    print(f"总磁盘空间: {total_disk:.2f} GB")
    print(f"磁盘使用率: {disk_percent}%")

    print("\n=== GPU 信息 ===")
    if not gpu_info_list:
        print("未检测到 GPU")
    else:
        for i, gpu_info in enumerate(gpu_info_list):
            print(f"GPU {i+1}:")
            for key, value in gpu_info.items():
                print(f"  {key}: {value}")

if __name__ == "__main__":
    get_system_info()
