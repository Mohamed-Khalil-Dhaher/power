import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';
// export type User = any;
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // private readonly users = [
  //   {
  //     id: 1,
  //     FirstName: 'dfgdfg',
  //     LastName: 'string',
  //     Email: 'string',
  //     phoneNumber: 4,
  //     password: 'string',
  //     image: 'string',
  //     adress: 'string',
  //     cin: 0,
  //     type: 'string',
  //   },
  //   {
  //     id: 2,
  //     FirstName: 'khalil',
  //     LastName: 'string',
  //     Email: 'string',
  //     phoneNumber: 4,
  //     password: 'string',
  //     image: 'string',
  //     adress: 'string',
  //     cin: 0,
  //     type: 'string',
  //   },
  // ];

  async findOne(email: string): Promise<User | undefined> {
    console.log(email);
    return this.usersRepository.findOne({ email: email });
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.FirstName = createUserDto.FirstName;
    user.LastName = createUserDto.LastName;
    user.email = createUserDto.email;
    user.phoneNumber = createUserDto.phoneNumber;
    user.password = createUserDto.password;
    user.type = createUserDto.type;
    await this.usersRepository.save(user);
    return user;
  }

  async signup(createUserDto: CreateUserDto) {
    const user = new User();
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const email = createUserDto.email;
    const findlogin = await this.usersRepository.findOne({ email: email });

    if (findlogin) {
      return JSON.stringify({ msg: 'This email exists' });
    }

    // const createdUser = async create(createUserDto: CreateUserDto) {
    //     const user = new User();
    //     user.FirstName = createUserDto.FirstName;
    //     user.LastName = createUserDto.LastName;
    //     user.email = createUserDto.email;
    //     user.phoneNumber = createUserDto.phoneNumber;
    //     user.password = createUserDto.password;
    //     await this.usersRepository.save(user);
    //     return user;
    //   }

    const createdUser = this.create({
      FirstName: createUserDto.FirstName,
      LastName: createUserDto.LastName,
      email: createUserDto.email,
      password: hash,
      phoneNumber: createUserDto.phoneNumber,
      type: createUserDto.type,
      image: createUserDto.image,
      adress: createUserDto.adress,
      cin: createUserDto.cin,
    });
    return JSON.stringify({ msg: 'right' });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // findOne(id: number): Promise<User> {
  //   return this.usersRepository.findOne(id);
  // }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
// @Injectable()
// export class UserService {
//   private readonly users = [
//     {
//       id: 1,
//       username: 'john',
//       password: 'changeme',
//     },
//     {
//       userId: 2,
//       username: 'maria',
//       password: 'guess',
//     },
//   ];

//   async findOne(username: string): Promise<User | undefined> {
//     return this.users.find((user) => user.username === username);
//   }
// }
