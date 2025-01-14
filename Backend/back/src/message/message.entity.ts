import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  constructor(sender: string, message: string) {
    super();

    this.sender = sender;
    this.message = message;
  }
  @PrimaryGeneratedColumn()
  public id: Number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public sender: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public message: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public date: Date;
}
