import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { generate as shortUuid } from 'short-uuid';
import { Answer } from './answer.entity';
import { Form } from './form.entity';

@Entity()
export class Item {
    @PrimaryColumn('varchar', { length: 8 })
    id: string = shortUuid().slice(0, 8);

    // refers to itemId on Google Form's item interface
    @Column()
    itemId: string;

    @Column()
    question: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    answerType: string;

    @OneToMany(() => Answer, answer => answer.item)
    answers: Answer[];

    @ManyToOne(() => Form, form => form.items)
    form: Form;
}
