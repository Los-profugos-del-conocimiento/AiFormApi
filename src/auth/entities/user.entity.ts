import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Base } from '../../common/entities/base.entity';
import { Form } from '../../form/entities/form.entity';
import { generate as shortUuid } from 'short-uuid';

@Entity()
export class User extends Base {
    @Column({ unique: true })
    email: string;

    @Column()
    fullName: string;

    @Column({ nullable: true })
    picture?: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Form, form => form.user, { onDelete: 'CASCADE' })
    forms: Form[];
}
