
export interface LineData {
    label: string;
    value: number;
}

export interface Chartdata {
    yrange: number,
    lineData: LineData[]
}

export interface ScatterData {
    label: string;
    xValue: number;
    yValue: number;
}


