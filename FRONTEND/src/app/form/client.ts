import { Account } from "./account";

export class Client {

	lastname: string;
	firstname: string;
	civility: string;
    address: string;
	zip: string;
	city: string;
	state: string;
    email: String;
	phone: String;
	account: Account;

	constructor(
		lastname: string,
		firstname: string,
		civility: string,
        address: string,
        zip: string,
		city: string,
        state: string,
        email: String,
        phone: String,
		account: Account
	) {
		this.lastname = lastname;
		this.firstname = firstname;
		this.civility = civility;
        this.address = address;
		this.zip = zip;
		this.city = city;
		this.state = state;
		this.email = email;
		this.phone = phone;
		this.account = account;
	}
}