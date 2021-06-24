import { Entity, Column, PrimaryGeneratedColumn , ManyToOne } from 'typeorm';
import{User} from '../../user/user.entity'
import {Reservation} from '../../reservation/entities/reservation.entity'


@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.FirstName) 
  users: User[];
  
//   @ManyToOne(()=>Reservation,reservation=>reservation.id)
//   reservation:Reservation

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  engine: string;
  
  @Column()
  price: number;

  @Column()
  seats: number;

  @Column()
  doors: number;

  @Column()
  suitcases: number;

  @Column()
  airconditioner: string;

  @Column()
  transmission: string;

  @Column()
  file1: string;

  @Column()
  file2: string;

  @Column()
  file3: string;
}