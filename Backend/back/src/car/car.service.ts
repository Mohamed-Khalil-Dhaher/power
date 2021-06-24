import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Car} from './entities/car.entity'

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  create(createCarDto: CreateCarDto) {
    return this.carsRepository.save(createCarDto);
  }

  findAll(): Promise<Car[]> {
    return this.carsRepository.find();
  }

  findOne(id: number): Promise<Car> {
    return this.carsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.carsRepository.delete(id);
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} user`;
  }
}

