export interface ICropperDialog{
    onChanged:(field: string, value: string) =>void;
    field: string,
    value?: string,
    error?: string,
    touched?: boolean,
    aspectRation?: number
}