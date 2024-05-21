import { Role } from "./role.model";
import { Agent } from "../../../../shared/model/agent.model";

export class Compte {
	id: number;
    mail: string;
	username: string;
	password:string;
	enabled: boolean
	roles: Role[];
	agent: Agent;

	constructor(compte){
		this.id = compte.id;
		this.mail = compte.mail;
		this.username = compte.username;
		this.enabled = compte.enabled;
		this.roles = compte.roles;
		this.agent = compte.agent;
    }
}