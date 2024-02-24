import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Item } from '../../item/entities/item.entity';
import { generate as shortUuid } from 'short-uuid';

@Entity()
export class Answer {
    @PrimaryColumn('varchar', { length: 8 })
    id: string = shortUuid().slice(0, 8);

    // refers to questionId on Google Form's question interface
    @Column({ nullable: true })
    answerId?: string;

    @Column()
    text: string;

    @Column({ nullable: true })
    correct?: boolean;

    @ManyToOne(() => Item, item => item.answers, { onDelete: 'CASCADE' })
    item: Item;
}
