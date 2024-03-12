import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { generate as shortUuid } from 'short-uuid';

export abstract class Base {
    @PrimaryColumn('varchar', { length: 8 })
    id?: string = shortUuid().slice(0, 8);

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
