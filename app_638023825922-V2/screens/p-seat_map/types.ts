

export type Floor = '1' | '2' | '3';
export type Zone = 'A' | 'B' | 'C';

export type SeatStatus = 'available' | 'occupied' | 'temporary' | 'booked';

export type FilterOption = 
  | 'window'    // 靠窗
  | 'aisle'     // 靠过道
  | 'corner'    // 角落
  | 'power'     // 有电源
  | 'lamp'      // 台灯
  | 'charger'   // 无线充电
  | 'quiet'     // 静音区
  | 'discussion'// 讨论区
  | 'sunlight'  // 阳光充足
  | 'shade';    // 阴凉

export interface Seat {
  id: string;
  number: string;
  status: SeatStatus;
  features: FilterOption[];
  position: {
    top: number;
    left: number;
  };
}

export interface SeatStats {
  total: number;
  available: number;
  occupied: number;
  temporary: number;
}

export interface FilterCategory {
  title: string;
  options: FilterOption[];
}

