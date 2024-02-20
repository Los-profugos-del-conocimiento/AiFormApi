import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { generate as shortUuid } from 'short-uuid';

@Entity()
export class Form {
    @PrimaryColumn('varchar', { length: 8 })
    id: string = shortUuid().slice(0, 8);

    @Column({ length: 10 })
    type: string;

    @Column({ length: 100 })
    title: string;

    @Column({ type: 'text' })
    prompt: string;

    @Column({ type: 'integer' })
    questions: number;

    @Column('simple-array')
    answerTypes: string[];

    @Column({ type: 'integer', nullable: true })
    difficulty: number;

    @Column({ nullable: true})
    googleFormsUrl?: string;

    @OneToMany(() => Item, item => item.form)
    items: Item[];
}
