import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { generate as shortUuid } from 'short-uuid';
import { Item } from './item.entity';

@Entity()
export class Answer {
    @PrimaryColumn('varchar', { length: 8 })
    id: string = shortUuid().slice(0, 8);

    // refers to questionId on Google Form's question interface
    @Column()
    answerId: string;

    @Column()
    text: string;

    @Column({ nullable: true })
    correct?: boolean;

    @ManyToOne(() => Item, item => item.answers)
    item: Item;
}
