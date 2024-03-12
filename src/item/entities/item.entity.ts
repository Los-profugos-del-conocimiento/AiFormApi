import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Answer } from '../../answer/entities/answer.entity';
import { Form } from '../../form/entities/form.entity';
import { generate as shortUuid } from 'short-uuid';

@Entity()
export class Item {
    @PrimaryColumn('varchar', { length: 8 })
    id?: string = shortUuid().slice(0, 8);

    // refers to itemId on Google Form's item interface
    @Column({ nullable: true })
    itemId?: string;

    @Column()
    question: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    answerType: string;

    @OneToMany(() => Answer, answer => answer.item, { eager: true, cascade: true, onDelete: 'CASCADE' })
    answers: Answer[];

    @ManyToOne(() => Form, form => form.items, { onDelete: 'CASCADE' })
    form?: Form;
}
