/**
 * Handles logging information
 */
export class Logger {
    public log(message: string): void {
        console.log(message);
    }

    public warn(message: string): void {
        console.warn(message);
    }

    public error(message: string): void {
        console.error(message);
    }
}