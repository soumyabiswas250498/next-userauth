class ApiResponse {
    public statusCode: number;
    public data: unknown;
    public message: string;
    public success: boolean;

    constructor(statusCode: number, data: unknown, message = 'Success') {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; 
    }
}

export { ApiResponse };