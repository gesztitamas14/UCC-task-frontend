export interface TableColumn<T = any> {
    key: keyof T | string;
    header: string;
    formatter?: (value: any, row: T) => string;
    class?: string;
}