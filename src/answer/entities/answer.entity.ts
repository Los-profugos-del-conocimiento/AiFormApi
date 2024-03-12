import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Base } from '../../common/entities/base.entity';
import { Item } from '../../item/entities/item.entity';
import { generate as shortUuid } from 'short-uuid';

@Entity()
export class Answer extends Base {
    // refers to questionId on Google Form's question interface
    @Column({ nullable: true })
    answerId?: string;

    @Column()
    text: string;

    @Column({ nullable: true })
    correct?: boolean;

    @ManyToOne(() => Item, item => item.answers, { onDelete: 'CASCADE' })
    item?: Item;
}
