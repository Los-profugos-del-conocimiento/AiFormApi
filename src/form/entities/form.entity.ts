import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Base } from '../../common/entities/base.entity';
import { Item } from '../../item/entities/item.entity';
import { generate as shortUuid } from 'short-uuid';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Form extends Base {
    @Column({ length: 10 })
    type?: string;

    @Column({ length: 100 })
    title?: string;

    @Column({ type: 'text' })
    prompt?: string;

    @Column({ type: 'integer' })
    questions?: number;

    @Column('simple-array')
    answerTypes?: string[];

    @Column({ type: 'integer', nullable: true })
    difficulty?: number;

    @OneToMany(
        () => Item, item => item.form, { eager: true, cascade: true, onDelete: 'CASCADE' }
    )
    items?: Item[];

    @ManyToOne(() => User, user => user.forms, { onDelete: 'CASCADE' })
    user?: User;

    // Google Form fields
    @Column({ nullable: true })
    googleFormId?: string;

    @Column({ nullable: true})
    googleFormResponseUri?: string;
}
