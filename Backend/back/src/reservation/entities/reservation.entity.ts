import { Entity, Column, PrimaryGeneratedColumn , OneToMany } from 'typeorm';
import{User} from '../../user/user.entity'
import {Car} from '../../car/entities/car.entity'

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id:number ;

    @OneToMany(() => User, user => user.id) 
    users: User[]; 

    @OneToMany(() => Car, car => car.id) 
    cars: Car[]; 

    @Column()
    takeItAt:Date;

    @Column()
    returnItAt:Date;

}