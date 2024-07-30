declare module 'file-saver' {
    export function saveAs(data: Blob | File, filename?: string, options?: any): void;
}

declare module 'papaparse' {
    export function parse(input: string | File, config?: any): any;
    export function unparse(data: any, config?: any): string;
}
