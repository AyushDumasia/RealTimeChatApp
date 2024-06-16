export class ApiResponse {
    statusCode: number;
    data: any | 'Empty Data';
    message: string;
    success: boolean;

    constructor(
        statusCode: number,
        data: any = 'Empty Data',
        message: string = 'Success',
        success: boolean = true,
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = success;
    }
}
