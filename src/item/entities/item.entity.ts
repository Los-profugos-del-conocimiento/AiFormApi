import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Answer } from '../../answer/entities/answer.entity';
import { Base } from '../../common/entities/base.entity';
import { Form } from '../../form/entities/form.entity';
import { generate as shortUuid } from 'short-uuid';

@Entity()
export class Item extends Base {
    // refers to itemId on Google Form's item interface
    @Column({ nullable: true })
    itemId?: string;

    @Column()
    question: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    answerType: string;

    @OneToMany(
        () => Answer, answer => answer.item, { eager: true, cascade: true, onDelete: 'CASCADE' }
    )
    answers: Answer[];

    @ManyToOne(() => Form, form => form.items, { onDelete: 'CASCADE' })
    form?: Form;
}
