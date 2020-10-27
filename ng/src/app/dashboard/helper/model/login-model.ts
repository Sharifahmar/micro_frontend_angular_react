export class LoginModel {
    private email: string;

    private password: string;

    private phoneNumber: string;

    public getEmail(): string {
        return this.email;
    }
    public setEmail(value: string) {
        this.email = value;
    }
    public getPassword(): string {
        return this.password;
    }
    public setPassword(value: string) {
        this.password = value;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(value: string) {
        this.phoneNumber = value;
    }


}


