import { Entity, Column, PrimaryColumn } from 'typeorm';
import { generate as shortUuid } from 'short-uuid';

@Entity()
export class Form {
    @PrimaryColumn('varchar', { length: 8 })
    id: string = shortUuid().slice(0, 8);

    @Column({ type: 'text' })
    prompt: string;

    @Column({ length: 10 })
    type: string;

    @Column({ type: 'integer' })
    questions: number;

    @Column('simple-array', { nullable: true })
    responseType: string[];

    @Column()
    difficulty: number;
}
